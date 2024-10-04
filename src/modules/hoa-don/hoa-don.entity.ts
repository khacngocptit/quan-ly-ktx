import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { DB_HOA_DON, DB_USER } from "../repository/db-collection";
import * as mongoose from "mongoose";
import { IsEnum, IsNumber, IsString } from "class-validator";
import { User } from "../user/entities/user.entity";
import { LoaiHoaDon, TrangThaiThanhToan } from "./common/hoa-don.constant";

@Schema({
    collection: DB_HOA_DON,
    timestamps: true,
})
export class HoaDon {

    @IsString()
    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: DB_USER })
    idSinhVien: string;

    sinhVien?: User;

    @IsNumber()
    @Prop({ default: 1 })
    soLuong: number;

    @IsNumber()
    @Prop()
    thang: number;

    @IsNumber()
    @Prop()
    nam: number;

    @IsNumber()
    @Prop()
    donGia: number;

    @IsNumber()
    @Prop()
    thanhTien: number;

    @IsEnum(LoaiHoaDon)
    @Prop({ enum: Object.values(LoaiHoaDon) })
    loaiHoaDon: LoaiHoaDon;

    @IsEnum(TrangThaiThanhToan)
    @Prop({ enum: Object.values(TrangThaiThanhToan) })
    trangThaiThanhToan: TrangThaiThanhToan;

    @IsString()
    @Prop()
    idSource: string;
}

export const HoaDonSchema = SchemaFactory.createForClass(HoaDon);

HoaDonSchema.virtual("sinhVien", {
    ref: DB_USER,
    localField: "idSinhVien",
    foreignField: "_id",
    justOne: true,
});

export type HoaDonDocument = mongoose.Document & HoaDon;
