import { Module } from "@nestjs/common";
import { PhongKtxController } from "./phong-ktx.controller";
import { PhongKtxService } from "./phong-ktx.service";

@Module({
    controllers: [PhongKtxController],
    providers: [PhongKtxService],
})
export class PhongKtxModule {}
