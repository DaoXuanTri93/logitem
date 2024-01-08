import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Staff } from "src/models/staff.entity";
import { Role } from "src/enum/role.enum";


@Injectable()
export class StaffServices {
    constructor(
        @InjectRepository(Staff)
        private staffRepository: Repository<Staff>,
    ) { }

     async findAll() {
        return await this.staffRepository.find();
    }

    async findAllByStaff(req: any) {
        
        let id = req.user.sub;
        let staff = await this.findOneByIdUser(id)
        if (staff.userAccount.role == Role.Admin) {
            return await this.staffRepository.find();
        }

        return await this.findAllByOfficeName(staff.affiliatedOffice.baseName)
    }

    async findAllByOfficeName(officeName: string) {
        return await this.staffRepository.findBy({ affiliatedOffice:{baseName:officeName} });
    }

    findOne(staffId: string) {
        return this.staffRepository.findOne({
            where :{
                staffId : staffId
            }
        });
    }

   async findOneByIdUser(id: any) {
        return await this.staffRepository.findOneBy({userAccount: {id:id}});
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

      async save(staff: Staff) {
        await this.staffRepository.save(staff);
    }


    async updateStaffUserById(id:string , res:any) {
        return await this.staffRepository.update(id,res);

    } 
}