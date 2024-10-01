import { Test, TestingModule } from '@nestjs/testing';
import { QuanLyXeController } from './quan-ly-xe.controller';

describe('QuanLyXeController', () => {
  let controller: QuanLyXeController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [QuanLyXeController],
    }).compile();

    controller = module.get<QuanLyXeController>(QuanLyXeController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
