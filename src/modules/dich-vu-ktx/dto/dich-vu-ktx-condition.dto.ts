import { PartialType } from "@nestjs/swagger";
import { DichVuKtx } from "../dich-vu-ktx.entity";

export class DichVuKtxConditionDto extends PartialType(DichVuKtx) {}
