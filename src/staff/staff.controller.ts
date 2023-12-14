import { Body, Controller, Get, Param, Post, Put, UseGuards,Request } from "@nestjs/common";
import { AuthGuard } from "src/auth/authGuard";
import { StaffServices } from "src/services/staff.services";

@Controller('staff')
export class StaffController {
        constructor(readonly staffServices: StaffServices) { }
        
        @Get()
        getAllUser(): void {
                this.staffServices.findAll()
        }
        @UseGuards(AuthGuard)
        @Post()
        createUser(@Body() res:any ,@Request() req){
                return this.staffServices.createUser(res,req)
        }
}