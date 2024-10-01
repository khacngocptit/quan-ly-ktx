import { Body, Controller, Delete, Get, Param, Post, Put } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { ApiCondition, ApiPageableQuery, QueryCondition, FetchPageableQuery } from "src/common/decorator/api.decorator";
import { Authorization } from "src/common/decorator/auth.decorator";
import { ResponseDto } from "src/common/dto/response/response.dto";
import { FetchQueryOption } from "src/common/pipe/fetch-query-option.interface";
import { CreateHoaDonDto } from "./dto/create-hoa-don.dto";
import { HoaDonConditionDto } from "./dto/hoa-don-condition.dto";
import { HoaDonService } from "./hoa-don.service";

@Controller("hoa-don")
    @ApiTags("Hoa don")
@Authorization()
export class HoaDonController {
    constructor(private readonly hoaDonService: HoaDonService) { }

    @Get("page")
    @ApiCondition()
    @ApiPageableQuery()
    async getPage(
        @QueryCondition(HoaDonConditionDto) condition: any,
        @FetchPageableQuery() option: FetchQueryOption
    ) {
        const data = await this.hoaDonService.getPaging(condition, option);
        return ResponseDto.create(data);
    }

    @Get("many")
    @ApiCondition()
    async getMany(
        @QueryCondition(HoaDonConditionDto) condition: any,
    ) {
        const data = await this.hoaDonService.get(condition);
        return ResponseDto.create(data);
    }

    @Get(":id")
    async getById(
        @Param("id") id: string,
    ) {
        const data = await this.hoaDonService.getOne({ _id: id });
        return ResponseDto.create(data);
    }

    @Post()
    async create(
        @Body() body: CreateHoaDonDto
    ) {
        const data = await this.hoaDonService.create(body);
        return data;
    }

    @Put(":id")
    async updateById(
        @Param("id") id: string,
        @Body() body: CreateHoaDonDto
    ) {
        const data = await this.hoaDonService.updateById(id, body);
        return data;
    }

    @Delete(":id")
    async deleteById(
        @Param("id") id: string,
    ) {
        const data = await this.hoaDonService.deleteById(id);
        return data;
    }
}
