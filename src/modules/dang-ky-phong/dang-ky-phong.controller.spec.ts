import { Test, TestingModule } from '@nestjs/testing';
import { DangKyPhongController } from './dang-ky-phong.controller';

describe('DangKyPhongController', () => {
  let controller: DangKyPhongController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DangKyPhongController],
    }).compile();

    controller = module.get<DangKyPhongController>(DangKyPhongController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
