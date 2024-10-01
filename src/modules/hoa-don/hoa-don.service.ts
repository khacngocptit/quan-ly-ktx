import { Injectable } from "@nestjs/common";
import { DB_HOA_DON } from "../repository/db-collection";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { MongoRepository } from "../repository/mongo-repository";
import { HoaDonDocument } from "./hoa-don.entity";

@Injectable()
export class HoaDonService extends MongoRepository<HoaDonDocument> {
    constructor(
        @InjectModel(DB_HOA_DON)
        private readonly phongModel: Model<HoaDonDocument>
    ) {
        super(phongModel);
    }

    async create(doc: unknown): Promise<HoaDonDocument> {
        return;
    }
}

