import { Test, TestingModule } from '@nestjs/testing';
import { LayGuiXeController } from './lay-gui-xe.controller';

describe('LayGuiXeController', () => {
  let controller: LayGuiXeController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [LayGuiXeController],
    }).compile();

    controller = module.get<LayGuiXeController>(LayGuiXeController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
