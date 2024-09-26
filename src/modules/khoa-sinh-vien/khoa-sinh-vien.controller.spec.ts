import { Test, TestingModule } from '@nestjs/testing';
import { KhoaSinhVienController } from './khoa-sinh-vien.controller';

describe('KhoaSinhVienController', () => {
  let controller: KhoaSinhVienController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [KhoaSinhVienController],
    }).compile();

    controller = module.get<KhoaSinhVienController>(KhoaSinhVienController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
