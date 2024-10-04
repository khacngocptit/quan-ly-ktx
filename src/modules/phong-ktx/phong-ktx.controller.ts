import { Body, Controller, Delete, Get, Param, Post, Put } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { PhongKtxService } from "./phong-ktx.service";
import { ApiCondition, ApiPageableQuery, FetchPageableQuery, QueryCondition } from "src/common/decorator/api.decorator";
import { PhongKtxConditionDto } from "./dto/phong-ktx-condition.dto";
import { FetchQueryOption } from "src/common/pipe/fetch-query-option.interface";
import { CreatePhongKtxDto } from "./dto/create-phong-ktx.dto";
import { ResponseDto } from "src/common/dto/response/response.dto";
import { Authorization } from "src/common/decorator/auth.decorator";

@Controller("phong-ktx")
@ApiTags("Phong KTX")
@Authorization()
export class PhongKtxController {
    constructor(private readonly phongKtxService: PhongKtxService) { }

    @Get("page")
    @ApiCondition()
    @ApiPageableQuery()
    async getPage(
        @QueryCondition(PhongKtxConditionDto) condition: any,
        @FetchPageableQuery() option: FetchQueryOption
    ) {
        const data = await this.phongKtxService.getPaging(condition, option);
        return ResponseDto.create(data);
    }

    @Get("many")
    @ApiCondition()
    async getMany(
        @QueryCondition(PhongKtxConditionDto) condition: any,
    ) {
        const data = await this.phongKtxService.get(condition);
        return ResponseDto.create(data);
    }

    @Get(":id")
    async getById(
        @Param("id") id: string,
    ) {
        const data = await this.phongKtxService.getOne({ _id: id });
        return ResponseDto.create(data);
    }

    @Post()
    async create(
        @Body() body: CreatePhongKtxDto
    ) {
        const data = await this.phongKtxService.create(body);
        return data;
    }

    @Put(":id")
    async updateById(
        @Param("id") id: string,
        @Body() body: CreatePhongKtxDto
    ) {
        const data = await this.phongKtxService.updateById(id, body);
        return data;
    }

    @Delete(":id")
    async deleteById(
        @Param("id") id: string,
    ) {
        const data = await this.phongKtxService.deleteById(id);
        return data;
    }

}
