import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Staff } from "src/models/staff.entity";
import { StaffUsersDTO } from "src/staff/staffuser.dto";


@Injectable()
export class StaffServices {
    constructor(
        @InjectRepository(Staff)
        private staffRepository: Repository<Staff>,
    ) { }

     async findAll() {
        return await this.staffRepository.find();
    }

    findOne(staffId: string) {
        return this.staffRepository.find({
            where :{
                staffId : staffId
            }
        });
    }

    findOneByIdUser(userAccount: any) {
        return this.staffRepository.findOneBy({userAccount});
    }

    findOneById(staffId: any) {
        return this.staffRepository.findOneBy({staffId});
    }

    findOneByIdAffiliatedOffice(affiliatedOffice: any) {
        return this.staffRepository.findOneBy({affiliatedOffice});
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

    async updateStaffUserById(id:string , res:any) {
        return await this.staffRepository.update(id,res);

    } 
}