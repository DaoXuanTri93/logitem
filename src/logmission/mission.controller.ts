import { Body, Controller, Get,HttpException,HttpStatus,Param,Post,Put,Request, UseGuards } from "@nestjs/common";
import { log } from "console";
import { AuthGuard } from "src/auth/authGuard";
import { LogMissionServices } from "src/services/logmission.service";
import { MissionServices } from "src/services/mission.service";
import { OfficeService } from "src/services/office.service";
import { StaffServices } from "src/services/staff.services";
import { TimekeepingServices } from "src/services/timekeeping.service";

@Controller('mission')
export class LogMissionController {
    constructor(readonly missionServices: LogMissionServices) { }


}