import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { User } from "aws-sdk/clients/budgets";
import { IsNumber, IsString } from "class-validator";
import { PhongKtx } from "src/modules/phong-ktx/phong-ktx.entity";
import { DB_DANG_KY_THUE_PHONG, DB_PHONG, DB_USER } from "src/modules/repository/db-collection";
import * as mongoose from "mongoose";
@Schema({
    collection: DB_DANG_KY_THUE_PHONG,
    timestamps: true,
})

export class DangKyPhong {
    @IsString()
    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: DB_PHONG })
    idPhong: string;

    phong?: PhongKtx;

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

export const DangKyPhongSchema = SchemaFactory.createForClass(DangKyPhong);
DangKyPhongSchema.virtual("phong", {
    ref: DB_PHONG,
    localField: "idPhong",
    foreignField: "_id",
    justOne: true,
});

DangKyPhongSchema.virtual("sinhVien", {
    ref: DB_USER,
    localField: "idSinhVien",
    foreignField: "_id",
    justOne: true,
});

export type DangKyPhongDocument = mongoose.Document & DangKyPhong;
