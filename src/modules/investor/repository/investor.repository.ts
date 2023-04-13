import { MongoRepository } from "src/modules/repository/mongo-repository";
import { InvestorDoc } from "../entities/investor.entity";
import { InjectModel } from "@nestjs/mongoose";
import { DB_INVESTOR } from "src/modules/repository/db-collection";
import { Model } from "mongoose";

export class InvestorRepository extends MongoRepository<InvestorDoc> {
    constructor(
        @InjectModel(DB_INVESTOR)
        private readonly investorModel: Model<InvestorDoc>,
    ) {
        super(investorModel);
    }
}
