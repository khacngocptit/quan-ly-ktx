import { PartialType } from "@nestjs/swagger";
import { LayGuiXe } from "../lay-gui-xe.entity";

export class UpdateLayGuiXeDto extends PartialType(LayGuiXe) {}
