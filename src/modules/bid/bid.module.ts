import { Module } from "@nestjs/common";
import { BidService } from "./bid.service";
import { BidController } from "./bid.controller";
import { BidRepository } from "./repository/bid.repository";

@Module({
    providers: [BidService, BidRepository],
    controllers: [BidController],
})
export class BidModule {}
