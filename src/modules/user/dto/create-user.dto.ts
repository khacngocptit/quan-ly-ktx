import { PartialType, PickType } from "@nestjs/swagger";
import { CreateProfileDto } from "../../profile/dto/create-profile.dto";
import { User } from "../entities/user.entity";
import { UserModule } from "../user.module";

export class CreateUserDto extends PartialType(User) {}
