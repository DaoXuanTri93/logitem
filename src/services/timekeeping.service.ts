import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { And, Repository } from "typeorm";
import { TimeKeeping } from "src/models/timekeeping.entity";
import { StaffServices } from "./staff.services";
import { MissionRegistation } from "src/models/mission-registation.entity";
import { MissionServices } from "./mission.service";
import { log } from "console";

@Injectable()
export class TimekeepingServices {
    constructor(
        @InjectRepository(TimeKeeping)
        private timeKeepingRepository: Repository<TimeKeeping>,
        readonly staffServices: StaffServices,
        readonly missionServices: MissionServices
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
    async checkIn(req: any, data: any) {
        let datetime = new Date(Date.now())
        let date = datetime.toLocaleDateString();
        let time = datetime.toLocaleTimeString();

        let id = req.user.id;
        let staff = await this.staffServices.findOneByIdUser(id)
        let mission = await this.missionServices.findAllMissonByUser(staff.userName, date)
        console.log(mission);
        console.log(data.check);
        if (mission == null && data.check == false) {
            throw new HttpException("Bạn đang nằm ngoài phạm vi chấm công ", HttpStatus.BAD_REQUEST)
        }
        let timekeeping = await this.findOneByUserName(staff.userName, date)
        if (timekeeping == null) {
            timekeeping = new TimeKeeping();
        }
        timekeeping.timeStartDay = time;
        timekeeping.staff = staff;
        timekeeping.userName = staff.userName;
        timekeeping.dayTimeKeeping = date;
        if (mission.length > 0) {
            timekeeping.mission = true
        }
        let timekeep = this.timeKeepingRepository.create(timekeeping);
        timekeeping = await this.timeKeepingRepository.save(timekeep)
        return { timeStartDay: timekeeping.timeStartDay }
    }

    async checkOut(req: any, data: any) {
        let datetime = new Date(Date.now())
        let date = datetime.toLocaleDateString();
        let time = datetime.toLocaleTimeString();

        let id = req.user.id;
        let staff = await this.staffServices.findOneByIdUser(id)

        let mission = await this.missionServices.findAllMissonByUser(staff.userName, date)
        console.log(mission);
        
        if (mission == null && data.check == false) {
            throw new HttpException("Bạn đang nằm ngoài phạm vi chấm công ", HttpStatus.BAD_REQUEST)
        }
        let staffName = staff.userName
        let timekeeping = await this.findOneByUserName(staffName, date)
        if (timekeeping == null) {
            timekeeping = new TimeKeeping();
            timekeeping.staff = staff;
            timekeeping.userName = staff.userName;
            timekeeping.dayTimeKeeping = date;
            timekeeping.timeEndDay = time;
            if (mission.length > 0) {
                timekeeping.mission = true
            }
            let timekeep = this.timeKeepingRepository.create(timekeeping);
            timekeeping = await this.timeKeepingRepository.save(timekeep)
            return { timeEndDay: timekeeping.timeEndDay }
        }
        timekeeping.staff = staff;
        timekeeping.userName = staff.userName;
        timekeeping.dayTimeKeeping = date;
        timekeeping.timeEndDay = time;
        if (mission.length > 0) {
            timekeeping.mission = true
        }
        timekeeping = await this.timeKeepingRepository.save(timekeeping)
        return { timeEndDay: timekeeping.timeEndDay }
    }

    async checkInOverTime(req: any, data: any) {
        let datetime = new Date(Date.now())
        let date = datetime.toLocaleDateString();
        let time = datetime.toLocaleTimeString();
        let id = req.user.id;
        let staff = await this.staffServices.findOneByIdUser(id)
        let staffName = staff.userName
        let timekeeping = await this.findOneByUserName(staffName, date)
        let mission = await this.missionServices.findAllMissonByUser(staff.userName, date)
        if (timekeeping == null) {
            timekeeping = new TimeKeeping();
            timekeeping.staff = staff;
            timekeeping.userName = staff.userName;
            timekeeping.dayTimeKeeping = date;
            console.log(data);

            data.overTimeStart == null ? timekeeping.overTimeStart = time : timekeeping.overTimeStart = data.overTimeStart;
            if (mission.length > 0) {
                timekeeping.mission = true
            }
            let timekeep = this.timeKeepingRepository.create(timekeeping);
            timekeeping = await this.timeKeepingRepository.save(timekeep)
            return { overTimeStart: timekeeping.overTimeStart }
        }
        timekeeping.staff = staff;
        timekeeping.userName = staff.userName;
        timekeeping.dayTimeKeeping = date;
        data.overTimeStart == "" ? timekeeping.overTimeStart = time : timekeeping.overTimeStart = data.overTimeStart;
        if (mission.length > 0) {
            timekeeping.mission = true
        }
        timekeeping = await this.timeKeepingRepository.save(timekeeping)
        return { overTimeStart: timekeeping.overTimeStart }

    }

    async checkOutOverTime(req: any, data: any) {
        let datetime = new Date(Date.now())
        let date = datetime.toLocaleDateString();
        let time = datetime.toLocaleTimeString();
        let id = req.user.id;
        let staff = await this.staffServices.findOneByIdUser(id)
        let staffName = staff.userName
        let timekeeping = await this.findOneByUserName(staffName, date)
        let mission = await this.missionServices.findAllMissonByUser(staff.userName, date)
        if (timekeeping == null) {
            timekeeping = new TimeKeeping();
            timekeeping.staff = staff;
            timekeeping.userName = staff.userName;
            timekeeping.dayTimeKeeping = date;
            data.overTimeEnd == null ? timekeeping.overTimeEnd = time : timekeeping.overTimeEnd = data.overTimeEnd;
            if (mission.length > 0) {
                timekeeping.mission = true
            }
            let timekeep = this.timeKeepingRepository.create(timekeeping);
            timekeeping = await this.timeKeepingRepository.save(timekeep)
            return { overTimeEnd: timekeeping.overTimeEnd }
        }
        timekeeping.staff = staff;
        timekeeping.userName = staff.userName;
        timekeeping.dayTimeKeeping = date;
        data.overTimeEnd == "" ? timekeeping.overTimeEnd = time : timekeeping.overTimeEnd = data.overTimeEnd;
        if (mission.length > 0) {
            timekeeping.mission = true
        }
        timekeeping = await this.timeKeepingRepository.save(timekeeping)
        return { overTimeEnd: timekeeping.overTimeEnd }

    }
}