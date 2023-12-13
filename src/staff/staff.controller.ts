import { Body, Controller, Get, Param, Post, Put } from "@nestjs/common";
import { StaffUsersDTO } from "src/dto/staffuser.dto";
import { StaffServices } from "src/services/staff.services";

@Controller('staff')
export class StaffController {

    constructor(readonly staffServices : StaffServices) { }   
     
    @Get()
        getAllStaff(): void {
                this.staffServices.findAll()
        }
        
    @Post()
        createStaff(@Body() res:any ){
                return this.staffServices.createStaff(res)
        }
  
}