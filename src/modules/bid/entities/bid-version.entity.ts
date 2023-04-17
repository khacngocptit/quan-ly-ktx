import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { IsBoolean, IsString } from "class-validator";
import { Document } from "mongoose";
import { DB_BID_VERSION } from "src/modules/repository/db-collection";

@Schema({ collection: DB_BID_VERSION, strict: false })
export class BidVersion {
    @IsString()
    @Prop()
    bidId: string;

    @IsString({ each: true })
    @Prop()
    bidName: string[];

    @IsString()
    @Prop()
    investorName: string;

    @IsString()
    @Prop()
    notifyVersion: string;

    @IsBoolean()
    @Prop()
    notifyNeeded: boolean;
}

export const BidVersionSchema = SchemaFactory.createForClass(BidVersion);
export type BidVersionDoc = BidVersion & Document;
