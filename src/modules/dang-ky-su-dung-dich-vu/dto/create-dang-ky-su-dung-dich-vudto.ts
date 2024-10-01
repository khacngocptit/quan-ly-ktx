import { PartialType } from "@nestjs/swagger";
import { DangKySuDungDichVu } from "../dang-ky-su-dung-dich-vu.entity";

export class CreateDangKySuDungDichVuDto extends PartialType(DangKySuDungDichVu) {}
