import { Injectable } from "@nestjs/common";
import { DB_DANG_KY_DICH_VU } from "../repository/db-collection";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { MongoRepository } from "../repository/mongo-repository";
import { DangKySuDungDichVuDocument } from "./dang-ky-su-dung-dich-vu.entity";

@Injectable()
export class DangKySuDungDichVuService extends MongoRepository<DangKySuDungDichVuDocument> {
    constructor(
        @InjectModel(DB_DANG_KY_DICH_VU)
        private readonly phongModel: Model<DangKySuDungDichVuDocument>
    ) {
        super(phongModel);
    }

    async create(doc: unknown): Promise<DangKySuDungDichVuDocument> {
        return;
    }
}
