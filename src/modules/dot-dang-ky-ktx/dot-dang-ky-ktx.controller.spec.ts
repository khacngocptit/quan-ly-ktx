import { Test, TestingModule } from '@nestjs/testing';
import { DotDangKyKtxController } from './dot-dang-ky-ktx.controller';

describe('DotDangKyKtxController', () => {
  let controller: DotDangKyKtxController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DotDangKyKtxController],
    }).compile();

    controller = module.get<DotDangKyKtxController>(DotDangKyKtxController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
