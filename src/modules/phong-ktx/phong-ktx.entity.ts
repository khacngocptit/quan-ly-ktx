import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { IsNumber, IsString } from "class-validator";
import * as mongoose from "mongoose";
import { DB_PHONG } from "../repository/db-collection";

@Schema({
    collection: DB_PHONG,
})

export class PhongKtx {
    @IsString()
    @Prop()
    soPhong: string;

    @IsString()
    @Prop()
    loaiPhong: string;

    @IsNumber()
    @Prop()
    soNguoiToiDa: number;

    @IsNumber()
    @Prop()
    donGia: number;
}

export const PhongKtxSchema = SchemaFactory.createForClass(PhongKtx);
export type PhongKtxDocument = mongoose.Document & PhongKtx;
