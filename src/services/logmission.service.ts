import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { And, Repository } from "typeorm";
import { TimeKeeping } from "src/models/timekeeping.entity";
import { StaffServices } from "./staff.services";
import { MissionRegistation } from "src/models/mission-registation.entity";
import { Status } from "src/enum/status.enum";
import { LogMission } from "src/models/logmission.entity";

@Injectable()
export class LogMissionServices {
    
    constructor(
        @InjectRepository(LogMission)
        private logMissionRepository: Repository<LogMission>,
    ) {}

    findAll() {
        return this.logMissionRepository.find();
    }

    findOne(id: string) {
        return this.logMissionRepository.findOneBy({ id });
    }
    async remove(id: string) {
        await this.logMissionRepository.delete(id);
    }

    findOneByMissioinId(missionId: any) {
        return this.logMissionRepository.findOneBy({missionId});
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