import { IsOptional } from "class-validator";

export class InvestorCondDto {
    @IsOptional()
    favorite: any;

    @IsOptional()
    orgFullname: any;
}
