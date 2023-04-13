import { Module } from "@nestjs/common";
import { InvestorService } from "./investor.service";
import { InvestorController } from "./investor.controller";
import { InvestorRepository } from "./repository/investor.repository";

@Module({
    providers: [InvestorService, InvestorRepository],
    controllers: [InvestorController],
})
export class InvestorModule {}
