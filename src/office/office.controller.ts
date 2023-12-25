import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
import { OfficeService } from 'src/services/office.service';
import { OfficeDTO } from './office.dto';

@Controller('office')
export class OfficeController {
    constructor(readonly officeServices: OfficeService) { }
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
    @Put(':id')
    updateOffice(@Param('id') id: string, @Body() res: OfficeDTO) {
        console.log(res);
        return this.officeServices.updateOfficebyid(id, res)
    }
}
