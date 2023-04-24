import { IsOptional, IsString } from "class-validator";

export class InvestorCondDto {
    @IsOptional()
    favorite: any;

    @IsOptional()
    orgFullname: any;

    @IsOptional()
    orgCode: any;

    @IsOptional()
    taxCode: any;

    @IsString()
    @IsOptional()
    searchQuery: string;

    @IsOptional()
    status: any;
}
