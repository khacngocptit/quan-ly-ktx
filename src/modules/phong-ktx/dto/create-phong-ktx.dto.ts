import { PartialType } from "@nestjs/swagger";
import { PhongKtx } from "../phong-ktx.entity";

export class CreatePhongKtxDto extends PartialType(PhongKtx) {}
