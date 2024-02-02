import { Controller, Get, UseGuards,Request} from "@nestjs/common";
import { AuthGuard } from "src/auth/authGuard";
import { LogApprovalServices } from "src/services/logapproval.service";
import { LogMissionServices } from "src/services/logmission.service"


@Controller('logapproval')
export class LogApprovalController {
    constructor(readonly logApprovalServices: LogApprovalServices) { }

    @UseGuards(AuthGuard)
    @Get()
    async findAll(@Request() req){
        return (await this.logApprovalServices.findAllOfficeByStaff(req)).map((e)=>e.convertLogApproval());
    }

} 