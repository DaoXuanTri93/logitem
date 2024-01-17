import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { ExceptionsHandler } from "@nestjs/core/exceptions/exceptions-handler";
import { InjectRepository } from "@nestjs/typeorm";
import { EnterDistance } from "src/models/enterDistance.entity";
import { TimeKeeping } from "src/models/timekeeping.entity";
import { StaffServices } from "src/services/staff.service";
import { TimekeepingServices } from "src/services/timekeeping.service";
import { Repository } from "typeorm";




@Injectable()
export class EnterDistanceService {
    constructor(
        @InjectRepository(EnterDistance)
        private readonly respository: Repository<EnterDistance>,
        readonly staffServices: StaffServices,
        readonly timekeepingServices: TimekeepingServices,) { 
            
        }

    async createEnterDistance(body, userNameId) {
        
        // let dateCurrent = new Date(Date.now()).toLocaleDateString();

        let datetime = new Date(Date.now())
        // let time = datetime.toLocaleTimeString();
        let month = datetime.getMonth() + 1 < 10 ? '0' + (datetime.getMonth() + 1) : datetime.getMonth() + 1;
        let date = datetime.getDate() < 10 ? '0' + datetime.getDate() : datetime.getDate();
        let year = datetime.getFullYear();
        let today = year + '/' + month + '/' + date
        var checkXe = await this.findOneEnterDistance(userNameId)

        
        if (checkXe == null) {
            var data = {
                ...body,
                "userNameId": userNameId,
                "runningDay": today
            }
             this.respository.save(data)
            return HttpStatus.OK;
        }
        checkXe.startingPoint = body.startingPoint
        checkXe.firstKilometerPhoto = body.firstKilometerPhoto
        checkXe.userNameId = userNameId;
        checkXe.runningDay = today;
        if(checkXe.endPoint != null ){
            let staff = await this.staffServices.findOneByIdUser(userNameId)
            let timekeeping = await this.timekeepingServices.findOneByUserName(staff.userName, today)
            if (timekeeping == null) {
                timekeeping = new TimeKeeping();
                timekeeping.staff = staff;
                timekeeping.userName = staff.userName;   
                timekeeping.dayTimeKeeping = today;
            }
            checkXe.totalDistance = checkXe.endPoint - checkXe.startingPoint
            timekeeping.totalDistance =  checkXe.totalDistance
            this.timekeepingServices.save(timekeeping)
        }
        this.respository.save(checkXe)
        return HttpStatus.OK;
    }

    async updateEnterDistance(body, userNameId) {
        let datetime = new Date(Date.now())
        let month = datetime.getMonth() + 1 < 10 ? '0' + (datetime.getMonth() + 1) : datetime.getMonth() + 1;
        let date = datetime.getDate() < 10 ? '0' + datetime.getDate() : datetime.getDate();
        let year = datetime.getFullYear();
        let today = year + '/' + month + '/' + date
        let staff = await this.staffServices.findOneByIdUser(userNameId)
        var checkXe = await this.findOneEnterDistance(userNameId)
        let timekeeping = await this.timekeepingServices.findOneByUserName(staff.userName, today)

        if (timekeeping == null) {
            timekeeping = new TimeKeeping();
            timekeeping.staff = staff;
            timekeeping.userName = staff.userName;   
            timekeeping.dayTimeKeeping = today;
        }
        
        if ( checkXe == null) {
            throw new HttpException("StartPoint cannot null",HttpStatus.BAD_REQUEST);
        }
        
        if (body.endPoint < checkXe.startingPoint) {
            throw new HttpException("EndPoint cannot be smaller than StartPoint",HttpStatus.BAD_REQUEST);
        }
        checkXe.endPoint = body.endPoint
        checkXe.lastKilometerPhoto = body.lastKilometerPhoto
        checkXe.totalDistance = checkXe.endPoint - checkXe.startingPoint
        timekeeping.totalDistance =  checkXe.totalDistance
        this.timekeepingServices.save(timekeeping)
        this.respository.save(checkXe);
        return HttpStatus.OK;
    }

     async findOneEnterDistance(userNameId){
        let datetime = new Date(Date.now())
        let month = datetime.getMonth() + 1 < 10 ? '0' + (datetime.getMonth() + 1) : datetime.getMonth() + 1;
        let date = datetime.getDate() < 10 ? '0' + datetime.getDate() : datetime.getDate();
        let year = datetime.getFullYear();
        let today = year + '/' + month + '/' + date
        return await this.respository.findOneBy({runningDay : today, userNameId: {id : userNameId}});;
        
    }

}