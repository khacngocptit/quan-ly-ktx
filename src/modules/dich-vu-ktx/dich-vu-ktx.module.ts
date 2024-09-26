import { Module } from "@nestjs/common";
import { DichVuKtxController } from "./dich-vu-ktx.controller";
import { DichVuKtxService } from "./dich-vu-ktx.service";

@Module({
    controllers: [DichVuKtxController],
    providers: [DichVuKtxService],
})
export class DichVuKtxModule {}
