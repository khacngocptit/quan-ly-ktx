import { Body, Controller, Delete, Get, Param, Post, Put } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { ApiCondition, ApiPageableQuery, QueryCondition, FetchPageableQuery } from "src/common/decorator/api.decorator";
import { Authorization } from "src/common/decorator/auth.decorator";
import { ResponseDto } from "src/common/dto/response/response.dto";
import { FetchQueryOption } from "src/common/pipe/fetch-query-option.interface";
import { CreateLayGuiXeDto } from "./dto/create-lay-gui-xe.dto";
import { LayGuiXeConditionDto } from "./dto/lay-gui-xe-condition.dto";
import { LayGuiXeService } from "./lay-gui-xe.service";
import { PageableDto } from "src/common/dto/pageable.dto";

@Controller("lay-gui-xe")
@ApiTags("Lay gui xe")
@Authorization()
export class LayGuiXeController {
    constructor(private readonly layGuiXeService: LayGuiXeService) { }

    @Get("page")
    @ApiCondition()
    @ApiPageableQuery()
    async getPage(
        @QueryCondition(LayGuiXeConditionDto) condition: any,
        @FetchPageableQuery() option: FetchQueryOption
    ) {
        const { total, data } = this.layGuiXeService.getPagingComponent(condition, option);
        const result = await Promise.all([total, data.populate("idSinhVien").populate("idXe")]);
        return ResponseDto.create(PageableDto.create(option, result[0], result[1]));
    }

    @Get("many")
    @ApiCondition()
    async getMany(
        @QueryCondition(LayGuiXeConditionDto) condition: any,
    ) {
        const data = await this.layGuiXeService.get(condition);
        return ResponseDto.create(data);
    }

    @Get(":id")
    async getById(
        @Param("id") id: string,
    ) {
        const data = await this.layGuiXeService.getOne({ _id: id });
        return ResponseDto.create(data);
    }

    @Post()
    async create(
        @Body() body: CreateLayGuiXeDto
    ) {
        const data = await this.layGuiXeService.create(body);
        return data;
    }

    @Put(":id")
    async updateById(
        @Param("id") id: string,
        @Body() body: CreateLayGuiXeDto
    ) {
        const data = await this.layGuiXeService.updateById(id, body);
        return data;
    }

    @Delete(":id")
    async deleteById(
        @Param("id") id: string,
    ) {
        const data = await this.layGuiXeService.deleteById(id);
        return data;
    }

}
