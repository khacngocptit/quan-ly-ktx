import { PartialType } from "@nestjs/swagger";
import { DichVuKtx } from "../dich-vu-ktx.entity";

export class CreateDichVuKtxDto extends PartialType(DichVuKtx) {}
