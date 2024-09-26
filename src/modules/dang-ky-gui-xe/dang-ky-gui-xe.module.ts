import { Module } from "@nestjs/common";
import { DangKyGuiXeController } from "./dang-ky-gui-xe.controller";
import { DangKyGuiXeService } from "./dang-ky-gui-xe.service";

@Module({
    controllers: [DangKyGuiXeController],
    providers: [DangKyGuiXeService],
})
export class DangKyGuiXeModule {}
