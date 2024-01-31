import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { StaffServices } from "src/services/staff.service";
import { Staff } from "src/models/staff.entity";
import { StaffController } from "./staff.controller";
import { JwtModule } from "@nestjs/jwt";
import { jwtConstants } from "src/auth/constant";
import { UserModule } from "src/users/users.module";
import { OfficeModule } from "src/office/office.module";
import { Permission } from "src/models/permission.entity";

@Module({
    imports:[
        TypeOrmModule.forFeature([Staff,Permission]),
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