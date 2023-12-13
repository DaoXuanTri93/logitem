import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Office } from 'src/models/office.entity';
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

    findOneByIdUser(officeId: string) {
        return this.officeRepository.findOneBy({officeId});
    }

    async remove(officeId: string) {
        await this.officeRepository.delete(officeId);
    }

     createUser(res:any) {
        const office = this.officeRepository.create(res);
        return this.officeRepository.save(office)
      }
}
