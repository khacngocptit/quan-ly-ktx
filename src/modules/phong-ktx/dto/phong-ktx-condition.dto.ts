import { PartialType } from "@nestjs/swagger";
import { PhongKtx } from "../phong-ktx.entity";

export class PhongKtxConditionDto extends PartialType(PhongKtx) {}
