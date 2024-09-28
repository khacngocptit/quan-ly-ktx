import { Injectable } from "@nestjs/common";
import { MongoRepository } from "../repository/mongo-repository";
import { KhachVaoRaKtxDocument } from "./khach-vao-ra-ktx.entity";
import { DB_KHACH_VAO_RA_KTX } from "../repository/db-collection";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";

@Injectable()
export class KhachVaoRaKtxService extends MongoRepository<KhachVaoRaKtxDocument> {
    constructor(
        @InjectModel(DB_KHACH_VAO_RA_KTX)
        private readonly khachVaoRaKtxModel: Model<KhachVaoRaKtxDocument>
    ) {
        super(khachVaoRaKtxModel);
    }
}
