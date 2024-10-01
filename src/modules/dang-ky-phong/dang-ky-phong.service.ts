import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { DB_DANG_KY_THUE_PHONG } from "../repository/db-collection";
import { MongoRepository } from "../repository/mongo-repository";
import { DangKyPhongDocument } from "./dang-ky-phong.entity";

@Injectable()
export class DangKyPhongService extends MongoRepository<DangKyPhongDocument> {
    constructor(
        @InjectModel(DB_DANG_KY_THUE_PHONG)
        private readonly phongModel: Model<DangKyPhongDocument>
    ) {
        super(phongModel);
    }

    async create(doc: unknown): Promise<DangKyPhongDocument> {
        return;
    }
}

