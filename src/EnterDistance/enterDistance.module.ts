import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { EnterDistance } from "src/models/enterDistance.entity";

import { EnterDistanceService } from "./enterDistance.service";
import { JwtModule } from "@nestjs/jwt/dist/jwt.module";
import { jwtConstants } from "src/auth/constant";
import { EnterDistanceController } from "./enterDistance.controller";
import { StaffModule } from "src/staff/staff.module";
import { TimeKeepingModule } from "src/timekeeping/timekeeping.module";
import { UserModule } from "src/users/users.module";



@Module({
    imports:[
        TypeOrmModule.forFeature([EnterDistance]),
        StaffModule,
        TimeKeepingModule,
        UserModule,
        JwtModule.register({
          secret: jwtConstants.secret,
          signOptions: { expiresIn: '1d' },
        })
    ],
    controllers: [EnterDistanceController],
    providers: [EnterDistanceService],
    exports: [EnterDistanceService],   
  })
export class EnterDistanceModule{}