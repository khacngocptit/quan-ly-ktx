import { Test, TestingModule } from '@nestjs/testing';
import { SinhVienDangKyDichVuController } from './sinh-vien-dang-ky-dich-vu.controller';

describe('SinhVienDangKyDichVuController', () => {
  let controller: SinhVienDangKyDichVuController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SinhVienDangKyDichVuController],
    }).compile();

    controller = module.get<SinhVienDangKyDichVuController>(SinhVienDangKyDichVuController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
