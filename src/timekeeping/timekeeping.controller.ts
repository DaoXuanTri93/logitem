import { Body, Controller, Get,HttpException,HttpStatus,Request, UseGuards } from "@nestjs/common";
import { AuthGuard } from "src/auth/authGuard";
import { StaffServices } from "src/services/staff.service";
import { TimekeepingServices } from "src/services/timekeeping.service";

@Controller('timekeeping')
export class TimekeepingController {
    constructor(readonly timeKeepingServices: TimekeepingServices,readonly staffServices: StaffServices) { }

    @UseGuards(AuthGuard)
    @Get()
    async getdataTimeKeepingToDay(@Request() req) {
        let date = new Date().toJSON().slice(0, 10);
        console.log(date);
        
        let id = req.user.id;
        let staff = await this.staffServices.findOneByIdUser(id);
        if(staff == null){
            throw new HttpException("Lỗi",HttpStatus.BAD_REQUEST)
        }
        let staffName = staff.userName
        let timekeep = await this.timeKeepingServices.findOneByUserName(staffName,date)
        return timekeep
    }

}