import { Module } from "@nestjs/common";
import { DangKySuDungDichVuController } from "./dang-ky-su-dung-dich-vu.controller";
import { DangKySuDungDichVuService } from "./dang-ky-su-dung-dich-vu.service";

@Module({
    controllers: [DangKySuDungDichVuController],
    providers: [DangKySuDungDichVuService],
})
export class DangKySuDungDichVuModule {}
