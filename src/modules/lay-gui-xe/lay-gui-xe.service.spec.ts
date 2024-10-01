import { Test, TestingModule } from '@nestjs/testing';
import { LayGuiXeService } from './lay-gui-xe.service';

describe('LayGuiXeService', () => {
  let service: LayGuiXeService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [LayGuiXeService],
    }).compile();

    service = module.get<LayGuiXeService>(LayGuiXeService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
