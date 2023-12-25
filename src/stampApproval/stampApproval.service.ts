import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { log } from "console";
import { Role } from "src/enum/role.enum";
import { Staff } from "src/models/staff.entity";
import { StampApproval } from "src/models/stampApproval.entity";
import { OfficeService } from "src/services/office.service";
import { StaffServices } from "src/services/staff.services";
import { Repository } from "typeorm";




@Injectable()
export class StampApprovalService {

    constructor(
        @InjectRepository(StampApproval)
        private readonly repository: Repository<StampApproval>,
        readonly staffServices: StaffServices,
        readonly officeServices: OfficeService
    ) { }


    async findAll() {
        return await this.repository.find();
    }

    async findAllByOfficeName(officeName: string) {
        return await this.repository.findBy({ officeName: officeName });
    }

    async findAllByStaff(req: any) {
        let id = req.user.sub;

        let staff = await this.staffServices.findOneByIdUser(id)
        if (staff.userAccount.role == Role.Admin) {
            return await this.repository.find();
        }

        console.log('staff.affiliatedOffice.baseName', staff.affiliatedOffice.baseName);

        return await this.findAllByOfficeName(staff.affiliatedOffice.baseName)
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
            return new HttpException("Không tồn tại tài xế", HttpStatus.BAD_REQUEST)
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

    async approveData(id: string, data: any) {
        let datetime = new Date(Date.now())
        let date = datetime.toLocaleDateString();
        let stampApproval = await this.repository.findOneBy({ stampApprovalId: id })
        if (stampApproval == null) {
            return new HttpException("Không tìm thấy thông tin", HttpStatus.BAD_REQUEST)
        }
        console.log(data);
        console.log(data.reason);
        stampApproval.approvalDate = date;
        stampApproval.reason = data.reason
        stampApproval.approval= data.approval;
        return await this.repository.save(stampApproval)

    }


    async getData(id: string) {
        let stampApproval = await this.repository.findOneBy({ stampApprovalId: id })
        return stampApproval
    }

}