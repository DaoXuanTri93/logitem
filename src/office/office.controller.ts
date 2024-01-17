
import { Body, Controller, Delete, Get, HttpException, HttpStatus, Param, Post, Put ,Request, UseGuards} from '@nestjs/common';
import { AuthGuard } from 'src/auth/authGuard';
import { OfficeServices } from 'src/services/office.service';
import { OfficeDTO } from './office.dto';
import { StaffServices } from 'src/services/staff.service';

@Controller('office')
export class OfficeController {
    constructor(readonly officeServices: OfficeServices,readonly staffServices: StaffServices) { }

    @UseGuards(AuthGuard)
    @Get()
    async getAllOffice() {
        // var data = await this.officeServices.findAll()
        // if (data.length > 0) {
        //     var response = data.map((item)=> item.convertOfficeDTO());
        //  } else {
        //     return data;
        // }
        return await this.officeServices.findAll();
    }

    @UseGuards(AuthGuard)
    @Post()
    createOffice(@Body() res: any) {
        let office =  this.officeServices.findOfficeByBaseName(res.baseName)
        if(office!= null){
            return this.officeServices.createOffice(res)
        }
        else
        {
        return new HttpException("Office name already exists",HttpStatus.BAD_REQUEST)
        }

        
    }

    @UseGuards(AuthGuard)
    @Put(':id')
    updateOffice(@Param('id') id: string, @Body() res: OfficeDTO) {
        let office =  this.officeServices.findOfficeByBaseName(res.baseName)
        if(office!= null){
            return this.officeServices.updateOfficebyid(id, res)
        }
        else
        {
        return new HttpException("Office name already exists",HttpStatus.BAD_REQUEST)
        }
      
    }

    @UseGuards(AuthGuard)
    @Get("info")
    async getOfficeByUser(@Request() req) {
        let id = req.user.sub;
        let staff = await this.staffServices.findOneByIdUser(id)
        
        if(staff == null){
            throw new HttpException("The account has not been verified by staff",HttpStatus.BAD_REQUEST)
        }
        let office = await this.officeServices.findOneByIdStaff(staff)
        if(office == null){
            throw new HttpException("The account does not belong to any style",HttpStatus.BAD_REQUEST)
        }
        return office.map((e)=>e.convertOfficeDTO())
    }
    
    @Get(':id')
    async getOfficeById(@Param('id') id: string) {
        return this.officeServices.findOne(id);
    }

    @Delete(":id")
    async remove(@Param("id") id: string) {
      return await this.officeServices.remove(id);
    }
}
