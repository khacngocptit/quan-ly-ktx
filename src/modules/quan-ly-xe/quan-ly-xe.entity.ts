import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { User } from "aws-sdk/clients/budgets";
import { IsString } from "class-validator";
import * as mongoose from "mongoose";
import { PhongKtx } from "src/modules/phong-ktx/phong-ktx.entity";
import { DB_PHONG, DB_QUAN_LY_XE, DB_USER } from "src/modules/repository/db-collection";
@Schema({
    collection: DB_QUAN_LY_XE,
    timestamps: true,
})

export class QuanLyXe {
    @IsString()
    @Prop({
        type: mongoose.Schema.Types.ObjectId, ref: DB_PHONG,

    })
    idPhong: string;

    phong?: PhongKtx;

    @IsString()
    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: DB_USER })
    idSinhVien: string;

    sinhVien?: User;

    @IsString()
    @Prop()
    bienSo: string;
}

export const QuanLyXeSchema = SchemaFactory.createForClass(QuanLyXe);
QuanLyXeSchema.virtual("phong", {
    ref: DB_PHONG,
    localField: "idPhong",
    foreignField: "_id",
    justOne: true,
});

QuanLyXeSchema.virtual("sinhVien", {
    ref: DB_USER,
    localField: "idSinhVien",
    foreignField: "_id",
    justOne: true,
});

export type QuanLyXeDocument = mongoose.Document & QuanLyXe;
