import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { And, Repository } from "typeorm";
import { TimeKeeping } from "src/models/timekeeping.entity";
import { MissionServices } from "./mission.service";
import { Role } from "src/enum/role.enum";
import { Status } from "src/enum/status.enum";
import { StaffServices } from "./staff.service";
import { Area } from "src/models/area.entity";
@Injectable()
export class TimekeepingServices {

    constructor(
        @InjectRepository(TimeKeeping)
        private timeKeepingRepository: Repository<TimeKeeping>,
        @InjectRepository(Area)
        private areaRepository: Repository<Area>,
        readonly staffServices: StaffServices,
        readonly missionServices: MissionServices
    ) { }

    findAll() {
        return this.timeKeepingRepository.find();
    }

    async findAllByDriver() {
        return await this.timeKeepingRepository.find({ where: { staff: { userAccount: { role: Role.Driver } } } });
    }

    findAllByMissionDay(startday, endDay) {
        return this.timeKeepingRepository.createQueryBuilder("time_keeping")
            .where("time_keeping.dayTimeKeeping >=:startday and time_keeping.dayTimeKeeping <= :endDay", { startday: startday, endDay: endDay })
            .getMany()
    }
    findAllByDriverAndOffice(officeName: string) {
        return this.timeKeepingRepository.findBy({ staff: { userAccount: { role: Role.Driver }, affiliatedOffice: { baseName: officeName } } });
    }
    save(timeKeeping: TimeKeeping) {
        return this.timeKeepingRepository.save(timeKeeping);
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
        return this.timeKeepingRepository.save(timekeep)
    }
    async checkIn(req: any, data: any) {
        let datetime = new Date(new Date().toLocaleString())
        let time = datetime.getHours().toString() + ":" + datetime.getMinutes().toString() + ":" + datetime.getSeconds().toString();
        let month = datetime.getMonth() + 1 < 10 ? '0' + (datetime.getMonth() + 1) : datetime.getMonth() + 1;
        let date = datetime.getDate() < 10 ? '0' + datetime.getDate() : datetime.getDate();
        let year = datetime.getFullYear();
        let today = year + '/' + month + '/' + date
        let id = req.user.sub;
        let staff = await this.staffServices.findOneByIdUser(id)
        let mission = await this.missionServices.findAllMissonByUser(staff.userName, today)

        if (mission.length == 0 && data.check == false) {
            throw new HttpException("You are outside the timekeeping range ", HttpStatus.BAD_REQUEST)
        }
        let timekeeping = await this.findOneByUserName(staff.userName, today)

        if (timekeeping == null) {
            timekeeping = new TimeKeeping();
        }
        timekeeping.timeStartDay = time;
        timekeeping.staff = staff;
        timekeeping.userName = staff.userName;
        timekeeping.dayTimeKeeping = today;
        if (mission.length > 0) {
            timekeeping.mission = true
        }
        let timekeep = this.timeKeepingRepository.create(timekeeping);
        timekeeping = await this.timeKeepingRepository.save(timekeep)
        return { timeStartDay: timekeeping.timeStartDay }
    }

    async checkOut(req: any, data: any) {
        let datetime = new Date(new Date().toLocaleString())
        let time = datetime.getHours().toString() + ":" + datetime.getMinutes().toString() + ":" + datetime.getSeconds().toString();
        let month = datetime.getMonth() + 1 < 10 ? '0' + (datetime.getMonth() + 1) : datetime.getMonth() + 1;
        let date = datetime.getDate() < 10 ? '0' + datetime.getDate() : datetime.getDate();
        let year = datetime.getFullYear();
        let today = year + '/' + month + '/' + date

        let id = req.user.sub;
        let staff = await this.staffServices.findOneByIdUser(id)

        let mission = await this.missionServices.findAllMissonByUser(staff.userName, today)

        if (mission.length == 0 && data.check == false) {
            throw new HttpException("You are outside the timekeeping range ", HttpStatus.BAD_REQUEST)
        }
        let staffName = staff.userName
        let timekeeping = await this.findOneByUserName(staffName, today)
        if (timekeeping == null) {
            timekeeping = new TimeKeeping();
            timekeeping.staff = staff;
            timekeeping.userName = staff.userName;
            timekeeping.dayTimeKeeping = today;
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
        timekeeping.dayTimeKeeping = today;
        timekeeping.timeEndDay = time;
        if (mission.length > 0) {
            timekeeping.mission = true
        }
        timekeeping = await this.timeKeepingRepository.save(timekeeping)
        return { timeEndDay: timekeeping.timeEndDay }
    }

    async checkInOverTime(req: any, data: any) {
        let datetime = new Date(new Date().toLocaleString())
        let time = datetime.getHours().toString() + ":" + datetime.getMinutes().toString() + ":" + datetime.getSeconds().toString();
        let month = datetime.getMonth() + 1 < 10 ? '0' + (datetime.getMonth() + 1) : datetime.getMonth() + 1;
        let date = datetime.getDate() < 10 ? '0' + datetime.getDate() : datetime.getDate();
        let year = datetime.getFullYear();
        let today = year + '/' + month + '/' + date
        let id = req.user.sub;
        let staff = await this.staffServices.findOneByIdUser(id)
        let staffName = staff.userName
        let timekeeping = await this.findOneByUserName(staffName, today)
        let mission = await this.missionServices.findAllMissonByUser(staff.userName, today)
        if (timekeeping == null) {
            timekeeping = new TimeKeeping();
            timekeeping.staff = staff;
            timekeeping.userName = staff.userName;
            timekeeping.dayTimeKeeping = today;
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
        timekeeping.dayTimeKeeping = today;
        data.overTimeStart == "" ? timekeeping.overTimeStart = time : timekeeping.overTimeStart = data.overTimeStart;
        if (mission.length > 0) {
            timekeeping.mission = true
        }
        timekeeping = await this.timeKeepingRepository.save(timekeeping)
        return { overTimeStart: timekeeping.overTimeStart }

    }

    async checkOutOverTime(req: any, data: any) {
        let datetime = new Date(new Date().toLocaleString())
        let time = datetime.getHours().toString() + ":" + datetime.getMinutes().toString() + ":" + datetime.getSeconds().toString();
        let month = datetime.getMonth() + 1 < 10 ? '0' + (datetime.getMonth() + 1) : datetime.getMonth() + 1;
        let date = datetime.getDate() < 10 ? '0' + datetime.getDate() : datetime.getDate();
        let year = datetime.getFullYear();
        let today = year + '/' + month + '/' + date
        let id = req.user.sub;
        let staff = await this.staffServices.findOneByIdUser(id)
        let staffName = staff.userName
        let timekeeping = await this.findOneByUserName(staffName, today)
        let mission = await this.missionServices.findAllMissonByUser(staff.userName, today)
        if (timekeeping == null) {
            timekeeping = new TimeKeeping();
            timekeeping.staff = staff;
            timekeeping.userName = staff.userName;
            timekeeping.dayTimeKeeping = today;
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
        timekeeping.dayTimeKeeping = today;
        data.overTimeEnd == "" ? timekeeping.overTimeEnd = time : timekeeping.overTimeEnd = data.overTimeEnd;
        if (mission.length > 0) {
            timekeeping.mission = true
        }
        timekeeping = await this.timeKeepingRepository.save(timekeeping)
        return { overTimeEnd: timekeeping.overTimeEnd }

    }

    async findAllByStaff(req: any) {
        let id = req.user.sub;
        let staff = await this.staffServices.findOneByIdUser(id)
        if (!staff) {
            return [];
            // throw new HttpException("Account has not been verified", HttpStatus.BAD_REQUEST)
        }
        if (staff.userAccount.role == Role.Admin) {
            return await this.findAllByDriver();
        }

        return await this.findAllByDriverAndOffice(staff.affiliatedOffice.baseName)

    }

    async findDriverById(id: string) {
        let driver = await this.findOne(id)
        if (driver == null) {
            throw new HttpException("This driver does not exist", HttpStatus.BAD_REQUEST)
        }
        return driver.convertTimeKeepingDriverByIdToDTO()

    }

    async editDriver(id: string, data: any) {
        let driver = await this.findOne(id)
        let staff = driver.staff;
        staff.userName = data.userName

        staff.dateOfBirth = data.dateOfBirth
        let area = await this.areaRepository.findOneBy({ areaName: data.area })
        if (area != null) {
            staff.area = area
        }
        return await this.staffServices.save(staff)
    }
}