import { Body, Controller, Get, Param, Post, Put, UseGuards, Request } from "@nestjs/common";
import { StaffUsersDTO } from "src/staff/staffuser.dto";
import { StaffServices } from "src/services/staff.service";
import { Staff } from "src/models/staff.entity";
import { UserServices } from "src/services/user.service";
import { Users } from "src/models/users.entity";
import { OfficeServices } from "src/services/office.service";
import { SearchUserDTO } from "src/users/users.dto";
import { Office } from "src/models/office.entity";
import { AuthGuard } from "src/auth/authGuard";
import { log } from "console";


@Controller('staff')
export class StaffController {

    constructor(readonly staffServices: StaffServices,
        readonly userServices: UserServices,
        readonly officeServices: OfficeServices) { }

    @UseGuards(AuthGuard)
    @Get()
    async getAllStaff(@Request() req): Promise<StaffUsersDTO[]> {
        return ((await this.staffServices.findAllByStaff(req)).map((e) => e.converStaffToDTO()));
    }

    @UseGuards(AuthGuard)
    @Post()
    async createStaff(@Body() res: any) {

        let staff = new Staff();
        let user = new Users();

        user.username = res.userAccount
        user.role = res.role
        user.password = '123456'
        user = await this.userServices.createUser(user)

        staff.userAccount = user

        staff.userName = res.userName
        staff.email = res.email
        staff.telephone = res.telephone

        let checkOffice = await this.officeServices.findOfficeByBaseName(res.affiliatedOffice)
        staff.affiliatedOffice = checkOffice

        return this.staffServices.createStaff(staff)
    }


    @UseGuards(AuthGuard)
    @Get(':id')
    async getDetailStaffUserbyId(@Param('id') id: string) {
        console.log((await this.staffServices.findOne(id)).converStaffToDTO());

        return (await this.staffServices.findOne(id)).converStaffToDTO()
    }

    @UseGuards(AuthGuard)
    @Put(':id')
    async updateStaffUser(@Param('id') id: string, @Body() res: StaffUsersDTO) {
        let staff = new Staff();
        let user = new SearchUserDTO();
        let office = new Office();

        staff = await this.staffServices.findOneById(id)

        user.username = res.userAccount
        user.role = res.role

        await this.userServices.updateUserbyStaffUser(staff.userAccount.id, user)

        office = await this.officeServices.findOfficeByBaseName(res.affiliatedOffice);

        return this.staffServices.updateStaffUserById(id, {
            userName: res.userName,
            email: res.email,
            telephone: res.telephone,
            affiliatedOffice: office
        });

    }

    @UseGuards(AuthGuard)
    @Get("driver/:id")
    async getAllDriver(@Request() req, @Param('id') id: string,) {
        return await this.staffServices.findAllByDriver(req, id);
    }

    @UseGuards(AuthGuard)
    @Get("permission/:id")
    async getStaff(@Request() req, @Param('id') id: string,) {
        return await this.staffServices.findPermissionByStaffId(id) != null ? (await this.staffServices.findPermissionByStaffId(id)).converDriverToDTO() : null;
    }

    @UseGuards(AuthGuard)
    @Put('driver/:id')
    async settingPermission(@Param('id') id: string, @Body() req: any) {
        this.staffServices.settingPermission(req, id)
    }

}