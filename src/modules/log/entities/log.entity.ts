import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { IsOptional, IsString } from "class-validator";
import { DB_LOG } from "src/modules/repository/db-collection";
import * as mongoose from "mongoose";

@Schema({ collection: DB_LOG })
export class Log {
    @IsString()
    @Prop({ required: true })
    title: string;

    @IsString()
    @Prop()
    @IsOptional()
    content: string;

    @Prop({ type: mongoose.Schema.Types.Mixed })
    @IsOptional()
    info?: any;
}

export const LogSchema = SchemaFactory.createForClass(Log);
export type LogDocument = Log & mongoose.Document;
