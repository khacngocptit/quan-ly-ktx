import { Module } from '@nestjs/common';
import { DotDangKyKtxController } from './dot-dang-ky-ktx.controller';
import { DotDangKyKtxService } from './dot-dang-ky-ktx.service';

@Module({
  controllers: [DotDangKyKtxController],
  providers: [DotDangKyKtxService]
})
export class DotDangKyKtxModule {}
