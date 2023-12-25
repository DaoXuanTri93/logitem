import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Office } from "src/models/office.entity";
import { OfficeUserDTO } from "src/office/office.dto";



@Injectable()
export class OfficeServices {
    constructor(
        @InjectRepository(Office)
        private officeRepository: Repository<Office>,
    ) { }

     async findAll() {
        return await this.officeRepository.find();
    }

    async findOfficeByBaseName(baseName : string) {
        return await this.officeRepository.findOneBy({baseName});
    }

    async updateOfficeByStaffUser(id: string,res:OfficeUserDTO){
        return await this.officeRepository.update(id,res)
    }
}