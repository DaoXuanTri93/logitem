import { Body, Controller, Get, Param, Post, Put, UseGuards } from "@nestjs/common";
import { StaffUsersDTO } from "src/staff/staffuser.dto";
import { StaffServices } from "src/services/staff.service";
import { Staff } from "src/models/staff.entity";

@Controller('staff')
export class StaffController {

    constructor(readonly staffServices : StaffServices) { }   
       
    @Get()
        async getAllStaff(): Promise<StaffUsersDTO[]>{           
           let a = await this.staffServices.findAll();
             return (a.map((e)=> e.converStaffToDTO()));
        }
        
    @Post()
        createStaff(@Body() res:StaffUsersDTO ){
            let staff = new Staff();
            staff.staffId = res.id
            this.staffServices.findOneByIdUser(res.userAccount).then((e) => e.userAccount = staff.userAccount )
            staff.userName = res.userName
            staff.email = res.email
            staff.telephone = res.telephone
            this.staffServices.findOneByIdAffiliatedOffice(res.affiliatedOffice).then((e)=> e.affiliatedOffice = staff.affiliatedOffice)
                return this.staffServices.createStaff(staff)
        }

    @Get(':id')
        async getDetailStaffUserbyId(@Param('id') id : string){
            let a = await this.staffServices.findOne(id);
            return (a.map((e)=> e.converStaffToDTO()))
        }
  
}