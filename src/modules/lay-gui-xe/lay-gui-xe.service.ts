import { Injectable } from "@nestjs/common";
import { DB_LAY_GUI_XE } from "../repository/db-collection";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { MongoRepository } from "../repository/mongo-repository";
import { LayGuiXeDocument } from "./lay-gui-xe.entity";

@Injectable()
export class LayGuiXeService extends MongoRepository<LayGuiXeDocument> {
    constructor(
        @InjectModel(DB_LAY_GUI_XE)
        private readonly layGuiXeModel: Model<LayGuiXeDocument>
    ) {
        super(layGuiXeModel);
    }

    async create(doc: unknown): Promise<LayGuiXeDocument> {
        return;
    }
}

