import { PartialType } from "@nestjs/swagger";
import { DangKyVeXe } from "../dang-ky-ve-xe.entity";

export class CreateDangKyVeXeDto extends PartialType(DangKyVeXe) {}
