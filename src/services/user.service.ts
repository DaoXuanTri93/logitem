import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { UserDTO } from "src/users/users.dto";
import { Users } from "src/models/users.entity";
import { Repository } from "typeorm";

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
    findOneByUserName(username: string) {
        return this.usersRepository.findOneBy({ username });
    }

    async remove(id: number) {
        await this.usersRepository.delete(id);
    }

     createUser(res:any) {
        const user = this.usersRepository.create(res);
        console.log('ok')
        return this.usersRepository.save(user)
      }

     async updateUserbyid(id:string,res:UserDTO) {
            const user = await this.usersRepository.update(id,res);
            return user
      }

      async updateUser(res:Users) {
            const user = await this.usersRepository.save(res);
            return user
      }
}