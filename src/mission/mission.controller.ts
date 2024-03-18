import { Body, Controller, Get, HttpException, HttpStatus, Param, Post, Put, Request, UseGuards } from "@nestjs/common";
import { AuthGuard } from "src/auth/authGuard";
import { MissionServices } from "src/services/mission.service";
import { StaffServices } from "src/services/staff.service";

@Controller('mission')
export class MissionController {
    constructor(readonly missionServices: MissionServices, readonly staffServices: StaffServices) { }

    @UseGuards(AuthGuard)
    @Post()
    async registerMission(@Body() data: any, @Request() req,) {
        return this.missionServices.checkMission(req, data)
    }


    @UseGuards(AuthGuard)
    @Get()
    async getAllDataMission(@Request() req) {
        let datetime = new Date()
        // let date = datetime.toLocaleDateString();
        let month = datetime.getMonth() + 1 < 10 ? '0' + (datetime.getMonth() + 1) : datetime.getMonth() + 1;
        let date = datetime.getDate() < 10 ? '0' + datetime.getDate() : datetime.getDate();
        let year = datetime.getFullYear();
        let today = year + '/' + month + '/' + date

        let id = req.user.sub;
        let staff = await this.staffServices.findOneByIdUser(id)
        if (staff == null) {
            throw new HttpException("Tài khoản chưa được xác thực nhân viên", HttpStatus.BAD_REQUEST)
        }
        let staffName = staff.userName
        let mission = await this.missionServices.findAllMissonNowByUser(staffName, today)
        
        return mission.map((e) => e.convertMissionDTO())
    }

    @UseGuards(AuthGuard)
    @Get('findAll')
    async getAllMission(@Request() req) {
        let id = req.user.sub;
        let staff = await this.staffServices.findOneByIdUser(id)
        if(staff == null){
            return [];
        }
        let mission = await this.missionServices.findOneByStaff(staff)
            
        return mission.map((e) =>  e.convertMissionDTO())
    }

    @UseGuards(AuthGuard)
    @Get(':id')
    async getDataMissionbyId(@Param('id') id: string) {
        let mission = await this.missionServices.findOne(id)
        return mission.convertMissionDTO();
    }


    @UseGuards(AuthGuard)
    @Put(':id')
    async editDataMission(@Param('id') id: string, @Body() data: any) {
        let mission = await this.missionServices.editMission(id, data)
        return mission
    }

    @UseGuards(AuthGuard)
    @Post('approval/:id')
    async approvalMission(@Param('id') id: string, @Body() data: any,@Request() req ) {
        let mission = await this.missionServices.updateSatusMission(id, data,req)
        return mission
    }


    @UseGuards(AuthGuard)
    @Put('cancel/:id')
    async cancelDataMission(@Param('id') id: string) {
        let mission = await this.missionServices.cancelMission(id)
        return mission
    }
}