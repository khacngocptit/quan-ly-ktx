import { Controller, Get, Param } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { CategoryService } from "./category.service";
import { Authorization } from "src/common/decorator/auth.decorator";
import { ResponseDto } from "src/common/dto/response/response.dto";

@Controller("category")
@ApiTags("category")
@Authorization()
export class CategoryController {
    constructor(private readonly catService: CategoryService) {}

    @Get("category/province/all")
    async getProvinceCat() {
        const data = await this.catService.getProvinceCat();
        return ResponseDto.create(data);
    }

    @Get("area/province/all")
    async getProvince() {
        const data = await this.catService.getProvince();
        return ResponseDto.create(data);
    }

    @Get("business-type/all")
    async getBusinessType() {
        const data = await this.catService.getBusinessType();
        return ResponseDto.create(data);
    }

    @Get("country/all")
    async getCountryList() {
        const data = await this.catService.getCountryList();
        return ResponseDto.create(data);
    }

    @Get("area/:code")
    async getAreaByCode(@Param("code") code: string) {
        const data = await this.catService.getAreaByCode(code);
        return ResponseDto.create(data);
    }
}
