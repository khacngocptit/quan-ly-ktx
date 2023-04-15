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

    @Get("uy-ban-nhan-dan/all")
    async getUBND() {
        const data = await this.catService.getUBND();
        return ResponseDto.create(data);
    }
    @Get("bo-ban-nganh/all")
    async getBoBN() {
        const data = await this.catService.getBoBanNganh();
        return ResponseDto.create(data);
    }
    @Get("tap-doan/all")
    async getTapDoan() {
        const data = await this.catService.getTapDoan();
        return ResponseDto.create(data);
    }
    @Get("status/all")
    async getTrangThai() {
        const data = await this.catService.getRoleStatus();
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

    @Get("co-quan-chu-quan/:code")
    async getCqcqByCode(@Param("code") code: string) {
        const data = await this.catService.getCoQuanChuQuanByCode(code);
        return ResponseDto.create(data);
    }
}
