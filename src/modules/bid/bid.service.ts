import { BadRequestException, Injectable, OnApplicationBootstrap } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { DB_BID, DB_INVESTOR, DB_SETTING } from "../repository/db-collection";
import { Model } from "mongoose";
import { BidDoc } from "./entities/bid.entity";
import { BidCondDto } from "./dto/condition/bid-condition.dto";
import { FetchQueryOption } from "src/common/pipe/fetch-query-option.interface";
import { BidRepository } from "./repository/bid.repository";
import { SettingDocument } from "../setting/entities/setting.entity";
import * as https from "https";
import axios from "axios";
import { BidPageApi } from "./common/bid.constant";
import { SettingKey } from "../setting/common/setting.constant";
import * as bluebird from "bluebird";
import { InvestorDoc } from "../investor/entities/investor.entity";
import { Cron } from "@nestjs/schedule";

@Injectable()
export class BidService implements OnApplicationBootstrap {
    constructor(
        @InjectModel(DB_BID)
        private readonly bidModel: Model<BidDoc>,
        @InjectModel(DB_INVESTOR)
        private readonly investorModel: Model<InvestorDoc>,
        private readonly bidRepo: BidRepository,
        @InjectModel(DB_SETTING)
        private readonly settingModel: Model<SettingDocument>,
    ) {}
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
        const favoriteInvestors = await this.investorModel.find({ favorite: true }).select("orgCode").lean();
        console.log(favoriteInvestors);
        const investorCodes = favoriteInvestors.map((x) => x["orgCode"]);
        console.log("HEHE", investorCodes);
        const httpsAgent = new https.Agent({
            rejectUnauthorized: false,
        });
        await bluebird.map(
            investorCodes,
            async (investorCode) => {
                let pageNumber = 0;
                let last = false;
                do {
                    console.log(investorCode, pageNumber, last);
                    const data = await axios.post(
                        BidPageApi,
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
                        { httpsAgent },
                    );
                    data.data.page.content.map((i) => {
                        bulk.find({ id: i.id })
                            .upsert()
                            .updateOne({
                                $set: { version, ...i },
                            });
                    });
                    last = data.data.page.last;
                    pageNumber += 1;
                    console.log(data.data.page);
                } while (last !== true);
            },
            { concurrency: 4 },
        );
        await bulk.execute();
        await this.bidModel.deleteMany({ version: { $ne: version } });
    }

    @Cron("30 * * * *")
    async cronJob() {
        if (process.env.NODE_APP_INSTANCE === "0") {
            this._cron();
        }
    }
}
