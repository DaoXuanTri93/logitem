import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Office } from "src/models/office.entity";
import { OfficeController } from "./office.controller";
import { OfficeServices } from "src/services/office.service";

@Module({
    imports:[
        TypeOrmModule.forFeature([Office])
    ],
    controllers: [OfficeController],
    providers: [OfficeServices],
    exports: [OfficeServices],
  })
export class OfficeModule{}