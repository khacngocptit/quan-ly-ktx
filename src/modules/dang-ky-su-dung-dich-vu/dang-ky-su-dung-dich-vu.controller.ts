import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { ApiCondition, ApiPageableQuery, QueryCondition, FetchPageableQuery } from "src/common/decorator/api.decorator";
import { ResponseDto } from "src/common/dto/response/response.dto";
import { FetchQueryOption } from "src/common/pipe/fetch-query-option.interface";
import { DangKySuDungDichVuService } from "./dang-ky-su-dung-dich-vu.service";
import { CreateDangKySuDungDichVuDto } from "./dto/create-dang-ky-su-dung-dich-vudto";
import { DangKySuDungDichVuConditionDto } from "./dto/dang-ky-su-dung-dich-vu-condition.dto";
import { PageableDto } from "src/common/dto/pageable.dto";
import { Authorization } from "src/common/decorator/auth.decorator";

@Controller("dang-ky-su-dung-dich-vu")
@ApiTags("Dang ky su dung dich vu")
@Authorization()
export class DangKySuDungDichVuController {
    constructor(private readonly dangKySuDungDichVuService: DangKySuDungDichVuService) { }

    @Get("page")
    @ApiCondition()
    @ApiPageableQuery()
    async getPage(
        @QueryCondition(DangKySuDungDichVuConditionDto) condition: any,
        @FetchPageableQuery() option: FetchQueryOption
    ) {
        const { total, data } = this.dangKySuDungDichVuService.getPagingComponent(condition, option);
        const result = await Promise.all([total, data.populate("idSinhVien").populate("idPhong").populate("idDichVu")]);
        return ResponseDto.create(PageableDto.create(option, result[0], result[1]));
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

    @Get("thong-ke/from/:fromDate/to/:toDate")
    async getThongKeKhac(
        @Param("fromDate") fromDate: string,
        @Param("toDate") toDate: string,
    ) {
        const data = await this.dangKySuDungDichVuService.thongKeSuDungDichVu(fromDate, toDate);
        return ResponseDto.create(data);
    }

    @Get("thong-ke/dich-vu/nam/:nam")
    async thongKeDichVu(
        @Param("nam", ParseIntPipe) nam: number
    ) {
        const data = await this.dangKySuDungDichVuService.thongKeDichVu(nam);
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

