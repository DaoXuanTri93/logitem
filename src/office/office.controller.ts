import {Controller, Get } from "@nestjs/common";
import { OfficeServices } from "src/services/office.service";
import { CLIENT_RENEG_LIMIT } from "tls";
import { OfficeUserDTO } from "./office.dto";

@Controller('office')
export class OfficeController {

    constructor(readonly officeServices : OfficeServices) { }   
       
    @Get()
        async getAllOffice() : Promise<OfficeUserDTO[]>{   

            return (await this.officeServices.findAll()).map((e) => e.converOfficeToDTO());

        }
}