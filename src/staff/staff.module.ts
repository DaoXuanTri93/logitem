import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { TimekeepingServices } from "src/services/timekeeping.service";
import { StaffServices } from "src/services/staff.services";
import { Staff } from "src/models/staff.entity";

@Module({
    imports:[
        TypeOrmModule.forFeature([Staff])
    ],
    // controllers: [TimekeepingController],
    providers: [StaffServices],
    exports: [StaffServices],
  })
export class StaffModule{}