import { Body, Controller, Delete, Get, Param, Post, Put } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { KhachVaoRaKtxService } from "./khach-vao-ra-ktx.service";
import { ApiCondition, ApiPageableQuery, QueryCondition, FetchPageableQuery } from "src/common/decorator/api.decorator";
import { ResponseDto } from "src/common/dto/response/response.dto";
import { FetchQueryOption } from "src/common/pipe/fetch-query-option.interface";
import { CreateKhachVaoRaKtxDto } from "./dto/create-khach-vao-ra-ktx.dto";
import { KhachVaoRaKtxConditionDto } from "./dto/khach-vao-ra-ktx-condition.dto";
import { Authorization } from "src/common/decorator/auth.decorator";
import { PageableDto } from "src/common/dto/pageable.dto";

@Controller("khach-vao-ra-ktx")
@ApiTags("Khach vao ra ktx")
@Authorization()
export class KhachVaoRaKtxController {
    constructor(private readonly khachVaoRaKtxService: KhachVaoRaKtxService) { }

    @Get("page")
    @ApiCondition()
    @ApiPageableQuery()
    async getPage(
        @QueryCondition(KhachVaoRaKtxConditionDto) condition: any,
        @FetchPageableQuery() option: FetchQueryOption
    ) {
        const { total, data } = this.khachVaoRaKtxService.getPagingComponent(condition, option);
        const result = await Promise.all([total, data.populate("idSinhVien")]);
        return ResponseDto.create(PageableDto.create(option, result[0], result[1]));
    }

    @Get("many")
    @ApiCondition()
    async getMany(
        @QueryCondition(KhachVaoRaKtxConditionDto) condition: any,
    ) {
        const data = await this.khachVaoRaKtxService.getMany(condition);
        return ResponseDto.create(data);
    }

    @Get(":id")
    async getById(
        @Param("id") id: string,
    ) {
        const data = await this.khachVaoRaKtxService.getOne({ _id: id });
        return ResponseDto.create(data);
    }

    @Get("thong-ke/from/:fromDate/to/:toDate")
    async getThongKeKhac(
        @Param("fromDate") fromDate: string,
        @Param("toDate") toDate: string,
    ) {
        const data = await this.khachVaoRaKtxService.thongKeKhachDenKtx(fromDate, toDate);
        return ResponseDto.create(data);
    }

    @Post()
    async create(
        @Body() body: CreateKhachVaoRaKtxDto
    ) {
        const data = await this.khachVaoRaKtxService.create(body);
        return data;
    }

    @Put(":id")
    async updateById(
        @Param("id") id: string,
        @Body() body: CreateKhachVaoRaKtxDto
    ) {
        const data = await this.khachVaoRaKtxService.updateById(id, body);
        return data;
    }

    @Delete(":id")
    async deleteById(
        @Param("id") id: string,
    ) {
        const data = await this.khachVaoRaKtxService.deleteById(id);
        return data;
    }
}

