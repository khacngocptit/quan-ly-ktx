import { Test, TestingModule } from '@nestjs/testing';
import { PhongKtxController } from './phong-ktx.controller';

describe('PhongKtxController', () => {
  let controller: PhongKtxController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PhongKtxController],
    }).compile();

    controller = module.get<PhongKtxController>(PhongKtxController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
