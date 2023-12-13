import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { TimeKeeping } from "src/models/timekeeping.entity";

@Injectable()
export class TimekeepingServices {
    constructor(
        @InjectRepository(TimeKeeping)
        private timeKeepingRepository: Repository<TimeKeeping>,
    ) { }

    findAll() {
        return this.timeKeepingRepository.find();
    }

    findOne(id: string) {
        return this.timeKeepingRepository.findOneBy({ id });
    }
    findOneByUserName(userName: string, dayTimeKeeping:any) {
        return this.timeKeepingRepository.findOneBy({ userName, dayTimeKeeping });
    }

    async remove(id: number) {
        await this.timeKeepingRepository.delete(id);
    }

     createUser(res:any) {
        const timekeeping = this.timeKeepingRepository.create(res);
        console.log('ok')
        return this.timeKeepingRepository.save(timekeeping)
      }

    //  async updateUserbyid(id:string,res:UserDTO) {
    //         const user = await this.timeKeepingRepository.update(id,res);
    //         return user
    //   }

    //   async updateUser(res:Users) {
    //         const user = await this.timeKeepingRepository.save(res);
    //         return user
    //   }
}