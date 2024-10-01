import { PartialType } from "@nestjs/swagger";
import { DangKyVeXe } from "../dang-ky-ve-xe.entity";

export class DangKyVeXeConditionDto extends PartialType(DangKyVeXe) {}
