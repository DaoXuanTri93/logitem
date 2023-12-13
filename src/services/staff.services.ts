import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { UserDTO } from "src/users/users.dto";
import { Users } from "src/models/users.entity";
import { Repository } from "typeorm";
import { Staff } from "src/models/staff.entity";
import { StaffUsersDTO } from "src/dto/staffuser.dto";

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

    //  async updateStaffbyid(id:string, res:StaffUsersDTO) {
    //         const user = await this.staffRepository.update(id,res);
    //         return user
    //   }

    //   async updateUser(res:Users) {
    //         const user = await this.staffRepository.save(res);
    //         return user
    //   }
}