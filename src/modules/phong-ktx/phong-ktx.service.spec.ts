import { Test, TestingModule } from '@nestjs/testing';
import { PhongKtxService } from './phong-ktx.service';

describe('PhongKtxService', () => {
  let service: PhongKtxService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PhongKtxService],
    }).compile();

    service = module.get<PhongKtxService>(PhongKtxService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
