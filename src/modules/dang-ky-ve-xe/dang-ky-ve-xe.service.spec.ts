import { Test, TestingModule } from '@nestjs/testing';
import { DangKyVeXeService } from './dang-ky-ve-xe.service';

describe('DangKyVeXeService', () => {
  let service: DangKyVeXeService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DangKyVeXeService],
    }).compile();

    service = module.get<DangKyVeXeService>(DangKyVeXeService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
