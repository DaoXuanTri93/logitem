import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { EnterDistance } from "src/models/enterDistance.entity";


import { JwtModule } from "@nestjs/jwt/dist/jwt.module";
import { jwtConstants } from "src/auth/constant";
import { StampApproval } from "src/models/stampApproval.entity";
import { StampApprovalController } from "./stampApproval.controller";
import { StampApprovalService } from "./stampApproval.service";
import { StaffModule } from "src/staff/staff.module";
import { OfficeModule } from "src/office/office.module";
import { LogApprovalModule } from "src/logapproval/logapproval.module";
import { TimeKeepingModule } from "src/timekeeping/timekeeping.module";







@Module({
    imports:[
        TypeOrmModule.forFeature([StampApproval]),
        StaffModule,
        OfficeModule,
        LogApprovalModule,
        JwtModule.register({
          secret: jwtConstants.secret,
          signOptions: { expiresIn: '1d' },
        })
    ],
    controllers: [StampApprovalController],
    providers: [StampApprovalService],
    exports: [StampApprovalService],   
  })
export class StampApprovalModule{}
