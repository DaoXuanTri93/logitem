import { Controller} from "@nestjs/common";
import { LogMissionServices } from "src/services/logmission.service"


@Controller('logmission')
export class LogMissionController {
    constructor(readonly missionServices: LogMissionServices) { }
} 