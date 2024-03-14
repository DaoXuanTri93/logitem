import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { And, Repository } from "typeorm";
import { LogApproval } from "src/models/timekeeping-registation.entity";
import { StaffServices } from "./staff.service";
import { Role } from "src/enum/role.enum";

@Injectable()
export class LogApprovalServices {
    
    constructor(
        @InjectRepository(LogApproval)
        private logApprovalRepository: Repository<LogApproval>,
        readonly staffServices: StaffServices,
    ) {}

    findAll() {
        return this.logApprovalRepository.find();
    }

    findOne(id: string) {
        return this.logApprovalRepository.findOneBy({ id });
    }
    async remove(id: string) {
        await this.logApprovalRepository.delete(id);
    }

    async save(logApproval:LogApproval) {
        await this.logApprovalRepository.save(logApproval);
    }

    async findAllByOfficeName(officeName: string) {
        return await this.logApprovalRepository.findBy({ officeName: officeName });
    }

    async findAllOfficeByStaff(req: any) {
        let id = req.user.sub;
        let staff = await this.staffServices.findOneByIdUser(id)
        if(!staff){
            return [];
        }
        if (staff.userAccount.role == Role.Admin) {
            return await (await this.findAll());
        }
        
        return await this.findAllByOfficeName(staff.affiliatedOffice.baseName);
    }
}