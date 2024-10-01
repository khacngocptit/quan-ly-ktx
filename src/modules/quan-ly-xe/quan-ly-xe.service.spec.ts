import { Test, TestingModule } from '@nestjs/testing';
import { QuanLyXeService } from './quan-ly-xe.service';

describe('QuanLyXeService', () => {
  let service: QuanLyXeService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [QuanLyXeService],
    }).compile();

    service = module.get<QuanLyXeService>(QuanLyXeService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
