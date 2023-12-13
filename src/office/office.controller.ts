import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
import { OfficeService } from 'src/services/office.service';

@Controller('office')
export class OfficeController {
    constructor(readonly officeServices: OfficeService) { }
    @Get()
    getAllUser() {
           return this.officeServices.findAll()
    }
}
