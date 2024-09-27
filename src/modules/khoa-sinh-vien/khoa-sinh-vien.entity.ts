import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { DB_KHOA_SINH_VIEN } from "../repository/db-collection";
import * as mongoose from "mongoose";
import { IsString } from "class-validator";

@Schema({
    collection: DB_KHOA_SINH_VIEN,
})

export class KhoaSinhVien {
    @IsString()
    @Prop()
    ma: string;

    @IsString()
    @Prop()
    ten: string;
}

export const KhoaSinhVienSchema = SchemaFactory.createForClass(KhoaSinhVien);
