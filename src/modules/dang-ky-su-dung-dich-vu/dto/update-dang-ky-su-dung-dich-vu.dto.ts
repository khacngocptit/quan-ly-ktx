import { PartialType } from "@nestjs/swagger";
import { DangKySuDungDichVu } from "../dang-ky-su-dung-dich-vu.entity";

export class UpdateDangKySuDungDichVuDto extends PartialType(DangKySuDungDichVu) {}
