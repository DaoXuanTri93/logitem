import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { StaffServices } from "src/services/staff.service";
import { Staff } from "src/models/staff.entity";
import { StaffController } from "./staff.controller";

@Module({
    imports:[
        TypeOrmModule.forFeature([Staff])
    ],
    controllers: [StaffController],
    providers: [StaffServices],
    exports: [StaffServices],
  })
export class StaffModule{}