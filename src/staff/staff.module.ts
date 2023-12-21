import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { StaffServices } from "src/services/staff.service";
import { Staff } from "src/models/staff.entity";
import { StaffController } from "./staff.controller";
import { UserServices } from "src/services/user.service";
import { OfficeServices } from "src/services/office.service";
import { Users } from "src/models/users.entity";
import { Office } from "src/models/office.entity";

@Module({
    imports:[
        TypeOrmModule.forFeature([Staff]),
        TypeOrmModule.forFeature([Users]),
        TypeOrmModule.forFeature([Office]),
    ],
    controllers: [StaffController],
    providers: [StaffServices,
      UserServices,
      OfficeServices],
    exports: [StaffServices,
      UserServices,
      OfficeServices],
  })
export class StaffModule{}