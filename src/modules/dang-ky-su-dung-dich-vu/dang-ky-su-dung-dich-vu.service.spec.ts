import { Test, TestingModule } from '@nestjs/testing';
import { DangKySuDungDichVuService } from './dang-ky-su-dung-dich-vu.service';

describe('DangKySuDungDichVuService', () => {
  let service: DangKySuDungDichVuService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DangKySuDungDichVuService],
    }).compile();

    service = module.get<DangKySuDungDichVuService>(DangKySuDungDichVuService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
