import { Test, TestingModule } from '@nestjs/testing';
import { DotDangKyKtxService } from './dot-dang-ky-ktx.service';

describe('DotDangKyKtxService', () => {
  let service: DotDangKyKtxService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DotDangKyKtxService],
    }).compile();

    service = module.get<DotDangKyKtxService>(DotDangKyKtxService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
