import { PartialType } from "@nestjs/swagger";
import { IsOptional } from "class-validator";
import { User } from "../entities/user.entity";

export class UserCondition extends PartialType(User) {
    @IsOptional()
    email: any;
}
