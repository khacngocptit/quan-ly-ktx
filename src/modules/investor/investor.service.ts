import { BadRequestException, Injectable, OnApplicationBootstrap } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { DB_BID, DB_INVESTOR, DB_LOG, DB_SETTING, DB_USER } from "../repository/db-collection";
import { Model } from "mongoose";
import { InvestorDoc } from "./entities/investor.entity";
import { InvestorCondDto } from "./dto/condition/investor-condition.dto";
import { FetchQueryOption } from "src/common/pipe/fetch-query-option.interface";
import { InvestorRepository } from "./repository/investor.repository";
import { SettingDocument } from "../setting/entities/setting.entity";
import * as https from "https";
import axios from "axios";
import { INVESTOR_DETAILED, INVESTOR_PAGE_API } from "./common/investor.constant";
import { SettingKey } from "../setting/common/setting.constant";
import * as bluebird from "bluebird";
import { Cron } from "@nestjs/schedule";
import { NotificationService } from "../notification/service/notification.service";
import { UserDocument } from "../user/entities/user.entity";
import { SystemRole } from "../user/common/user.constant";
import { BidDoc } from "../bid/entities/bid.entity";
import { LogDocument } from "../log/entities/log.entity";

@Injectable()
export class InvestorService implements OnApplicationBootstrap {
    private readonly httpsAgent;
    constructor(
        @InjectModel(DB_INVESTOR)
        private readonly investorModel: Model<InvestorDoc>,
        private readonly investorRepo: InvestorRepository,
        @InjectModel(DB_SETTING)
        private readonly settingModel: Model<SettingDocument>,
        private readonly notifService: NotificationService,
        @InjectModel(DB_USER)
        private readonly userModel: Model<UserDocument>,
        @InjectModel(DB_BID)
        private readonly bidModel: Model<BidDoc>,
        @InjectModel(DB_LOG)
        private readonly logModel: Model<LogDocument>,
    ) {
        this.httpsAgent = new https.Agent({
            rejectUnauthorized: false,
        });
    }
    async onApplicationBootstrap() {
        const exist = await this.settingModel.exists({
            key: SettingKey.INVESTOR_UPDATE,
        });
        if (!exist) {
            await this.settingModel.create({
                key: SettingKey.INVESTOR_UPDATE,
                value: false,
            });
        }
    }

    async getPageable(option: FetchQueryOption, condition: InvestorCondDto) {
        if (condition.searchQuery) {
            const searchCondition = {
                $or: [
                    {
                        orgCode: { $regex: condition.searchQuery, $options: "i" },
                    },
                    {
                        orgFullname: { $regex: condition.searchQuery, $options: "i" },
                    },
                ],
            };
            delete condition.searchQuery;
            delete condition.orgCode;
            delete condition.orgFullname;
            Object.assign(condition, searchCondition);
            return this.investorRepo.getPaging(searchCondition, option);
        }
        return this.investorRepo.getPaging(condition, option);
    }

    async getById(_id: string) {
        return this.investorModel.findById(_id);
    }

    async getInfoByOrgCode(orgCode: string) {
        const data = await axios.post(
            INVESTOR_DETAILED,
            {
                orgCode,
            },
            { httpsAgent: this.httpsAgent },
        );
        return data.data;
    }

    async setFavorite(_id: string, newFavorite: boolean) {
        const res = await this.investorModel.findOneAndUpdate(
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
        this.bidModel.updateMany({ procuringEntityCode: res["orgCode"] }, { favorite: newFavorite });
        return res;
    }

    async _cron() {
        try {
            let setting = await this.settingModel.findOne({ key: SettingKey.INVESTOR_UPDATE });
            if (!setting) {
                setting = await this.settingModel.create({
                    key: SettingKey.INVESTOR_UPDATE,
                    value: false,
                });
            }
            const version = setting.value;
            setting.value = !setting.value;
            await setting.save();
            const bulk = this.investorModel.collection.initializeUnorderedBulkOp();
            const fetch = await axios.post(
                INVESTOR_PAGE_API,
                {
                    pageSize: 20,
                    pageNumber: 0,
                    queryParams: {
                        roleType: {
                            equals: "CDT",
                        },
                    },
                },
                { httpsAgent: this.httpsAgent },
            );
            const totalPages = fetch.data.ebidOrgInfos.totalPages;
            await bluebird.map(
                Array.from(Array(totalPages).keys()),
                async (pageNumber) => {
                    const data = await axios.post(
                        INVESTOR_PAGE_API,
                        {
                            pageSize: 20,
                            pageNumber,
                            queryParams: {
                                roleType: {
                                    equals: "CDT",
                                },
                            },
                        },
                        { httpsAgent: this.httpsAgent },
                    );
                    data.data.ebidOrgInfos.content.map((i) => {
                        bulk.find({ orgCode: i.orgCode })
                            .upsert()
                            .updateOne({
                                $set: { version, ...i },
                            });
                    });
                    console.log(pageNumber);
                },
                { concurrency: 4 },
            );
            if (bulk.length > 0) {
                await bulk.execute();
            }
            await this.investorModel.deleteMany({ version: { $ne: version } });
        } catch (err) {
            const user = await this.userModel.findOne({ systemRole: SystemRole.ADMIN });
            this.logModel.create({
                title: "Lỗi chạy cron chủ đầu tư",
                content: "Thông báo lỗi",
                info: err,
            });
        }
    }

    @Cron("0 2 * * *")
    async cronJob() {
        if (process.env.NODE_APP_INSTANCE === "0") {
            this._cron();
        }
    }
}
