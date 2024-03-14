import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { ExceptionsHandler } from "@nestjs/core/exceptions/exceptions-handler";
import { InjectRepository } from "@nestjs/typeorm";
import { Role } from "src/enum/role.enum";
import { Status } from "src/enum/status.enum";
import { StampApproval } from "src/models/stampApproval.entity";
import { LogApproval } from "src/models/timekeeping-registation.entity";
import { LogApprovalServices } from "src/services/logapproval.service";
import { OfficeServices } from "src/services/office.service";
import { StaffServices } from "src/services/staff.service";
import { TimekeepingServices } from "src/services/timekeeping.service";
import { Repository } from "typeorm";




@Injectable()
export class StampApprovalService {

    constructor(
        @InjectRepository(StampApproval)
        private readonly repository: Repository<StampApproval>,
        readonly staffServices: StaffServices,
        readonly logApprovalServices: LogApprovalServices,
        readonly officeServices: OfficeServices
    ) { }


    async findAll() {
        return await this.repository.find();
    }

    async findAllByOfficeName(officeName: string) {
        return await this.repository.findBy({ officeName: officeName });
    }

    async findAllByDriverName(driverName: string) {
        return await this.repository.findBy({ driverName: driverName });
    }

    async findAllByStaff(req: any) {
        let id = req.user.sub;
        let staff = await this.staffServices.findOneByIdUser(id)
        if(!staff){
            return [];
        }
        if (staff.userAccount.role == Role.Admin) {
            return await this.repository.find();
        }
        return await this.findAllByOfficeName(staff.affiliatedOffice.baseName)
    }

    async findAllByDriver(req: any) {
        let id = req.user.sub;
        let staff = await this.staffServices.findOneByIdUser(id)
    
        return await this.findAllByDriverName(staff.userName)
    }

    async findAllOfficeByStaff(req: any) {
        let id = req.user.sub;
        let staff = await this.staffServices.findOneByIdUser(id)
        if (staff.userAccount.role == Role.Admin) {
            return (await this.officeServices.findAll()).map((e) => e.convertOfficeByStaffToDTO());
        }
        return [staff.affiliatedOffice.convertOfficeToDTO()];
    }


    async updateTeam(id) {

        // return this.repository.save();
    }

    async register(req: any, data: any) {
        let id = req.user.sub;
        let staff = await this.staffServices.findOneByIdUser(id)
        if (staff == null) {
            throw new HttpException("Driver does not exist", HttpStatus.BAD_REQUEST)
        }
        let stampApproval = new StampApproval();

        stampApproval.staff = staff
        stampApproval.officeName = staff.affiliatedOffice.baseName
        stampApproval.driverName = staff.userName
        stampApproval.submissionDate = data.date
        stampApproval.stampingAfterCorrection = data.time
        stampApproval.stampingBeforeCorrection = data.timeNew
        stampApproval = await this.repository.create(stampApproval)

        return await this.repository.save(stampApproval)
    }

    async approveData(id: string, data: any, req: any) {
        let iduser = req.user.sub;
        let staff = await this.staffServices.findOneByIdUser(iduser)

        let datetime = new Date(new Date().toLocaleString())
        let time = datetime.getHours().toString() + ":" + datetime.getMinutes().toString()+ ":" + datetime.getSeconds().toString();
        let month = datetime.getMonth() + 1 < 10 ? '0' + (datetime.getMonth() + 1) : datetime.getMonth() + 1;
        let date = datetime.getDate() < 10 ? '0' + datetime.getDate() : datetime.getDate();
        let year = datetime.getFullYear();
        let today = year + '/' + month + '/' + date
        let stampApproval = await this.repository.findOneBy({ stampApprovalId: id })
        if (stampApproval == null) {
            throw new HttpException("No information found", HttpStatus.BAD_REQUEST)
        }
        let logApproval = new LogApproval();
        logApproval.staff = staff
        logApproval.approvalDay = today;
        logApproval.hourApproval = time;
        logApproval.officeName = staff.affiliatedOffice.baseName;
        logApproval.stampApproval = stampApproval;
        logApproval.status = data.status

        this.logApprovalServices.save(logApproval);
        stampApproval.approvalDate = today;
        stampApproval.reason = data.reason
        stampApproval.approval = true;
        stampApproval.status = data.status
        return await this.repository.save(stampApproval)

    }


    async getData(id: string) {
        let stampApproval = await this.repository.findOneBy({ stampApprovalId: id })
        return stampApproval
    }

}