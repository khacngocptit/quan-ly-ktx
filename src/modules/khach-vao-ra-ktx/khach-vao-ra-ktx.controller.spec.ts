import { Test, TestingModule } from '@nestjs/testing';
import { KhachVaoRaKtxController } from './khach-vao-ra-ktx.controller';

describe('KhachVaoRaKtxController', () => {
  let controller: KhachVaoRaKtxController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [KhachVaoRaKtxController],
    }).compile();

    controller = module.get<KhachVaoRaKtxController>(KhachVaoRaKtxController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
