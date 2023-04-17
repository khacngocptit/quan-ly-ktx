import { Controller, Get, Param } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { ApiCondition, ApiPageableQuery, FetchPageableQuery, QueryCondition } from "src/common/decorator/api.decorator";
import { Authorization } from "src/common/decorator/auth.decorator";
import { FetchQueryOption } from "src/common/pipe/fetch-query-option.interface";
import { InvestorService } from "./investor.service";
import { InvestorCondDto } from "./dto/condition/investor-condition.dto";
import { ResponseDto } from "src/common/dto/response/response.dto";

@Controller("investor")
@ApiTags("Investor")
@Authorization()
export class InvestorController {
    constructor(private readonly investorService: InvestorService) {}

    @Get("test")
    async test() {
        await this.investorService._cron();
    }

    @Get("pageable")
    @ApiPageableQuery()
    @ApiCondition()
    async getPageable(@FetchPageableQuery() option: FetchQueryOption, @QueryCondition(InvestorCondDto) condition: any) {
        const data = await this.investorService.getPageable(option, condition);
        return ResponseDto.create(data);
    }

    @Get(":_id")
    async getById(@Param("_id") _id: string) {
        const data = await this.investorService.getById(_id);
        return ResponseDto.create(data);
    }

    @Get(":_id/subscribe")
    async subById(@Param("_id") _id: string) {
        const data = await this.investorService.setFavorite(_id, true);
        return ResponseDto.create(data);
    }

    @Get(":_id/unsubscribe")
    async unsubById(@Param("_id") _id: string) {
        const data = await this.investorService.setFavorite(_id, false);
        return ResponseDto.create(data);
    }

    @Get("info/:orgCode")
    async getInfoByOrgCode(@Param("orgCode") orgCode: string) {
        const data = await this.investorService.getInfoByOrgCode(orgCode);
        return ResponseDto.create(data);
    }
}
