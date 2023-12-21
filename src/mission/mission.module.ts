import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { TimeKeeping } from "src/models/timekeeping.entity";
import { TimekeepingServices } from "src/services/timekeeping.service";
import { StaffModule } from "src/staff/staff.module";
import { AuthModule } from "src/auth/auth.module";
import { JwtModule } from "@nestjs/jwt";
import { jwtConstants } from "src/auth/constant";
import { UserModule } from "src/users/users.module";
import { OfficeModule } from "src/office/office.module";
import { MissionRegistation } from "src/models/mission-registation.entity";
import { MissionServices } from "src/services/mission.service";
import { MissionController } from "./mission.controller";
import { LogMissionModule } from "src/logmission/mission.module";


@Module({
    imports:[
        TypeOrmModule.forFeature([MissionRegistation]),
        StaffModule,
        LogMissionModule,
        JwtModule.register({
          secret: jwtConstants.secret,
          signOptions: { expiresIn: '1d' },
        })
    ],
    controllers: [MissionController],
    providers: [MissionServices],
    exports: [MissionServices],
  })
export class MissionModule{}