import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Staff } from "src/models/staff.entity";
import { UserServices } from "./userservices";
import { OfficeService } from "./office.service";

@Injectable()
export class StaffServices {
    constructor(
        @InjectRepository(Staff)
        private staffRepository: Repository<Staff>, readonly userServices: UserServices, readonly officeServices: OfficeService
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

     async createUser(res:any,req:any) {

        let staff = new Staff()
        let id = req.user.id
        let user = await this.userServices.findOne(id)
        let office = await this.officeServices.findOne(res.affiliatedOffice)
        
        staff.userAccount = user
        staff.userName = res.userName
        staff.email = res.email
        staff.telephone = res.telephone
        staff.dateOfBirth = res.dateOfBirth
        staff.drivingLicenseNumber = res.drivingLicenseNumber
        staff.area = res.area
        staff.businessTrip = res.businessTrip
        staff.macAddress = res.macAddress
        staff.affiliatedOffice = office
        staff = this.staffRepository.create(staff);
        return this.staffRepository.save(staff)
      }

    //  async updateUserbyid(id:string,res:UserDTO) {
    //         const user = await this.staffRepository.update(id,res);
    //         return user
    //   }

    //   async updateUser(res:Users) {
    //         const user = await this.staffRepository.save(res);
    //         return user
    //   }
}