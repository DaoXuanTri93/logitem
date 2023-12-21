import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { StampApproval } from "src/models/stampApproval.entity";
import { Repository } from "typeorm";




@Injectable()
export class StampApprovalService{
    constructor(
        @InjectRepository(StampApproval)
        private readonly repository : Repository<StampApproval>
    ){}


    async findAll(){
        return  await this.repository.find();
    }


    async updateTeam(id){

        // return this.repository.save();
    }
}