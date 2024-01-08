import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { StaffServices } from "src/services/staff.service";
import { Staff } from "src/models/staff.entity";
import { StaffController } from "./staff.controller";
import { UserServices } from "src/services/user.service";
import { OfficeServices } from "src/services/office.service";
import { Users } from "src/models/users.entity";
import { Office } from "src/models/office.entity";
import { JwtModule } from "@nestjs/jwt";
import { jwtConstants } from "src/auth/constant";
import { UserModule } from "src/users/users.module";
import { OfficeModule } from "src/office/office.module";

@Module({
    imports:[
        TypeOrmModule.forFeature([Staff]),
        UserModule,OfficeModule,
        JwtModule.register({
          secret: jwtConstants.secret,
          signOptions: { expiresIn: '1d' },
        })
    ],
    controllers: [StaffController],
    providers: [StaffServices],
    exports: [StaffServices],
  })
export class StaffModule{}