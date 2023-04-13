import { IsOptional, IsString } from "class-validator";

export class InvestorCondDto {
    @IsOptional()
    favorite: any;

    @IsOptional()
    orgFullname: any;

    @IsOptional()
    orgCode: any;

    @IsString()
    @IsOptional()
    searchQuery: string;
}
