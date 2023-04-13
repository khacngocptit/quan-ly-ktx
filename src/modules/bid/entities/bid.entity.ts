import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { IsBoolean } from "class-validator";
import { Document } from "mongoose";
import { DB_BID } from "src/modules/repository/db-collection";

@Schema({ collection: DB_BID, strict: false })
export class Bid {
    @IsBoolean()
    @Prop({ required: true, default: false })
    favorite: boolean;

    @IsBoolean()
    @Prop({ required: true, default: false })
    version: boolean;
}

export const BidSchema = SchemaFactory.createForClass(Bid);
export type BidDoc = Bid & Document;
