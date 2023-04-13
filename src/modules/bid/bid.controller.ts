import { Controller, Get, Param } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { ApiCondition, ApiPageableQuery, FetchPageableQuery, QueryCondition } from "src/common/decorator/api.decorator";
import { Authorization } from "src/common/decorator/auth.decorator";
import { FetchQueryOption } from "src/common/pipe/fetch-query-option.interface";
import { BidService } from "./bid.service";
import { BidCondDto } from "./dto/condition/bid-condition.dto";
import { ResponseDto } from "src/common/dto/response/response.dto";

@Controller("bid")
@ApiTags("bid")
@Authorization()
export class BidController {
    constructor(private readonly bidService: BidService) {}

    @Get("test")
    async test() {
        await this.bidService.cron();
    }

    @Get("pageable")
    @ApiPageableQuery()
    @ApiCondition()
    async getPageable(@FetchPageableQuery() option: FetchQueryOption, @QueryCondition(BidCondDto) condition: any) {
        const data = await this.bidService.getPageable(option, condition);
        return ResponseDto.create(data);
    }

    @Get(":_id")
    async getById(@Param("_id") _id: string) {
        const data = await this.bidService.getById(_id);
        return ResponseDto.create(data);
    }

    @Get(":_id/subscribe")
    async subById(@Param("_id") _id: string) {
        const data = await this.bidService.setFavorite(_id, true);
        return ResponseDto.create(data);
    }

    @Get(":_id/unsubscribe")
    async unsubById(@Param("_id") _id: string) {
        const data = await this.bidService.setFavorite(_id, false);
        return ResponseDto.create(data);
    }
}
