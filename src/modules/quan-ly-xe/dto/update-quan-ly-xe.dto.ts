import { PartialType } from "@nestjs/swagger";
import { QuanLyXe } from "../quan-ly-xe.entity";

export class UpdateQuanLyXeDto extends PartialType(QuanLyXe) {}
