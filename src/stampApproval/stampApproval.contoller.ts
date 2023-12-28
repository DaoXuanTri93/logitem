import { Controller, Get, Param, Post, Put, UseGuards,Request, Body } from "@nestjs/common";
import { StampApprovalService } from "./stampApproval.service";
import { AuthGuard } from "src/auth/authGuard";
import { OfficeService } from "src/services/office.service";




@Controller('stampApprovalController')
export class StampApprovalController {
    constructor(
        private readonly stampApprovalService : StampApprovalService,
    ){};

    @Get('findAll')
    async findAll(){
        return (await this.stampApprovalService.findAll()).map((e) => e.convertStampApproval());
    }

    @Put('update')
    async updateTeam(@Param() id : string){
        return this.stampApprovalService.updateTeam(id);
    }

    @UseGuards(AuthGuard)
    @Post()
    async registerMission(@Body() data:any,@Request() req) {
       return await this.stampApprovalService.register(req,data)
    }


    @UseGuards(AuthGuard)
    @Get()
    async findAllByStaffOffice(@Request() req){
        return (await this.stampApprovalService.findAllByStaff(req)).map((e) => e.convertStampApproval());
    }


    @UseGuards(AuthGuard)
    @Post(':id')
    async approveDataStampApproval(@Param('id') id:string,@Body() data) {
        let stampApproval = await this.stampApprovalService.approveData(id,data)
        return stampApproval
    }

    @UseGuards(AuthGuard)
    @Get(':id')
    async getDataStampApproval(@Param('id') id:string) {
        let stampApproval = await this.stampApprovalService.getData(id)
        return stampApproval
    }
    // @UseGuards(AuthGuard)
    // @Get("office")
    // async findAllOfficeByStaff(@Request() req){
    //     return await this.stampApprovalService.findAllOfficeByStaff(req)
    // }
}