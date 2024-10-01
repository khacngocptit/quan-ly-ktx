import { PartialType } from "@nestjs/swagger";
import { HoaDon } from "../hoa-don.entity";

export class HoaDonConditionDto extends PartialType(HoaDon) {}
