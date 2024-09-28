import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { DB_PHONG } from "../repository/db-collection";
import { PhongKtxDocument } from "./phong-ktx.entity";
import { Model } from "mongoose";
import { MongoRepository } from "../repository/mongo-repository";

@Injectable()
export class PhongKtxService extends MongoRepository<PhongKtxDocument> {
    constructor(
        @InjectModel(DB_PHONG)
        private readonly phongModel: Model<PhongKtxDocument>
    ) {
        super(phongModel);
    }
}
