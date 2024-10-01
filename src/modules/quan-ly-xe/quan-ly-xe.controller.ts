import { Body, Controller, Delete, Get, Param, Post, Put } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { ApiCondition, ApiPageableQuery, QueryCondition, FetchPageableQuery } from "src/common/decorator/api.decorator";
import { ResponseDto } from "src/common/dto/response/response.dto";
import { FetchQueryOption } from "src/common/pipe/fetch-query-option.interface";
import { CreateQuanLyXeDto } from "./dto/create-quan-ly-xe.dto";
import { QuanLyXeConditionDto } from "./dto/quan-ly-xe-condition.dto";
import { QuanLyXeService } from "./quan-ly-xe.service";

@Controller("quan-ly-xe")
@ApiTags("Quan ly xe")
export class QuanLyXeController {
    constructor(private readonly quanLyXeService: QuanLyXeService) { }

    @Get("page")
    @ApiCondition()
    @ApiPageableQuery()
    async getPage(
        @QueryCondition(QuanLyXeConditionDto) condition: any,
        @FetchPageableQuery() option: FetchQueryOption
    ) {
        const data = await this.quanLyXeService.getPaging(condition, option);
        return ResponseDto.create(data);
    }

    @Get("many")
    @ApiCondition()
    async getMany(
        @QueryCondition(QuanLyXeConditionDto) condition: any,
    ) {
        const data = await this.quanLyXeService.get(condition);
        return ResponseDto.create(data);
    }

    @Get(":id")
    async getById(
        @Param("id") id: string,
    ) {
        const data = await this.quanLyXeService.getOne({ _id: id });
        return ResponseDto.create(data);
    }

    @Post()
    async create(
        @Body() body: CreateQuanLyXeDto
    ) {
        const data = await this.quanLyXeService.create(body);
        return data;
    }

    @Put(":id")
    async updateById(
        @Param("id") id: string,
        @Body() body: CreateQuanLyXeDto
    ) {
        const data = await this.quanLyXeService.updateById(id, body);
        return data;
    }

    @Delete(":id")
    async deleteById(
        @Param("id") id: string,
    ) {
        const data = await this.quanLyXeService.deleteById(id);
        return data;
    }
}

