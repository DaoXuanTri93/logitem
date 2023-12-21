import { Body, Controller, Get, Param, Post, Put, UseGuards } from "@nestjs/common";
import { StaffUsersDTO } from "src/staff/staffuser.dto";
import { StaffServices } from "src/services/staff.service";
import { Staff } from "src/models/staff.entity";
import { UserServices } from "src/services/user.service";
import { Users } from "src/models/users.entity";
import { Office } from "src/models/office.entity";
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
        createStaff(@Body() res:StaffUsersDTO ){
            let staff = new Staff();
            let user = new Users();
            let office = new Office();

            user.username = res.userAccount
            user.MAC = res.MAC
            user.role = res.role
            user.password = '123456'
            this.userServices.createUser(user)

            staff.userAccount= user
            staff.userName = res.userName
            staff.email = res.email
            staff.telephone = res.telephone

            this.officeServices.findOfficeByBaseName(res.affiliatedOffice).then((e) => e.map((e) => e = office))
            
            staff.affiliatedOffice = office
                return this.staffServices.createStaff(staff)
        }

    @Get(':id')
        async getDetailStaffUserbyId(@Param('id') id : string){
            let a = await this.staffServices.findOne(id);
            return (a.map((e)=> e.converStaffToDTO()))
        }
  
}