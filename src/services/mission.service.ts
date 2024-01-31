import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { And, Repository } from "typeorm";
import { MissionRegistation } from "src/models/mission-registation.entity";
import { Status } from "src/enum/status.enum";
import { LogMissionServices } from "./logmission.service";
import { StaffServices } from "./staff.service";
import { TimekeepingServices } from "./timekeeping.service";
import { Role } from "src/enum/role.enum";
import { Permission } from "src/models/permission.entity";

@Injectable()
export class MissionServices {

    constructor(
        @InjectRepository(MissionRegistation)
        private missionRepository: Repository<MissionRegistation>,
        @InjectRepository(Permission)
        private permissionRepository: Repository<Permission>,
        readonly staffServices: StaffServices,
        readonly logMissionServices: LogMissionServices
    ) { }

    findAll() {
        return this.missionRepository.find();
    }

    findOne(id: string) {
        return this.missionRepository.findOneBy({ id });
    }
    async remove(id: string) {
        await this.missionRepository.delete(id);
    }

    findAllMissonNowByUser(userName, date) {
        return this.missionRepository.createQueryBuilder("missionRegistation")
            .where({ userName: userName})
            .andWhere("missionRegistation.endDay >=:date", { date: date })
            .getMany()
    }

    findAllMissonByUser(userName, date) {
        return this.missionRepository.createQueryBuilder("missionRegistation")
            .where({ userName: userName })
            .andWhere("missionRegistation.endDay >=:date and missionRegistation.startDay <= :date", {date: date })
            .andWhere("missionRegistation.statusMission = 'APPROVED'")
            .getMany()
    }

    async findOneByStaff(staff: any) {
        if (staff.userAccount.role == Role.Admin) {
            return await this.missionRepository.find();
        }
        return await this.missionRepository.findBy({staff:{affiliatedOffice:{officeId:staff.affiliatedOffice.officeId}}});
    }

    async checkMission(req: any, data: any) {
        let id = req.user.sub;
        let staff = await this.staffServices.findOneByIdUser(id)
        let missionRegistation = new MissionRegistation();
        if(data.startDay > data.endDay){
            return new HttpException("Start time after end time ", HttpStatus.BAD_REQUEST)
           }
        missionRegistation.staff = staff
        missionRegistation.startDay = data.startDay
        missionRegistation.endDay = data.endDay
        missionRegistation.userName = staff.userName

        let missionRegister = await this.missionRepository.create(missionRegistation)
        return await this.missionRepository.save(missionRegister)
    }

    async editMission(id: string, data: any) {
       let missionRegistation = await this.findOne(id)
       if(data.startDay > data.endDay){                         
        return new HttpException("Start time after end time", HttpStatus.BAD_REQUEST)
       }

       missionRegistation.statusMission == Status.APPROVED ? missionRegistation.statusMission = Status.PENDING: null

       missionRegistation.startDay = data.startDay
       missionRegistation.endDay = data.endDay
       return await this.missionRepository.save(missionRegistation)
    }

    async cancelMission(id: string) {
        let missionRegistation = await this.findOne(id)
        if(missionRegistation == null){
            return new HttpException("Work schedule does not exist ", HttpStatus.BAD_REQUEST)
        }
        // if(missionRegistation.statusMission == Status.WAITINGCONFIRM){
            return await this.remove(id);
        // }
        // if(missionRegistation.statusMission == Status.CANCELLING || missionRegistation.statusMission == Status.PENDING){
        //     if(missionRegistation.statusMission == Status.PENDING){
        //         let logmission = await this.logMissionServices.findOneByMissioinId(id)
        //         missionRegistation.startDay = logmission.startDay
        //         missionRegistation.endDay = logmission.endDay
        //     }
           
        //     missionRegistation.statusMission = Status.APPROVED
          
        //     return await this.missionRepository.save(missionRegistation)
        // }
        // missionRegistation.statusMission = Status.CANCELLING
        // return await this.missionRepository.save(missionRegistation)
     }
     async updateSatusMission(id: string, data: any) {
        let missionRegistation = await this.findOne(id)
           let permission =await this.staffServices.findPermissionByStaffId(id)
           let check =false;
           if(permission!=null){
            permission.approveUsers.map((e)=>{if(e==missionRegistation.staff.staffId)check=true})
           }
        if(missionRegistation == null){
            return new HttpException("Work schedule does not exist", HttpStatus.BAD_REQUEST)
        }
        if(check == false){
            return new HttpException("Account doesn't approve", HttpStatus.BAD_REQUEST)
        }
        missionRegistation.statusMission = data.status
        return await this.missionRepository.save(missionRegistation)
    }
    

}