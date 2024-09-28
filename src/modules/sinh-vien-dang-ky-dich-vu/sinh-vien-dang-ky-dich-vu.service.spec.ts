import { Test, TestingModule } from '@nestjs/testing';
import { SinhVienDangKyDichVuService } from './sinh-vien-dang-ky-dich-vu.service';

describe('SinhVienDangKyDichVuService', () => {
  let service: SinhVienDangKyDichVuService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SinhVienDangKyDichVuService],
    }).compile();

    service = module.get<SinhVienDangKyDichVuService>(SinhVienDangKyDichVuService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
