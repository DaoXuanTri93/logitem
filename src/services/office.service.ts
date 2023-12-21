import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Staff } from "src/models/staff.entity";
import { Office } from "src/models/office.entity";



@Injectable()
export class OfficeServices {
    constructor(
        @InjectRepository(Office)
        private officeRepository: Repository<Office>,
    ) { }

     async findAll() {
        return await this.officeRepository.find();
    }

    async findOfficeByBaseName(name : string) {
        return await this.officeRepository.find({
            where : {
                 baseName : name
            }
        });
    }


}