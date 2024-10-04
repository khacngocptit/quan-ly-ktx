import { Body, Controller, Delete, Get, Param, Post, Put } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { ApiCondition, ApiPageableQuery, QueryCondition, FetchPageableQuery } from "src/common/decorator/api.decorator";
import { Authorization } from "src/common/decorator/auth.decorator";
import { ResponseDto } from "src/common/dto/response/response.dto";
import { FetchQueryOption } from "src/common/pipe/fetch-query-option.interface";
import { DangKyVeXeService } from "./dang-ky-ve-xe.service";
import { CreateDangKyVeXeDto } from "./dto/create-dang-ky-ve-xe.dto";
import { DangKyVeXeConditionDto } from "./dto/dang-ky-ve-xe-condition.dto";
import { PageableDto } from "src/common/dto/pageable.dto";

@Controller("dang-ky-ve-xe")
@ApiTags("Dang ky ve xe")
@Authorization()
export class DangKyVeXeController {
    constructor(private readonly dangKyVeXeService: DangKyVeXeService) { }

    @Get("page")
    @ApiCondition()
    @ApiPageableQuery()
    async getPage(
        @QueryCondition(DangKyVeXeConditionDto) condition: any,
        @FetchPageableQuery() option: FetchQueryOption
    ) {
        const { total, data } = this.dangKyVeXeService.getPagingComponent(condition, option);
        const result = await Promise.all([total, data.populate("idSinhVien").populate("idXe")]);
        return ResponseDto.create(PageableDto.create(option, result[0], result[1] ));
    }

    @Get("many")
    @ApiCondition()
    async getMany(
        @QueryCondition(DangKyVeXeConditionDto) condition: any,
    ) {
        const data = await this.dangKyVeXeService.get(condition).populate("idSinhVien");
        return ResponseDto.create(data);
    }

    @Get(":id")
    async getById(
        @Param("id") id: string,
    ) {
        const data = await this.dangKyVeXeService.getOne({ _id: id });
        return ResponseDto.create(data);
    }

    @Post()
    async create(
        @Body() body: CreateDangKyVeXeDto
    ) {
        const data = await this.dangKyVeXeService.create(body);
        return data;
    }

    @Put(":id")
    async updateById(
        @Param("id") id: string,
        @Body() body: CreateDangKyVeXeDto
    ) {
        const data = await this.dangKyVeXeService.updateById(id, body);
        return data;
    }

    @Delete(":id")
    async deleteById(
        @Param("id") id: string,
    ) {
        const data = await this.dangKyVeXeService.deleteById(id);
        return data;
    }

}

