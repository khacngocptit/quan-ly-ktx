import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { User } from "aws-sdk/clients/budgets";
import { IsDateString, IsNumber, IsString } from "class-validator";
import { PhongKtx } from "src/modules/phong-ktx/phong-ktx.entity";
import { DB_DANG_KY_DICH_VU, DB_DANG_KY_VE_XE, DB_DANG_KY_THUE_PHONG, DB_DICH_VU_KTX, DB_PHONG, DB_USER } from "src/modules/repository/db-collection";
import * as mongoose from "mongoose";
import { DichVuKtx } from "src/modules/dich-vu-ktx/dich-vu-ktx.entity";
@Schema({
    collection: DB_DANG_KY_DICH_VU,
    timestamps: true,
})

export class DangKySuDungDichVu {
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

    @IsString()
    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: DB_DICH_VU_KTX })
    idDichVu: string;

    dichVu?: DichVuKtx;

    @Prop()
    donGia: number;

    @IsDateString()
    @Prop()
    thoiGianBatDauSuDung: Date;

    @IsDateString()
    @Prop()
    thoiGianKetThucSuDung: Date;
}

export const DangKySuDungDichVuSchema = SchemaFactory.createForClass(DangKySuDungDichVu);
DangKySuDungDichVuSchema.virtual("phong", {
    ref: DB_PHONG,
    localField: "idPhong",
    foreignField: "_id",
    justOne: true,
});

DangKySuDungDichVuSchema.virtual("sinhVien", {
    ref: DB_USER,
    localField: "idSinhVien",
    foreignField: "_id",
    justOne: true,
});

DangKySuDungDichVuSchema.virtual("dichVu", {
    ref: DB_DICH_VU_KTX,
    localField: "idDichVu",
    foreignField: "_id",
    justOne: true,
});

export type DangKySuDungDichVuDocument = mongoose.Document & DangKySuDungDichVu;
