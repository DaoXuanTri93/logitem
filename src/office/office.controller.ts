import { Body, Controller, Get, HttpException, HttpStatus, Param, Post, Put ,Request, UseGuards} from '@nestjs/common';
import { AuthGuard } from 'src/auth/authGuard';
import { OfficeService } from 'src/services/office.service';
import { StaffServices } from 'src/services/staff.services';
import { OfficeDTO } from './office.dto';

@Controller('office')
export class OfficeController {
    constructor(readonly officeServices: OfficeService,readonly staffServices: StaffServices) { }
    @Get()
    async getAllOffice() {
        var data = await this.officeServices.findAll()
        if (data.length > 0) {
            var response = data.map((item)=> item.convertOfficeDTO());
         } else {
            return data;
        }
        return response;
    }
    @Post()
    createOffice(@Body() res: any) {
        return this.officeServices.createOffice(res)
    }

    @UseGuards(AuthGuard)
    @Put(':id')
    updateOffice(@Param('id') id: string, @Body() res: OfficeDTO) {
        console.log(res);
        return this.officeServices.updateOfficebyid(id, res)
    }

    @UseGuards(AuthGuard)
    @Get("info")
    async getOfficeByUser(@Request() req) {
        let id = req.user.id;
        let staff = await this.staffServices.findOneByIdUser(id)
        if(staff == null){
            throw new HttpException("Tài khoản chưa được xác thực nhân viên",HttpStatus.BAD_REQUEST)
        }
        let office = await this.officeServices.findOneByIdStaff(staff.staffId)
        if(office == null){
            throw new HttpException("Tài khoản chưa thuộc bất kì văn phong nào",HttpStatus.BAD_REQUEST)
        }
        return office.convertOfficeToDTO()
    }
}
