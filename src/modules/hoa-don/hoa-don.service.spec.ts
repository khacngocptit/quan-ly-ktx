import { Test, TestingModule } from '@nestjs/testing';
import { HoaDonService } from './hoa-don.service';

describe('HoaDonService', () => {
  let service: HoaDonService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [HoaDonService],
    }).compile();

    service = module.get<HoaDonService>(HoaDonService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
