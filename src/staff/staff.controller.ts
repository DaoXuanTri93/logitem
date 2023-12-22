import { Body, Controller, Get, Param, Post, Put, UseGuards } from "@nestjs/common";
import { StaffUsersDTO } from "src/staff/staffuser.dto";
import { StaffServices } from "src/services/staff.service";
import { Staff } from "src/models/staff.entity";
import { UserServices } from "src/services/user.service";
import { Users } from "src/models/users.entity";
import { OfficeServices } from "src/services/office.service";

@Controller('staff')
export class StaffController {

    constructor(readonly staffServices : StaffServices ,
        readonly userServices : UserServices , 
        readonly officeServices : OfficeServices) { }
    
       
    @Get()
        async getAllStaff(): Promise<StaffUsersDTO[]>{  

           let a = await this.staffServices.findAll();

             return (a.map((e)=> e.converStaffToDTO()));
        }
        
    @Post()
       async  createStaff(@Body() res:any ){

            console.log(res);
            
            let staff = new Staff();
            let user = new Users();

            user.username = res.userAccount
            user.MAC = res.MAC
            user.role = res.role
            user.password = '123456'
            await this.userServices.createUser(user)
        
           let checkUser = await this.userServices.findOneByUserName(user.username)    
           console.log(checkUser);
           staff.userAccount = checkUser

            staff.userName = res.userName
            staff.email = res.email
            staff.telephone = res.telephone

            let checkOffice = await this.officeServices.findOfficeByBaseName(res.affiliatedOffice)
            staff.affiliatedOffice = checkOffice    
        
            return this.staffServices.createStaff(staff)
        }

    @Get(':id')
        async getDetailStaffUserbyId(@Param('id') id : string){

            let a = await this.staffServices.findOne(id);

            return (a.map((e)=> e.converStaffToDTO()))
        }
  
}