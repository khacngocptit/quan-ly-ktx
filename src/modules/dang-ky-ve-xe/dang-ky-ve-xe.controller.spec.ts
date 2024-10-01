import { Test, TestingModule } from '@nestjs/testing';
import { DangKyVeXeController } from './dang-ky-ve-xe.controller';

describe('DangKyVeXeController', () => {
  let controller: DangKyVeXeController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DangKyVeXeController],
    }).compile();

    controller = module.get<DangKyVeXeController>(DangKyVeXeController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
