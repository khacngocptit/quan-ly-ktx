import { Test, TestingModule } from '@nestjs/testing';
import { DichVuKtxController } from './dich-vu-ktx.controller';

describe('DichVuKtxController', () => {
  let controller: DichVuKtxController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DichVuKtxController],
    }).compile();

    controller = module.get<DichVuKtxController>(DichVuKtxController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
