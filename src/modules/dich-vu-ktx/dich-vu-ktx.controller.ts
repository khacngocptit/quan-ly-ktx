import { Body, Controller, Delete, Get, Param, Post, Put } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { ApiCondition, ApiPageableQuery, QueryCondition, FetchPageableQuery } from "src/common/decorator/api.decorator";
import { ResponseDto } from "src/common/dto/response/response.dto";
import { FetchQueryOption } from "src/common/pipe/fetch-query-option.interface";
import { DichVuKtxService } from "./dich-vu-ktx.service";
import { CreateDichVuKtxDto } from "./dto/create-dich-vu-ktx.dto";
import { DichVuKtxConditionDto } from "./dto/dich-vu-ktx-condition.dto";
import { Authorization } from "src/common/decorator/auth.decorator";

@Controller("dich-vu")
@ApiTags("Dich vu KTX")
@Authorization()
export class DichVuKtxController {
    constructor(private readonly dichVuKtxService: DichVuKtxService) { }

    @Get("page")
    @ApiCondition()
    @ApiPageableQuery()
    async getPage(
        @QueryCondition(DichVuKtxConditionDto) condition: any,
        @FetchPageableQuery() option: FetchQueryOption
    ) {
        const data = await this.dichVuKtxService.getPaging(condition, option);
        return ResponseDto.create(data);
    }

    @Get("many")
    @ApiCondition()
    async getMany(
        @QueryCondition(DichVuKtxConditionDto) condition: any,
    ) {
        const data = await this.dichVuKtxService.get(condition);
        return ResponseDto.create(data);
    }

    @Get(":id")
    async getById(
        @Param("id") id: string,
    ) {
        const data = await this.dichVuKtxService.getOne({ _id: id });
        return ResponseDto.create(data);
    }

    @Post()
    async create(
        @Body() body: CreateDichVuKtxDto
    ) {
        const data = await this.dichVuKtxService.create(body);
        return data;
    }

    @Put(":id")
    async updateById(
        @Param("id") id: string,
        @Body() body: CreateDichVuKtxDto
    ) {
        const data = await this.dichVuKtxService.updateById(id, body);
        return data;
    }

    @Delete(":id")
    async deleteById(
        @Param("id") id: string,
    ) {
        const data = await this.dichVuKtxService.deleteById(id);
        return data;
    }

}
