import { Test, TestingModule } from '@nestjs/testing';
import { DangKyGuiXeService } from './dang-ky-gui-xe.service';

describe('DangKyGuiXeService', () => {
  let service: DangKyGuiXeService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DangKyGuiXeService],
    }).compile();

    service = module.get<DangKyGuiXeService>(DangKyGuiXeService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
