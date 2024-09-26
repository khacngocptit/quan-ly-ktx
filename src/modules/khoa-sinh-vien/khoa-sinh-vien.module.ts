import { Module } from '@nestjs/common';
import { KhoaSinhVienController } from './khoa-sinh-vien.controller';
import { KhoaSinhVienService } from './khoa-sinh-vien.service';

@Module({
  controllers: [KhoaSinhVienController],
  providers: [KhoaSinhVienService]
})
export class KhoaSinhVienModule {}
