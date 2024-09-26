import { Test, TestingModule } from '@nestjs/testing';
import { KhoaSinhVienService } from './khoa-sinh-vien.service';

describe('KhoaSinhVienService', () => {
  let service: KhoaSinhVienService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [KhoaSinhVienService],
    }).compile();

    service = module.get<KhoaSinhVienService>(KhoaSinhVienService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
