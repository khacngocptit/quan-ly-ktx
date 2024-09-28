import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { IsNumber, IsString } from "class-validator";
import * as mongoose from "mongoose";
import { DB_DICH_VU_KTX } from "../repository/db-collection";

@Schema({
    collection: DB_DICH_VU_KTX,
})

export class DichVuKtx {
    @IsString()
    @Prop()
    maDichVu: string;

    @IsString()
    @Prop()
    tenDichVu: string;

    @IsNumber()
    @Prop()
    thoiGianSuDung: number;

    @IsNumber()
    @Prop()
    donGia: number;
}

export const DichVuKtxSchema = SchemaFactory.createForClass(DichVuKtx);
export type DichVuKtxDocument = mongoose.Document & DichVuKtx;
