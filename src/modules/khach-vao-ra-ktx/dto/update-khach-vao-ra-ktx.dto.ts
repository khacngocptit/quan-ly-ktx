import { PartialType } from "@nestjs/swagger";
import { KhachVaoRaKtx } from "../khach-vao-ra-ktx.entity";

export class UpdateKhachVaoRaKtxDto extends PartialType(KhachVaoRaKtx) {}
