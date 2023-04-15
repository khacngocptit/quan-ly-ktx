import { BadRequestException, Injectable, OnApplicationBootstrap } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { DB_BID, DB_BID_VERSION, DB_INVESTOR, DB_SETTING, DB_USER } from "../repository/db-collection";
import { Model } from "mongoose";
import { BidDoc } from "./entities/bid.entity";
import { BidCondDto } from "./dto/condition/bid-condition.dto";
import { FetchQueryOption } from "src/common/pipe/fetch-query-option.interface";
import { BidRepository } from "./repository/bid.repository";
import { SettingDocument } from "../setting/entities/setting.entity";
import * as https from "https";
import axios from "axios";
import { BID_DETAILED, BID_PAGE_API, BID_VERSION_LIST } from "./common/bid.constant";
import { SettingKey } from "../setting/common/setting.constant";
import * as bluebird from "bluebird";
import { InvestorDoc } from "../investor/entities/investor.entity";
import { Cron } from "@nestjs/schedule";
import { NotificationService } from "../notification/service/notification.service";
import { UserDocument } from "../user/entities/user.entity";
import { SystemRole } from "../user/common/user.constant";
import { BidVersionDoc } from "./entities/bid-version.entity";

@Injectable()
export class BidService implements OnApplicationBootstrap {
    private readonly httpsAgent: https.Agent;
    constructor(
        @InjectModel(DB_BID)
        private readonly bidModel: Model<BidDoc>,
        @InjectModel(DB_BID_VERSION)
        private readonly bidVersionModel: Model<BidVersionDoc>,
        @InjectModel(DB_INVESTOR)
        private readonly investorModel: Model<InvestorDoc>,
        private readonly bidRepo: BidRepository,
        @InjectModel(DB_SETTING)
        private readonly settingModel: Model<SettingDocument>,
        private readonly notifService: NotificationService,
        @InjectModel(DB_USER)
        private readonly userModel: Model<UserDocument>,
    ) {
        this.httpsAgent = new https.Agent({
            rejectUnauthorized: false,
        });
    }
    async onApplicationBootstrap() {
        const exist = await this.settingModel.exists({
            key: SettingKey.BID_UPDATE,
        });
        if (!exist) {
            await this.settingModel.create({
                key: SettingKey.BID_UPDATE,
                value: false,
            });
        }
    }

    async getPageable(option: FetchQueryOption, condition: BidCondDto) {
        if (condition.searchQuery) {
            const searchCondition = {
                $or: [
                    {
                        bidName: { $regex: condition.searchQuery, $options: "i" },
                        procuringEntityCode: { $regex: condition.searchQuery, $options: "i" },
                    },
                ],
            };
            if (condition.favorite !== undefined) {
                Object.assign(searchCondition, { favorite: condition.favorite });
            }
            return this.bidRepo.getPaging(searchCondition, option);
        }
        return this.bidRepo.getPaging(condition, option);
    }

    async getById(_id: string) {
        return this.bidModel.findById(_id);
    }

    async getBidVersion(notifyNo: string) {
        const data = await axios.post(
            BID_VERSION_LIST,
            {
                notifyNo,
            },
            { httpsAgent: this.httpsAgent },
        );
        return data.data;
    }

    async getBidInfoByVersionId(versionId: string) {
        const data = await axios.post(
            BID_DETAILED,
            {
                id: versionId,
            },
            { httpsAgent: this.httpsAgent },
        );
        return data.data;
    }

    async setFavorite(_id: string, newFavorite: boolean) {
        const res = await this.bidModel.findOneAndUpdate(
            {
                _id,
                favorite: { $ne: newFavorite },
            },
            {
                $set: {
                    favorite: newFavorite,
                },
            },
        );
        if (!res) {
            throw new BadRequestException("Thay đổi trạng thái không hợp lệ");
        }
        return res;
    }

    async _cron() {
        try {
            let setting = await this.settingModel.findOne({ key: SettingKey.BID_UPDATE });
            if (!setting) {
                setting = await this.settingModel.create({
                    key: SettingKey.BID_UPDATE,
                    value: false,
                });
            }
            const version = setting.value;
            setting.value = !setting.value;
            await setting.save();
            const bulk = this.bidModel.collection.initializeUnorderedBulkOp();
            const versionBulk = this.bidVersionModel.collection.initializeUnorderedBulkOp();
            const favoriteInvestors = await this.investorModel.find({ favorite: true }).select("orgCode").lean();
            const investorCodes = favoriteInvestors.map((x) => x["orgCode"]);
            await bluebird.map(
                investorCodes,
                async (investorCode) => {
                    let pageNumber = 0;
                    let last = false;
                    do {
                        const data = await axios.post(
                            BID_PAGE_API,
                            {
                                pageSize: 10,
                                pageNumber: pageNumber.toString(),
                                query: [
                                    {
                                        index: "es-contractor-selection",
                                        keyWord: investorCode,
                                        matchType: "exact",
                                        matchFields: ["procuringEntityCode"],
                                        filters: [
                                            {
                                                fieldName: "type",
                                                searchType: "in",
                                                fieldValues: ["es-notify-contractor"],
                                            },
                                            {
                                                fieldName: "caseKHKQ",
                                                searchType: "not_in",
                                                fieldValues: ["1"],
                                            },
                                        ],
                                    },
                                ],
                            },
                            { httpsAgent: this.httpsAgent },
                        );
                        data.data.page.content.map((i) => {
                            bulk.find({ bidId: i.bidId })
                                .upsert()
                                .updateOne({
                                    $set: { version, ...i },
                                });
                            versionBulk
                                .find({
                                    bidId: i.bidId,
                                    notifyVersion: { $ne: i.notifyVersion },
                                })
                                .upsert()
                                .updateOne({
                                    $set: {
                                        bidName: i.bidName,
                                        investorName: i.investorName,
                                        notifyVersion: i.notifyVersion,
                                        notifyNeeded: true,
                                        version,
                                    },
                                });
                        });
                        last = data.data.page.last;
                        pageNumber += 1;
                    } while (last !== true);
                },
                { concurrency: 4 },
            );
            if (bulk.length > 0) {
                await bulk.execute();
            }
            if (versionBulk.length > 0) {
                await versionBulk.execute();
            }
            await this.bidModel.deleteMany({ version: { $ne: version } });
            await this.bidVersionModel.deleteMany({ version: { $ne: version } });
            const notifyNeeded = await this.bidVersionModel.find({ notifyNeeded: true });
            const user = await this.userModel.findOne({ systemRole: SystemRole.ADMIN });
            notifyNeeded.map(async (bid) => {
                this.notifService.createNotifAll(
                    {
                        title: `Thông báo gói thầu ${bid.bidName} của chủ đầu tư ${bid.investorName}`,
                        description: "Thông báo về gói thầu",
                        htmlContent:
                            `Thông báo gói thầu ${bid.bidName} của chủ đầu tư ${bid.investorName} đã được ` +
                            (bid.notifyVersion === "00" ? "tạo mới" : "cập nhật"),
                        content:
                            `Thông báo gói thầu ${bid.bidName} của chủ đầu tư ${bid.investorName} đã được ` +
                            (bid.notifyVersion === "00" ? "tạo mới" : "cập nhật"),
                    },
                    user,
                );
                bid.notifyNeeded = false;
                await bid.save();
            });
        } catch (err) {
            const user = await this.userModel.findOne({ systemRole: SystemRole.ADMIN });
            this.notifService.createNotifAll(
                {
                    title: "Lỗi chạy cron gói thầu",
                    description: "Thông báo lỗi",
                    htmlContent: `Cron cập nhật gói thầu chạy vào lúc ${new Date()} bị lỗi`,
                    content: err.message,
                },
                user,
            );
        }
    }

    @Cron("30 * * * *")
    async cronJob() {
        if (process.env.NODE_APP_INSTANCE === "0") {
            this._cron();
        }
    }
}
