import { Body, Controller, Delete, Get, Param, Post, Put } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { ApiCondition, ApiPageableQuery, QueryCondition, FetchPageableQuery } from "src/common/decorator/api.decorator";
import { ResponseDto } from "src/common/dto/response/response.dto";
import { FetchQueryOption } from "src/common/pipe/fetch-query-option.interface";
import { DangKySuDungDichVuService } from "./dang-ky-su-dung-dich-vu.service";
import { CreateDangKySuDungDichVuDto } from "./dto/create-dang-ky-su-dung-dich-vudto";
import { DangKySuDungDichVuConditionDto } from "./dto/dang-ky-su-dung-dich-vu-condition.dto";

@Controller("dang-ky-su-dung-dich-vu")
@ApiTags("Dang ky su dung dich vu")
export class DangKySuDungDichVuController {
    constructor(private readonly dangKySuDungDichVuService: DangKySuDungDichVuService) { }

    @Get("page")
    @ApiCondition()
    @ApiPageableQuery()
    async getPage(
        @QueryCondition(DangKySuDungDichVuConditionDto) condition: any,
        @FetchPageableQuery() option: FetchQueryOption
    ) {
        const data = await this.dangKySuDungDichVuService.getPaging(condition, option);
        return ResponseDto.create(data);
    }

    @Get("many")
    @ApiCondition()
    async getMany(
        @QueryCondition(DangKySuDungDichVuConditionDto) condition: any,
    ) {
        const data = await this.dangKySuDungDichVuService.get(condition);
        return ResponseDto.create(data);
    }

    @Get(":id")
    async getById(
        @Param("id") id: string,
    ) {
        const data = await this.dangKySuDungDichVuService.getOne({ _id: id });
        return ResponseDto.create(data);
    }

    @Post()
    async create(
        @Body() body: CreateDangKySuDungDichVuDto
    ) {
        const data = await this.dangKySuDungDichVuService.create(body);
        return data;
    }

    @Put(":id")
    async updateById(
        @Param("id") id: string,
        @Body() body: CreateDangKySuDungDichVuDto
    ) {
        const data = await this.dangKySuDungDichVuService.updateById(id, body);
        return data;
    }

    @Delete(":id")
    async deleteById(
        @Param("id") id: string,
    ) {
        const data = await this.dangKySuDungDichVuService.deleteById(id);
        return data;
    }

}

