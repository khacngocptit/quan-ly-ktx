import { Module } from "@nestjs/common";
import { InvestorController } from "./investor.controller";
import { InvestorService } from "./investor.service";
import { InvestorRepository } from "./repository/investor.repository";

@Module({
    providers: [InvestorService, InvestorRepository],
    controllers: [InvestorController],
})
export class InvestorModule {}
