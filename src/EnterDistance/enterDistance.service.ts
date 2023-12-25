import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { ExceptionsHandler } from "@nestjs/core/exceptions/exceptions-handler";
import { InjectRepository } from "@nestjs/typeorm";
import { ok } from "assert";
import { EnterDistance } from "src/models/enterDistance.entity";
import { Repository } from "typeorm";




@Injectable()
export class EnterDistanceService {
    constructor(
        @InjectRepository(EnterDistance)
        private readonly respository: Repository<EnterDistance>) { 
            
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
        var checkXe = await this.findOneEnterDistance(userNameId)

        if (body.endPoint < checkXe.startingPoint) {
            throw new HttpException("endPoint cannot be smaller than startingPoint",HttpStatus.BAD_REQUEST);
        }
        checkXe.endPoint = body.endPoint
        checkXe.lastKilometerPhoto = body.lastKilometerPhoto
        checkXe.totalDistance = checkXe.endPoint - checkXe.startingPoint
        this.respository.save(checkXe);

        return HttpStatus.OK;
    

    }

     async findOneEnterDistance(userNameId){
        let dateCurrent = new Date(Date.now()).toLocaleDateString();
        return await this.respository.findOneBy({runningDay : dateCurrent, userNameId: {id : userNameId}});;
        
    }

}