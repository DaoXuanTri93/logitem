import { Module } from "@nestjs/common";
import { UserController } from "./users.controller";
import { UserServices } from "src/services/user.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Users } from "src/models/users.entity";

@Module({
    imports:[
        TypeOrmModule.forFeature([Users])
    ],
    controllers: [UserController],
    providers: [UserServices],
    exports: [UserServices],
  })
export class UserModule{}