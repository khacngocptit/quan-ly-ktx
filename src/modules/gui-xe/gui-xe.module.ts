import { Module } from '@nestjs/common';
import { GuiXeController } from './gui-xe.controller';
import { GuiXeService } from './gui-xe.service';

@Module({
  controllers: [GuiXeController],
  providers: [GuiXeService]
})
export class GuiXeModule {}
