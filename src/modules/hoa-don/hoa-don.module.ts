import { Module } from '@nestjs/common';
import { HoaDonController } from './hoa-don.controller';
import { HoaDonService } from './hoa-don.service';

@Module({
  controllers: [HoaDonController],
  providers: [HoaDonService]
})
export class HoaDonModule {}
