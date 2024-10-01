import { Module } from "@nestjs/common";
import { DangKyPhongController } from "./dang-ky-phong.controller";
import { DangKyPhongService } from "./dang-ky-phong.service";

@Module({
    controllers: [DangKyPhongController],
    providers: [DangKyPhongService],
})
export class DangKyPhongModule {}
