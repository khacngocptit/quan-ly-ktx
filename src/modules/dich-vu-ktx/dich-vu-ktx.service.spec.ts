import { Test, TestingModule } from '@nestjs/testing';
import { DichVuKtxService } from './dich-vu-ktx.service';

describe('DichVuKtxService', () => {
  let service: DichVuKtxService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DichVuKtxService],
    }).compile();

    service = module.get<DichVuKtxService>(DichVuKtxService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
