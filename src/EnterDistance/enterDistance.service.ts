import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { ExceptionsHandler } from "@nestjs/core/exceptions/exceptions-handler";
import { InjectRepository } from "@nestjs/typeorm";
import { ok } from "assert";
import { EnterDistance } from "src/models/enterDistance.entity";
import { TimeKeeping } from "src/models/timekeeping.entity";
import { StaffServices } from "src/services/staff.services";
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
        
        let dateCurrent = new Date(Date.now()).toLocaleDateString();
        var checkXe = await this.findOneEnterDistance(userNameId)
        if (checkXe == null) {
            var data = {
                ...body,
                "userNameId": userNameId,
                "runningDay": dateCurrent
            }
             this.respository.save(data)
            return HttpStatus.OK;
        }

        checkXe.startingPoint = body.startingPoint
        checkXe.firstKilometerPhoto = body.firstKilometerPhoto
        checkXe.userNameId = userNameId;
        checkXe.runningDay = dateCurrent;

        this.respository.save(checkXe)
        return HttpStatus.OK;
    }

    async updateEnterDistance(body, userNameId) {
        let date = new Date(Date.now()).toLocaleDateString();
        let staff = await this.staffServices.findOneByIdUser(userNameId)
        var checkXe = await this.findOneEnterDistance(userNameId)
        let timekeeping = await this.timekeepingServices.findOneByUserName(staff.userName, date)
        if (timekeeping == null) {
            timekeeping = new TimeKeeping();
            timekeeping.staff = staff;
            timekeeping.userName = staff.userName;
            timekeeping.dayTimeKeeping = date;
        }
        
        if (body.endPoint < checkXe.startingPoint) {
            throw new HttpException("endPoint cannot be smaller than startingPoint",HttpStatus.BAD_REQUEST);
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
        let dateCurrent = new Date(Date.now()).toLocaleDateString();
        return await this.respository.findOneBy({runningDay : dateCurrent, userNameId: {id : userNameId}});;
        
    }

}