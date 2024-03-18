import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { SearchUserDTO, UserDTO } from "src/users/users.dto";
import { Users } from "src/models/users.entity";
import { Repository } from "typeorm";
import { Permission } from "src/models/permission.entity";

@Injectable()
export class UserServices {
    constructor(
        @InjectRepository(Users)
        private usersRepository: Repository<Users>,
    ) { }

    findAll() {
        return this.usersRepository.find();
    }

    findOne(id: string) {
        return this.usersRepository.findOneBy({ id });
    }
   async  findOneByUserName(username : string) {
        return await this.usersRepository.findOneBy({username});
    }

    async remove(id: number) {
        await this.usersRepository.delete(id);
    }

    async createUser(res:Users) {
        let checkuser = await this.findOneByUserName(res.username)
        if(checkuser!= null){
            throw new HttpException("Account name already exists",HttpStatus.BAD_REQUEST)
        }
        const user = this.usersRepository.create(res);

        return await this.usersRepository.save(user)
      }

     async updateUserbyid(id:string,res:UserDTO) {
        let checkuser = await this.findOneByUserName(res.username)
        if(checkuser!= null){
            throw new HttpException("Account name already exists",HttpStatus.BAD_REQUEST)
        }
            const user = await this.usersRepository.update(id,res);
            return user
      }

      async updateUserbyStaffUser(id:string,res:any) {
        let checkuser = await this.findOneByUserName(res.username)
        if(checkuser!= null){
            throw new HttpException("Account name already exists",HttpStatus.BAD_REQUEST)
        }
        const user = await this.usersRepository.update(id,res);
        return user
    }

      async updateUser(res:Users) {
            const user = await this.usersRepository.save(res);
            return user
      }

      async updatePassword(user){
        return await this.usersRepository.save(user);
      }
}