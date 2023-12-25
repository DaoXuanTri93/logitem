import { Body, Controller, Get, Param, Post, Put, UseGuards } from "@nestjs/common";
import { StaffUsersDTO } from "src/staff/staffuser.dto";
import { StaffServices } from "src/services/staff.service";
import { Staff } from "src/models/staff.entity";
import { UserServices } from "src/services/user.service";
import { Users } from "src/models/users.entity";
import { OfficeServices } from "src/services/office.service";
import { SearchUserDTO } from "src/users/users.dto";
import { Office } from "src/models/office.entity";


@Controller('staff')
export class StaffController {

    constructor(readonly staffServices : StaffServices ,
        readonly userServices : UserServices , 
        readonly officeServices : OfficeServices) { }
    
       
    @Get()
        async getAllStaff(): Promise<StaffUsersDTO[]>{

             return ((await this.staffServices.findAll()).map((e)=> e.converStaffToDTO()));
        }
        
    @Post()
       async createStaff(@Body() res:any ){
            
            let staff = new Staff();
            let user = new Users();

            user.username = res.userAccount
            user.MAC = res.MAC
            user.role = res.role
            user.password = '123456'
            await this.userServices.createUser(user)
        
           let checkUser = await this.userServices.findOneByUserName(user.username)    
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

            return ((await this.staffServices.findOne(id)).map((e)=> e.converStaffToDTO()))
        }

    @Put(':id')
        async updateStaffUser(@Param('id') id : string , @Body()res : StaffUsersDTO){
            let staff = new Staff();
            let user = new SearchUserDTO();
            let office = new Office();
            
            staff = await this.staffServices.findOneById(id)

            user.username = res.userAccount 
            user.role = res.role

            await this.userServices.updateUserbyStaffUser(staff.userAccount.id,user)

            office = await this.officeServices.findOfficeByBaseName(res.affiliatedOffice);
            
            return this.staffServices.updateStaffUserById(id,{
                userName : res.userName,
                email : res.email,
                telephone : res.telephone,
                affiliatedOffice : office
            });

        }
  
}