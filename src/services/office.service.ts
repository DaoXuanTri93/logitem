import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Office } from 'src/models/office.entity';
import { OfficeDTO } from 'src/office/office.dto';
import { Repository } from 'typeorm';

@Injectable()
export class OfficeService {
    constructor(
        @InjectRepository(Office)
        private officeRepository: Repository<Office>,
    ) { }

    findAll() {
        return this.officeRepository.find();
    }

    findOne(officeId: string) {
        return this.officeRepository.findOneBy({ officeId });
    }

    findOneByIdOffice(officeId: string) {
        return this.officeRepository.findOneBy({ officeId });
    }
    

    async remove(officeId: string) {
        await this.officeRepository.delete(officeId);
    }

    createOffice(res: any) {
        const office = this.officeRepository.create(res);
        return this.officeRepository.save(office)
    }
    async updateOfficebyid(id:string,res:OfficeDTO) {
        const offices = await this.officeRepository.update(id,res);
        console.log(offices);
        return offices
  }
}
