
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Office } from 'src/models/office.entity';
import { OfficeDTO } from 'src/office/office.dto';
import { Repository } from 'typeorm';
import { StaffServices } from './staff.service';
import { Role } from 'src/enum/role.enum';

 
@Injectable()
export class OfficeServices {
    constructor(
        @InjectRepository(Office)
        private officeRepository: Repository<Office>,
    ) { }

    findAll() {
        return this.officeRepository.find({where : {deleted : false}});
    }

    findOne(officeId: string) {
        return this.officeRepository.findOneBy({ officeId });
    }


    async findOneByIdStaff(staff: any) {
        if (staff.userAccount.role == Role.Admin) {
            return await this.officeRepository.findBy({deleted:false});
        }

        return await this.officeRepository.findBy({staff:{staffId:staff.staffId},deleted:false});
    }
    findOneByIdOffice(officeId: string) {
        return this.officeRepository.findOneBy({ officeId });
    }
    

    async remove(officeId: string) {
        let office = await this.findOne(officeId);
            office.deleted = true
        return await this.officeRepository.save(office)
    }

    createOffice(res: any) {
        const office = this.officeRepository.create(res);
        return this.officeRepository.save(office)
    }
    async updateOfficebyid(id:string,res:OfficeDTO) {
        const offices = await this.officeRepository.update(id,res);
        return offices
  }

    async findOfficeByBaseName(baseName : string) {
        return await this.officeRepository.findOneBy({baseName,deleted:false});
    }

    async updateOfficeByStaffUser(id: string,res:OfficeDTO){
        return await this.officeRepository.update(id,res)
    }

}

