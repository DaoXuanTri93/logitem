import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { EnterDistance } from "src/models/enterDistance.entity";

import { EnterDistanceService } from "./enterDistance.service";
import { JwtModule } from "@nestjs/jwt/dist/jwt.module";
import { jwtConstants } from "src/auth/constant";
import { EnterDistanceController } from "./enterDistance.controller";



@Module({
    imports:[
        TypeOrmModule.forFeature([EnterDistance]),
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