import { BadRequestException, Injectable, OnApplicationBootstrap } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { DB_INVESTOR, DB_SETTING } from "../repository/db-collection";
import { Model } from "mongoose";
import { InvestorDoc } from "./entities/investor.entity";
import { InvestorCondDto } from "./dto/condition/investor-condition.dto";
import { FetchQueryOption } from "src/common/pipe/fetch-query-option.interface";
import { InvestorRepository } from "./repository/investor.repository";
import { SettingDocument } from "../setting/entities/setting.entity";
import * as https from "https";
import axios from "axios";
import { InvestorPageApi } from "./common/investor.constant";
import { SettingKey } from "../setting/common/setting.constant";
import * as bluebird from "bluebird";

@Injectable()
export class InvestorService implements OnApplicationBootstrap {
    constructor(
        @InjectModel(DB_INVESTOR)
        private readonly investorModel: Model<InvestorDoc>,
        private readonly investorRepo: InvestorRepository,
        @InjectModel(DB_SETTING)
        private readonly settingModel: Model<SettingDocument>,
    ) {}
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
        return this.investorRepo.getPaging(condition, option);
    }

    async getById(_id: string) {
        return this.investorModel.findById(_id);
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
        return res;
    }

    async cron() {
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
        const httpsAgent = new https.Agent({
            rejectUnauthorized: false,
        });
        const fetch = await axios.post(
            InvestorPageApi,
            {
                pageSize: 20,
                pageNumber: 0,
                queryParams: {
                    roleType: {
                        equals: "CDT",
                    },
                },
            },
            { httpsAgent },
        );
        const totalPages = fetch.data.ebidOrgInfos.totalPages;
        await bluebird.map(
            Array.from(Array(totalPages).keys()),
            async (pageNumber) => {
                const data = await axios.post(
                    InvestorPageApi,
                    {
                        pageSize: 20,
                        pageNumber,
                        queryParams: {
                            roleType: {
                                equals: "CDT",
                            },
                        },
                    },
                    { httpsAgent },
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
        await bulk.execute();
        await this.investorModel.deleteMany({ version: { $ne: version } });
    }
}
