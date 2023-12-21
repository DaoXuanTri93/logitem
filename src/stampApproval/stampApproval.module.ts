import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { EnterDistance } from "src/models/enterDistance.entity";


import { JwtModule } from "@nestjs/jwt/dist/jwt.module";
import { jwtConstants } from "src/auth/constant";
import { StampApproval } from "src/models/stampApproval.entity";
import { StampApprovalController } from "./stampApproval.contoller";
import { StampApprovalService } from "./stampApproval.service";







@Module({
    imports:[
        TypeOrmModule.forFeature([StampApproval]),
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
