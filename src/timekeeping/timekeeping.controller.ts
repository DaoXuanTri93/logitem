import { Body, Controller, Get,HttpException,HttpStatus,Param,Post,Put,Req,Request, UseGuards } from "@nestjs/common";
import { log } from "console";
import { AuthGuard } from "src/auth/authGuard";
import { OfficeService } from "src/services/office.service";
import { StaffServices } from "src/services/staff.services";
import { TimekeepingServices } from "src/services/timekeeping.service";
import { DriverDTO } from "src/staff/driver.dto";

@Controller('timekeeping')
export class TimekeepingController {
    constructor(readonly timeKeepingServices: TimekeepingServices,readonly staffServices: StaffServices,readonly officeService: OfficeService) { }

    @UseGuards(AuthGuard)
    @Get()
    async getdataTimeKeepingToDay(@Request() req) {
        let datetime =new Date(Date.now())
        let date = datetime.toLocaleDateString();
        let id = req.user.sub;
        let staff = await this.staffServices.findOneByIdUser(id)
        if(staff == null){
            throw new HttpException("Tài khoản chưa được xác thực nhân viên",HttpStatus.BAD_REQUEST)
        }
        let staffName = staff.userName
        let timekeep = await this.timeKeepingServices.findOneByUserName(staffName,date)
        
        // return timekeep
        return timekeep.convertTimeKeepingToDTO()
    }

    @UseGuards(AuthGuard)
    @Post("checkin")
    async checkIn(@Request() req,@Body() data) {
       return this.timeKeepingServices.checkIn(req,data)
    }


    @UseGuards(AuthGuard)
    @Post("checkout")
    async checkOut(@Request() req,@Body() data) {
       return this.timeKeepingServices.checkOut(req,data)
    }

    @UseGuards(AuthGuard)
    @Post("overtimestart")
    async checkInOverTimeStart(@Request() req,@Body() data) {
       return this.timeKeepingServices.checkInOverTime(req,data)
    }
    @UseGuards(AuthGuard)
    @Post("overtimeend")
    async checkInOverTimeEnd(@Request() req,@Body() data) {
       return this.timeKeepingServices.checkOutOverTime(req,data)
    }

    @UseGuards(AuthGuard)
    @Get("driver")
    async getAlldataTimeKeepingByDriver(@Request() req) {
        console.log(req);
        
        let timekeep = await this.timeKeepingServices.findAllByStaff(req)
        return timekeep.map((e)=>e.convertTimeKeepingDriverToDTO())
    }

    @UseGuards(AuthGuard)
    @Get("driver/:id")
    async getdataTimeKeepingByDriver(@Param('id') id:string) {
        let driver = await this.timeKeepingServices.findDriverById(id)
        return driver
    }

    @UseGuards(AuthGuard)
    @Put("driver/:id")
    async editdataTimeKeepingByDriver(@Param('id') id:string,@Body() data) {
        console.log(data);
        let driver = await this.timeKeepingServices.editDriver(id,data)
        return driver
    }
}