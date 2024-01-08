import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { And, Repository } from "typeorm";
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
}