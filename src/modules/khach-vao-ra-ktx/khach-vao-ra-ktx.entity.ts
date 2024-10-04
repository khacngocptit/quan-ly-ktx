import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { IsDateString, IsNumber, IsString } from "class-validator";
import * as mongoose from "mongoose";
import { DB_KHACH_VAO_RA_KTX, DB_USER } from "../repository/db-collection";
import { User } from "aws-sdk/clients/budgets";

@Schema({
    collection: DB_KHACH_VAO_RA_KTX,
    timestamps: true,
})

export class KhachVaoRaKtx {
    @IsString()
    @Prop()
    cmtCccd: string;

    @IsString()
    @Prop()
    hoTen: string;

    @IsDateString()
    @Prop()
    ngaySinh: Date;

    @IsString()
    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: DB_USER })
    idSinhVien: string;

    sinhVien?: User;

    @IsDateString()
    @Prop()
    ngayDen: Date;
}

export const KhachVaoRaKtxSchema = SchemaFactory.createForClass(KhachVaoRaKtx);

KhachVaoRaKtxSchema.virtual("sinhVien", {
    ref: DB_USER,
    localField: "idSinhVien",
    foreignField: "_id",
    justOne: true,
});

export type KhachVaoRaKtxDocument = mongoose.Document & KhachVaoRaKtx;
