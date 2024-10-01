import { Module } from '@nestjs/common';
import { DangKyVeXeController } from './dang-ky-ve-xe.controller';
import { DangKyVeXeService } from './dang-ky-ve-xe.service';

@Module({
  controllers: [DangKyVeXeController],
  providers: [DangKyVeXeService]
})
export class DangKyVeXeModule {}
