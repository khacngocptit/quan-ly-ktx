import { Module } from '@nestjs/common';
import { KhachVaoRaKtxController } from './khach-vao-ra-ktx.controller';
import { KhachVaoRaKtxService } from './khach-vao-ra-ktx.service';

@Module({
  controllers: [KhachVaoRaKtxController],
  providers: [KhachVaoRaKtxService]
})
export class KhachVaoRaKtxModule {}
