import { PartialType } from "@nestjs/swagger";
import { DangKyPhong } from "../dang-ky-phong.entity";

export class DangKyPhongConditionDto extends PartialType(DangKyPhong) {}
