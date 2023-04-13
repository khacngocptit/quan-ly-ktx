import { MongoRepository } from "src/modules/repository/mongo-repository";
import { InjectModel } from "@nestjs/mongoose";
import { DB_BID } from "src/modules/repository/db-collection";
import { Model } from "mongoose";
import { BidDoc } from "../entities/bid.entity";

export class BidRepository extends MongoRepository<BidDoc> {
    constructor(
        @InjectModel(DB_BID)
        private readonly BidModel: Model<BidDoc>,
    ) {
        super(BidModel);
    }
}
