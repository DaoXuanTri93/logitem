import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { UserDTO } from "src/users/users.dto";
import { Users } from "src/models/users.entity";
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

   async findOneByIdUser(id: any) {
        return await this.staffRepository.findOneBy({userAccount: {id:id}});
    }
    findOneByUserName(userName: string) {
        return this.staffRepository.findOneBy({ userName });
    }

    async remove(id: number) {
        await this.staffRepository.delete(id);
    }

     createUser(res:any) {
        const staff = this.staffRepository.create(res);
        return this.staffRepository.save(staff)
      }

}