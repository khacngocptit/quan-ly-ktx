import { Module } from "@nestjs/common";
import { LayGuiXeController } from "./lay-gui-xe.controller";
import { LayGuiXeService } from "./lay-gui-xe.service";

@Module({
    controllers: [LayGuiXeController],
    providers: [LayGuiXeService],
})
export class LayGuiXeModule {}
