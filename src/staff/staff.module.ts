import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { StaffServices } from "src/services/staff.services";
import { Staff } from "src/models/staff.entity";
import { StaffController } from "./staff.controller";
import { UserModule } from "src/users/users.module";
import { OfficeModule } from "src/office/office.module";
import { AuthModule } from "src/auth/auth.module";
import { JwtModule } from "@nestjs/jwt";
import { jwtConstants } from "src/auth/constant";

@Module({
    imports:[
      OfficeModule,
      UserModule,
      TypeOrmModule.forFeature([Staff]),
      // JwtModule.register({
      //   secret: jwtConstants.secret,
      //   signOptions: { expiresIn: '1d' },
      // })
    ],
    controllers: [StaffController],
    providers: [StaffServices],
    exports: [StaffServices],
  })
export class StaffModule{}