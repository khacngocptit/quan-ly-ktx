import { Test, TestingModule } from '@nestjs/testing';
import { DangKyPhongService } from './dang-ky-phong.service';

describe('DangKyPhongService', () => {
  let service: DangKyPhongService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DangKyPhongService],
    }).compile();

    service = module.get<DangKyPhongService>(DangKyPhongService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
