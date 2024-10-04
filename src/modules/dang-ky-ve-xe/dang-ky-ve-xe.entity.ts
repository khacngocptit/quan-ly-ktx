import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { User } from "aws-sdk/clients/budgets";
import { IsNumber, IsString } from "class-validator";
import * as mongoose from "mongoose";
import { QuanLyXe } from "src/modules/quan-ly-xe/quan-ly-xe.entity";
import { DB_DANG_KY_VE_XE, DB_QUAN_LY_XE, DB_USER } from "src/modules/repository/db-collection";
@Schema({
    collection: DB_DANG_KY_VE_XE,
    timestamps: true,
})

export class DangKyVeXe {
    @IsString()
    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: DB_QUAN_LY_XE })
    idXe: string;

    xe?: QuanLyXe;

    @IsString()
    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: DB_USER })
    idSinhVien: string;

    sinhVien?: User;

    @IsNumber()
    @Prop()
    thang: number;

    @IsNumber()
    @Prop()
    nam: number;
}

export const DangKyVeXeSchema = SchemaFactory.createForClass(DangKyVeXe);
DangKyVeXeSchema.virtual("xe", {
    ref: DB_QUAN_LY_XE,
    localField: "idXe",
    foreignField: "_id",
    justOne: true,
});

DangKyVeXeSchema.virtual("sinhVien", {
    ref: DB_USER,
    localField: "idSinhVien",
    foreignField: "_id",
    justOne: true,
});

export type DangKyVeXeDocument = mongoose.Document & DangKyVeXe;
