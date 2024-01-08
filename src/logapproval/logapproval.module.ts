import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { JwtModule } from "@nestjs/jwt";
import { jwtConstants } from "src/auth/constant";
import { LogMission } from "src/models/logmission.entity";
import { LogMissionServices } from "src/services/logmission.service";
import { LogApprovalController } from "./logapproval.controller";
import { LogApproval } from "src/models/timekeeping-registation.entity";
import { LogApprovalServices } from "src/services/logapproval.service";
import { StaffModule } from "src/staff/staff.module";


@Module({
    imports:[
        TypeOrmModule.forFeature([LogApproval]),
        StaffModule,
        JwtModule.register({
          secret: jwtConstants.secret,
          signOptions: { expiresIn: '1d' },
        })
    ],
    controllers: [LogApprovalController],
    providers: [LogApprovalServices],
    exports: [LogApprovalServices],
  })
export class LogApprovalModule{}