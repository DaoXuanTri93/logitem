import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { ExceptionsHandler } from "@nestjs/core/exceptions/exceptions-handler";
import { InjectRepository } from "@nestjs/typeorm";
import { EnterDistance } from "src/models/enterDistance.entity";
import { TimeKeeping } from "src/models/timekeeping.entity";
import { StaffServices } from "src/services/staff.service";
import { TimekeepingServices } from "src/services/timekeeping.service";
import { UserServices } from "src/services/user.service";
import { Repository } from "typeorm";




@Injectable()
export class EnterDistanceService {
    constructor(
        @InjectRepository(EnterDistance)
        private readonly respository: Repository<EnterDistance>,
        readonly staffServices: StaffServices,
        readonly timekeepingServices: TimekeepingServices,
        readonly userService: UserServices,
        ) { 
            
        }

    async createEnterDistance(body, userNameId) {
        
        // let dateCurrent = new Date(Date.now()).toLocaleDateString();

        let datetime = new Date(Date.now())
        // let time = datetime.toLocaleTimeString();
        let month = datetime.getMonth() + 1 < 10 ? '0' + (datetime.getMonth() + 1) : datetime.getMonth() + 1;
        let date = datetime.getDate() < 10 ? '0' + datetime.getDate() : datetime.getDate();
        let year = datetime.getFullYear();
        let today = year + '/' + month + '/' + date
        var checkDriver = await this.findOneEnterDistance(userNameId)

        
        if (checkDriver == null) {
            var data = {
                ...body,
                "userNameId": userNameId,
                "runningDay": today
            }
             this.respository.save(data)
            return HttpStatus.OK;
        }
        checkDriver.startingPoint = body.startingPoint
        checkDriver.firstKilometerPhoto = body.firstKilometerPhoto
        checkDriver.userNameId = userNameId;
        checkDriver.runningDay = today;
        if(checkDriver.endPoint != null ){
            let staff = await this.staffServices.findOneByIdUser(userNameId)
            let timekeeping = await this.timekeepingServices.findOneByUserName(staff.userName, today)
            if (timekeeping == null) {
                timekeeping = new TimeKeeping();
                timekeeping.staff = staff;
                timekeeping.userName = staff.userName;   
                timekeeping.dayTimeKeeping = today;
            }
            checkDriver.totalDistance = checkDriver.endPoint - checkDriver.startingPoint
            timekeeping.totalDistance =  checkDriver.totalDistance
            this.timekeepingServices.save(timekeeping)
        }
        this.respository.save(checkDriver)
        return HttpStatus.OK;
    }

    async updateEnterDistance(body, userNameId) {
        let datetime = new Date(Date.now())
        let month = datetime.getMonth() + 1 < 10 ? '0' + (datetime.getMonth() + 1) : datetime.getMonth() + 1;
        let date = datetime.getDate() < 10 ? '0' + datetime.getDate() : datetime.getDate();
        let year = datetime.getFullYear();
        let today = year + '/' + month + '/' + date
        let staff = await this.staffServices.findOneByIdUser(userNameId)
        var checkDriver = await this.findOneEnterDistance(userNameId)
        let timekeeping = await this.timekeepingServices.findOneByUserName(staff.userName, today)

        if (timekeeping == null) {
            timekeeping = new TimeKeeping();
            timekeeping.staff = staff;
            timekeeping.userName = staff.userName;   
            timekeeping.dayTimeKeeping = today;
        }
        
        if ( checkDriver == null) {
            throw new HttpException("StartPoint cannot null",HttpStatus.BAD_REQUEST);
        }
        
        if (body.endPoint < checkDriver.startingPoint) {
            throw new HttpException("EndPoint cannot be smaller than StartPoint",HttpStatus.BAD_REQUEST);
        }
        checkDriver.endPoint = body.endPoint
        checkDriver.lastKilometerPhoto = body.lastKilometerPhoto
        checkDriver.totalDistance = checkDriver.endPoint - checkDriver.startingPoint
        timekeeping.totalDistance =  checkDriver.totalDistance
        this.timekeepingServices.save(timekeeping)
        this.respository.save(checkDriver);
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

    async findByIdEnterDistance(req){
        let userNameId = req['userNameId'];
        let runningDay = req['runningDay'];
        let staffUserId = await this.staffServices.findOneByUserName(userNameId);
        let userId = staffUserId.userAccount.id;
       let distanceImage =  await this.respository.findOneBy({userNameId : {id : userId}, runningDay: runningDay});
       if(distanceImage == null){
        throw new HttpException('distanceImage not found',HttpStatus.BAD_REQUEST);
       }
        return distanceImage;
    }

}