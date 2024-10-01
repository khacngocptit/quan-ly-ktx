import { PartialType } from "@nestjs/swagger";
import { DangKyPhong } from "../dang-ky-phong.entity";

export class UpdateDangKyPhongDto extends PartialType(DangKyPhong) {}
