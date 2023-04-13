import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { IsBoolean } from "class-validator";
import { Document } from "mongoose";
import { DB_INVESTOR } from "src/modules/repository/db-collection";

@Schema({ collection: DB_INVESTOR, strict: false })
export class Investor {
    @IsBoolean()
    @Prop({ required: true, default: false })
    favorite: boolean;

    @IsBoolean()
    @Prop({ required: true, default: false })
    version: boolean;
}

export const InvestorSchema = SchemaFactory.createForClass(Investor);
export type InvestorDoc = Investor & Document;
