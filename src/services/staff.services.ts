import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Staff } from "src/models/staff.entity";


@Injectable()
export class StaffServices {
    constructor(
        @InjectRepository(Staff)
        private staffRepository: Repository<Staff>,
    ) { }

    findAll() {
        return this.staffRepository.find();
    }

    findOne(staffId: string) {
        return this.staffRepository.findOneBy({ staffId });
    }

    findOneByIdUser(userAccount: any) {
        return this.staffRepository.findOneBy({userAccount});
    }
    findOneByUserName(userName: string) {
        return this.staffRepository.findOneBy({ userName });
    }

    async remove(id: number) {
        await this.staffRepository.delete(id);
    }

     createStaff(res:any) {
        const staff = this.staffRepository.create(res);
        return this.staffRepository.save(staff)
      }

}