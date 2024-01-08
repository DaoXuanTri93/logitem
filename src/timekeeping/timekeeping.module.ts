import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { TimeKeeping } from "src/models/timekeeping.entity";
import { TimekeepingController } from "./timekeeping.controller";
import { TimekeepingServices } from "src/services/timekeeping.service";
import { StaffModule } from "src/staff/staff.module";
import { JwtModule } from "@nestjs/jwt";
import { jwtConstants } from "src/auth/constant";
import { MissionModule } from "src/mission/mission.module";
import { OfficeModule } from "src/office/office.module";
import { Area } from "src/models/area.entity";


@Module({
    imports:[
        TypeOrmModule.forFeature([TimeKeeping,Area]),
        StaffModule,
        OfficeModule,
        MissionModule,
        JwtModule.register({
          secret: jwtConstants.secret,
          signOptions: { expiresIn: '1d' },
        })
    ],
    controllers: [TimekeepingController],
    providers: [TimekeepingServices],
    exports: [TimekeepingServices],
  })
export class TimeKeepingModule{}


