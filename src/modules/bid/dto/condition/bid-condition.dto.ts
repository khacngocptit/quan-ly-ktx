import { IsOptional } from "class-validator";

export class BidCondDto {
    @IsOptional()
    favorite: any;

    @IsOptional()
    bidName: any;
}
