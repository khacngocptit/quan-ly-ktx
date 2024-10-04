import { Body, Controller, Delete, Get, Param, Post, Put } from "@nestjs/common";
import { ApiCondition, ApiPageableQuery, QueryCondition, FetchPageableQuery } from "src/common/decorator/api.decorator";
import { ResponseDto } from "src/common/dto/response/response.dto";
import { FetchQueryOption } from "src/common/pipe/fetch-query-option.interface";
import { DangKyPhongService } from "./dang-ky-phong.service";
import { CreateDangKyPhongDto } from "./dto/create-dang-ky-phong.dto";
import { DangKyPhongConditionDto } from "./dto/dang-ky-phong-condition.dto";
import { ApiTags } from "@nestjs/swagger";
import { Authorization } from "src/common/decorator/auth.decorator";
import { PageableDto } from "src/common/dto/pageable.dto";

@Controller("dang-ky-phong")
@ApiTags("Dang ky phong")
@Authorization()
export class DangKyPhongController {
    constructor(private readonly dangKyPhongService: DangKyPhongService) { }

    @Get("page")
    @ApiCondition()
    @ApiPageableQuery()
    async getPage(
        @QueryCondition(DangKyPhongConditionDto) condition: any,
        @FetchPageableQuery() option: FetchQueryOption
    ) {
        const { total, data } = this.dangKyPhongService.getPagingComponent(condition, option);
        const result = await Promise.all([total, data.populate("idSinhVien").populate("idPhong")]);
        return ResponseDto.create(PageableDto.create(option, result[0], result[1]));
    }

    @Get("many")
    @ApiCondition()
    async getMany(
        @QueryCondition(DangKyPhongConditionDto) condition: any,
    ) {
        const data = await this.dangKyPhongService.get(condition);
        return ResponseDto.create(data);
    }

    @Get(":id")
    async getById(
        @Param("id") id: string,
    ) {
        const data = await this.dangKyPhongService.getOne({ _id: id });
        return ResponseDto.create(data);
    }

    @Post()
    async create(
        @Body() body: CreateDangKyPhongDto
    ) {
        const data = await this.dangKyPhongService.create(body);
        return data;
    }

    @Put(":id")
    async updateById(
        @Param("id") id: string,
        @Body() body: CreateDangKyPhongDto
    ) {
        const data = await this.dangKyPhongService.updateById(id, body);
        return data;
    }

    @Delete(":id")
    async deleteById(
        @Param("id") id: string,
    ) {
        const data = await this.dangKyPhongService.deleteById(id);
        return data;
    }

}

