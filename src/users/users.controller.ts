import { Body, Controller, Get, Param, Post, Put } from "@nestjs/common";
import { SearchUserDTO, UserDTO } from "src/users/users.dto";
import { UserServices } from "src/services/user.service";

@Controller('users')
export class UserController {
        constructor(readonly userServices: UserServices) { }

        @Get()
        getAllUser(): void {
                this.userServices.findAll()
        }

        @Post()
        createUser(@Body() res:any ){
                return this.userServices.createUser(res)
        }

        @Put(':id')
        updateUser(@Param('id') id:string,@Body() res:UserDTO ){
                return this.userServices.updateUserbyid(id,res)
        }
}