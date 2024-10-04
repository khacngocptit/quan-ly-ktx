import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { DB_LAY_GUI_XE, DB_QUAN_LY_XE, DB_USER } from "../repository/db-collection";
import * as mongoose from "mongoose";
import { IsDateString, IsNumber, IsString } from "class-validator";
import { User } from "../user/entities/user.entity";

@Schema({
    collection: DB_LAY_GUI_XE,
})

export class LayGuiXe {
    @IsString()
    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: DB_USER })
    idSinhVien: string;

    sinhVien?: User;

    @IsString()
    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: DB_QUAN_LY_XE })
    idXe: string;

    xe?: User;

    @IsNumber()
    @Prop()
    ngay: number;

    @IsNumber()
    @Prop()
    thang: number;

    @IsNumber()
    @Prop()
    nam: number;

    @IsDateString()
    @Prop()
    thoiGianGuiXe: Date;

}

export const LayGuiXeSchema = SchemaFactory.createForClass(LayGuiXe);

LayGuiXeSchema.virtual("sinhVien", {
    ref: DB_USER,
    localField: "idSinhVien",
    foreignField: "_id",
    justOne: true,
});

LayGuiXeSchema.virtual("xe", {
    ref: DB_QUAN_LY_XE,
    localField: "idXe",
    foreignField: "_id",
    justOne: true,
});
export type LayGuiXeDocument = mongoose.Document & LayGuiXe;
