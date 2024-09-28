import { Module } from '@nestjs/common';
import { SinhVienDangKyDichVuController } from './sinh-vien-dang-ky-dich-vu.controller';
import { SinhVienDangKyDichVuService } from './sinh-vien-dang-ky-dich-vu.service';

@Module({
  controllers: [SinhVienDangKyDichVuController],
  providers: [SinhVienDangKyDichVuService]
})
export class SinhVienDangKyDichVuModule {}
