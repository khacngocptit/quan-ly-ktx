import { Test, TestingModule } from '@nestjs/testing';
import { GuiXeService } from './gui-xe.service';

describe('GuiXeService', () => {
  let service: GuiXeService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [GuiXeService],
    }).compile();

    service = module.get<GuiXeService>(GuiXeService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
