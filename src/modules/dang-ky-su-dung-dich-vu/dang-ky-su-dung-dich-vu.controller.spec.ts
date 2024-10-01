import { Test, TestingModule } from '@nestjs/testing';
import { DangKySuDungDichVuController } from './dang-ky-su-dung-dich-vu.controller';

describe('DangKySuDungDichVuController', () => {
  let controller: DangKySuDungDichVuController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DangKySuDungDichVuController],
    }).compile();

    controller = module.get<DangKySuDungDichVuController>(DangKySuDungDichVuController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
