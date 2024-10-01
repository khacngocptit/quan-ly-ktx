import { Injectable } from "@nestjs/common";
import { DB_DANG_KY_VE_XE } from "../repository/db-collection";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { MongoRepository } from "../repository/mongo-repository";
import { DangKyVeXeDocument } from "./dang-ky-ve-xe.entity";

@Injectable()
export class DangKyVeXeService extends MongoRepository<DangKyVeXeDocument> {
    constructor(
        @InjectModel(DB_DANG_KY_VE_XE)
        private readonly phongModel: Model<DangKyVeXeDocument>
    ) {
        super(phongModel);
    }

    async create(doc: unknown): Promise<DangKyVeXeDocument> {
        return;
    }
}

