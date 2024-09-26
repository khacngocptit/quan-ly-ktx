import { Test, TestingModule } from '@nestjs/testing';
import { DangKyGuiXeController } from './dang-ky-gui-xe.controller';

describe('DangKyGuiXeController', () => {
  let controller: DangKyGuiXeController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DangKyGuiXeController],
    }).compile();

    controller = module.get<DangKyGuiXeController>(DangKyGuiXeController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
