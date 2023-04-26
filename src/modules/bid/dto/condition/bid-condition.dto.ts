import { IsOptional, IsString } from "class-validator";

export class BidCondDto {
    @IsOptional()
    favorite: any;

    @IsOptional()
    bidName: any;

    @IsOptional()
    procuringEntityCode: any;

    @IsString()
    @IsOptional()
    searchQuery: string;

    @IsOptional()
    status: any;

    @IsOptional()
    bidCloseDate: any;

    @IsOptional()
    publicDate: any;
}
