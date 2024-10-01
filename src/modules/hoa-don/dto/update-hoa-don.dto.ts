import { PartialType } from "@nestjs/swagger";
import { HoaDon } from "../hoa-don.entity";

export class UpdateHoaDonDto extends PartialType(HoaDon) {}
