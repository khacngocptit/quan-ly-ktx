import { PartialType } from "@nestjs/swagger";
import { DangKySuDungDichVu } from "../dang-ky-su-dung-dich-vu.entity";

export class DangKySuDungDichVuConditionDto extends PartialType(DangKySuDungDichVu) {}
