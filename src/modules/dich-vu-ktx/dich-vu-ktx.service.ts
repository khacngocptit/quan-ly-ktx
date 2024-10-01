import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { DB_DICH_VU_KTX, DB_PHONG } from "../repository/db-collection";
import { MongoRepository } from "../repository/mongo-repository";
import { DichVuKtxDocument } from "./dich-vu-ktx.entity";

@Injectable()
export class DichVuKtxService extends MongoRepository<DichVuKtxDocument> {
    constructor(
        @InjectModel(DB_DICH_VU_KTX)
        private readonly phongModel: Model<DichVuKtxDocument>
    ) {
        super(phongModel);
    }
}
