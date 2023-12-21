import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { JwtModule } from "@nestjs/jwt";
import { jwtConstants } from "src/auth/constant";
import { LogMissionController } from "./mission.controller";
import { LogMission } from "src/models/logmission.entity";
import { LogMissionServices } from "src/services/logmission.service";


@Module({
    imports:[
        TypeOrmModule.forFeature([LogMission]),
        JwtModule.register({
          secret: jwtConstants.secret,
          signOptions: { expiresIn: '1d' },
        })
    ],
    controllers: [LogMissionController],
    providers: [LogMissionServices],
    exports: [LogMissionServices],
  })
export class LogMissionModule{}