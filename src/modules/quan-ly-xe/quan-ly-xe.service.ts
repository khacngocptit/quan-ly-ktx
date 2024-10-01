import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { DB_PHONG, DB_QUAN_LY_XE } from "../repository/db-collection";
import { MongoRepository } from "../repository/mongo-repository";
import { QuanLyXeDocument } from "./quan-ly-xe.entity";

@Injectable()
export class QuanLyXeService extends MongoRepository<QuanLyXeDocument> {
    constructor(
        @InjectModel(DB_QUAN_LY_XE)
        private readonly phongModel: Model<QuanLyXeDocument>
    ) {
        super(phongModel);
    }
}
