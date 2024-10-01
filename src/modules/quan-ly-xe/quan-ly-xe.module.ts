import { Module } from '@nestjs/common';
import { QuanLyXeController } from './quan-ly-xe.controller';
import { QuanLyXeService } from './quan-ly-xe.service';

@Module({
  controllers: [QuanLyXeController],
  providers: [QuanLyXeService]
})
export class QuanLyXeModule {}
