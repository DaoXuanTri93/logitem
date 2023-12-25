import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { And, Repository } from "typeorm";
import { TimeKeeping } from "src/models/timekeeping.entity";
import { StaffServices } from "./staff.services";
import { MissionRegistation } from "src/models/mission-registation.entity";
import { Status } from "src/enum/status.enum";
import { LogMissionServices } from "./logmission.service";

@Injectable()
export class MissionServices {
    
    constructor(
        @InjectRepository(MissionRegistation)
        private missionRepository: Repository<MissionRegistation>,
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
            .where({ userName: userName })
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

    async checkMission(req: any, data: any) {
        let id = req.user.sub;
        let staff = await this.staffServices.findOneByIdUser(id)
        let missionRegistation = new MissionRegistation();
        if(data.startDay > data.endDay){
            return new HttpException("Thời gian bắt đầu sau thời gian kết thúc ", HttpStatus.BAD_REQUEST)
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
        return new HttpException("Thời gian bắt đầu sau thời gian kết thúc ", HttpStatus.BAD_REQUEST)
       }

       missionRegistation.statusMission == Status.APPROVED ? missionRegistation.statusMission = Status.PENDING: null

       missionRegistation.startDay = data.startDay
       missionRegistation.endDay = data.endDay
       return await this.missionRepository.save(missionRegistation)
    }

    async cancelMission(id: string) {
        let missionRegistation = await this.findOne(id)
        if(missionRegistation == null){
            return new HttpException("Lịch công tác không tồn tại ", HttpStatus.BAD_REQUEST)
        }
        if(missionRegistation.statusMission == Status.WAITINGCONFIRM){
            return await this.remove(id);
        }
        if(missionRegistation.statusMission == Status.CANCELLING || missionRegistation.statusMission == Status.PENDING){
            if(missionRegistation.statusMission == Status.PENDING){
                let logmission = await this.logMissionServices.findOneByMissioinId(id)
                missionRegistation.startDay = logmission.startDay
                missionRegistation.endDay = logmission.endDay
            }
           
            missionRegistation.statusMission = Status.APPROVED
          
            return await this.missionRepository.save(missionRegistation)
        }
        missionRegistation.statusMission = Status.CANCELLING
        return await this.missionRepository.save(missionRegistation)
     }
 



    //  async updateUserbyid(id:string,res:UserDTO) {
    //         const user = await this.timeKeepingRepository.update(id,res);
    //         return user
    //   }

    //   async updateUser(res:Users) {
    //         const user = await this.timeKeepingRepository.save(res);
    //         return user
    //   }
}