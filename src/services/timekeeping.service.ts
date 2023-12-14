import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { TimeKeeping } from "src/models/timekeeping.entity";
import { StaffServices } from "./staff.services";

@Injectable()
export class TimekeepingServices {
    constructor(
        @InjectRepository(TimeKeeping)
        private timeKeepingRepository: Repository<TimeKeeping>,
        readonly staffServices: StaffServices
    ) { }

    findAll() {
        return this.timeKeepingRepository.find();
    }

    findOne(id: string) {
        return this.timeKeepingRepository.findOneBy({ id });
    }
    findOneByUserName(userName: string, dayTimeKeeping: any) {
        return this.timeKeepingRepository.findOneBy({ userName, dayTimeKeeping });
    }

    async remove(id: number) {
        await this.timeKeepingRepository.delete(id);
    }

    createTimeKeeping(timekeeping: TimeKeeping) {
        const timekeep = this.timeKeepingRepository.create(timekeeping);
        return this.timeKeepingRepository.save(timekeeping)
    }

    async checkIn(req: any) {
        let datetime = new Date(Date.now())
        let date = datetime.toLocaleDateString();
        let time = datetime.toLocaleTimeString();

        let id = req.user.id;
        let staff = await this.staffServices.findOneByIdUser(id)

        let timekeeping = new TimeKeeping()

        timekeeping.timeStartDay = time;
        timekeeping.staff = staff;
        timekeeping.userName = staff.userName;
        timekeeping.dayTimeKeeping = date;

        let timekeep = this.timeKeepingRepository.create(timekeeping);
        timekeeping = await this.timeKeepingRepository.save(timekeep)
        return {timeStartDay : timekeeping.timeStartDay}
    }

    async checkOut(req: any) {
        let datetime = new Date(Date.now())
        let date = datetime.toLocaleDateString();
        let time = datetime.toLocaleTimeString();

        let id = req.user.id;
        let staff = await this.staffServices.findOneByIdUser(id)

        let staffName = staff.userName
        let timekeeping = await this.findOneByUserName(staffName,date)
        timekeeping.timeEndDay = time;

        let timekeep = this.timeKeepingRepository.create(timekeeping);
        timekeeping = await this.timeKeepingRepository.save(timekeep)
        return {timeEndDay : timekeeping.timeEndDay}
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