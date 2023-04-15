import { Injectable } from "@nestjs/common";
import axios from "axios";
import * as https from "https";
import { AREA, AREA_BY_CODE, BUSINESS_TYPE_LIST, CATEGORY_BY_CAT_TYPE, LIST_COUNTRY_CAT } from "./common/category.constant";

@Injectable()
export class CategoryService {
    private httpsAgent: https.Agent;

    constructor() {
        this.httpsAgent = new https.Agent({
            rejectUnauthorized: false,
        });
    }

    async getUBND() {
        const data = await axios.post(
            CATEGORY_BY_CAT_TYPE,
            {
                queryParams: {
                    categoryTypeCode: {
                        equals: "classification_dependent",
                    },
                    groupCode: {
                        equals: "province", //not_equals, equals, in
                    },
                },
            },
            { httpsAgent: this.httpsAgent },
        );
        return data.data;
    }

    async getBoBanNganh() {
        const data = await axios.post(
            CATEGORY_BY_CAT_TYPE,
            {
                queryParams: {
                    categoryTypeCode: {
                        equals: "classification_dependent",
                    },
                    groupCode: {
                        equals: "ministry_of_branches",
                    },
                },
            },
            { httpsAgent: this.httpsAgent },
        );
        return data.data;
    }

    async getTapDoan() {
        const data = await axios.post(
            CATEGORY_BY_CAT_TYPE,
            {
                queryParams: {
                    categoryTypeCode: {
                        equals: "classification_dependent",
                    },
                    groupCode: {
                        equals: "corporations",
                    },
                },
            },
            { httpsAgent: this.httpsAgent },
        );
        return data.data;
    }

    async getRoleStatus() {
        const data = await axios.post(
            CATEGORY_BY_CAT_TYPE,
            {
                queryParams: {
                    categoryTypeCode: {
                        equals: "ROLE_STATUS",
                    },
                },
            },
            { httpsAgent: this.httpsAgent },
        );
        return data.data;
    }

    async getProvince() {
        const data = await axios.post(
            AREA,
            {
                areaType: "1",
                parentCode: "VN",
            },
            { httpsAgent: this.httpsAgent },
        );
        return data.data;
    }

    async getBusinessType() {
        const data = await axios.post(
            BUSINESS_TYPE_LIST,
            {
                queryParams: {
                    categoryTypeCode: {
                        equals: "BUSINESS_TYPE",
                    },
                },
            },
            { httpsAgent: this.httpsAgent },
        );
        return data.data;
    }

    async getCountryList() {
        const data = await axios.post(
            LIST_COUNTRY_CAT,
            {
                queryParams: {
                    categoryTypeCode: {
                        equals: "UM_COUNTRY LIST",
                    },
                },
            },
            { httpsAgent: this.httpsAgent },
        );
        return data.data;
    }

    async getAreaByCode(code: string) {
        const data = await axios.post(
            AREA_BY_CODE,
            {
                queryParams: {
                    code: {
                        in: [code],
                    },
                },
            },
            { httpsAgent: this.httpsAgent },
        );
        return data.data;
    }
}
