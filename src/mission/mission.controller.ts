import { Body, Controller, Get,HttpException,HttpStatus,Param,Post,Put,Request, UseGuards } from "@nestjs/common";
import { log } from "console";
import { AuthGuard } from "src/auth/authGuard";
import { MissionServices } from "src/services/mission.service";
import { OfficeService } from "src/services/office.service";
import { StaffServices } from "src/services/staff.services";
import { TimekeepingServices } from "src/services/timekeeping.service";

@Controller('mission')
export class MissionController {
    constructor(readonly missionServices: MissionServices,readonly staffServices: StaffServices) { }

    @UseGuards(AuthGuard)
    @Post()
    async registerMission(@Body() data:any,@Request() req,) {
       return this.missionServices.checkMission(req,data)
    }


    @UseGuards(AuthGuard)
    @Get()
    async getAllDataMission(@Request() req) {
        let datetime = new Date(Date.now())
        let date = datetime.toLocaleDateString();
        let id = req.user.id;
        let staff = await this.staffServices.findOneByIdUser(id)
        if(staff == null){
            throw new HttpException("Tài khoản chưa được xác thực nhân viên",HttpStatus.BAD_REQUEST)
        }
        let staffName = staff.userName
        let mission = await this.missionServices.findAllMissonNowByUser(staffName,date)
        return mission
    }

    @UseGuards(AuthGuard)
    @Put(':id')
    async editDataMission(@Param('id') id:string,@Request() req,@Body() data:any) {
        let mission = await this.missionServices.editMission(id,data)
        return mission
    }

    @UseGuards(AuthGuard)
    @Put('cancel/:id')
    async cancelDataMission(@Param('id') id:string,@Request() req,) {
        let mission = await this.missionServices.cancelMission(id)
        return mission
    }
}