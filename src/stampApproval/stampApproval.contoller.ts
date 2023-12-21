import { Controller, Get, Param, Put } from "@nestjs/common";
import { StampApprovalService } from "./stampApproval.service";




@Controller('stampApprovalContrller')
export class StampApprovalController {
    constructor(
        private readonly stampApprovalService : StampApprovalService
    ){};

    @Get('findAll')
    async findAll(){
        return (await this.stampApprovalService.findAll()).map((e) => e.convertStampApproval());
    }

    @Put('update')
    async updateTeam(@Param() id : string){
        return this.stampApprovalService.updateTeam(id);
    }

}