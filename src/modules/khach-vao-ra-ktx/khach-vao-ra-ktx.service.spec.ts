import { Test, TestingModule } from "@nestjs/testing";
import { KhachVaoRaKtxService } from "./khach-vao-ra-ktx.service";

describe("KhachVaoRaKtxService", () => {
    let service: KhachVaoRaKtxService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [KhachVaoRaKtxService],
        }).compile();

        service = module.get<KhachVaoRaKtxService>(KhachVaoRaKtxService);
    });

    it("should be defined", () => {
        expect(service).toBeDefined();
    });
});
