import { PartialType } from "@nestjs/swagger";
import { KhachVaoRaKtx } from "../khach-vao-ra-ktx.entity";

export class CreateKhachVaoRaKtxDto extends PartialType(KhachVaoRaKtx) {}
