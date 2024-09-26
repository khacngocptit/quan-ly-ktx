import { Test, TestingModule } from '@nestjs/testing';
import { GuiXeController } from './gui-xe.controller';

describe('GuiXeController', () => {
  let controller: GuiXeController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [GuiXeController],
    }).compile();

    controller = module.get<GuiXeController>(GuiXeController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
