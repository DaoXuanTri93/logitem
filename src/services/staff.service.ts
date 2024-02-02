import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Staff } from "src/models/staff.entity";
import { Role } from "src/enum/role.enum";
import { Permission } from "src/models/permission.entity";
import { Users } from "src/models/users.entity";
import { DriverPerDTO } from "src/staff/driverPermission.dto";
import { log } from "console";
import { UserServices } from "./user.service";


@Injectable()
export class StaffServices {
    constructor(
        @InjectRepository(Staff)
        private staffRepository: Repository<Staff>,
        @InjectRepository(Permission)
        private permissionRepository: Repository<Permission>,
        readonly userServices: UserServices,
    ) { }

    async findAll() {
        return await this.staffRepository.find();
    }

    async findPermissionByStaffId(id:string) {
        return await this.permissionRepository.findOneBy({staff:{staffId:id}});
    }

    async findAllByStaff(req: any) {
        let id = req.user.sub;
        let staff = await this.findOneByIdUser(id)
        if (staff.userAccount.role == Role.Admin) {
            return await this.staffRepository.find();
        }
        return await this.findAllByOfficeName(staff.affiliatedOffice.baseName)
    }

    async findAllByDriver(req: any, idDriver: string) {
        // let id = req.user.sub;
        let staff = await this.findOneByIdUser(idDriver)
        if (staff.userAccount.role == Role.Admin) {
            return await this.staffRepository.find();
        }
        let permission = await this.permissionRepository.findOneBy({ staff: { staffId: idDriver } })
        let editUsers = []
        let approveUsers = []
        if (permission != null) {
            permission.editUsers != null ? editUsers = permission.editUsers : editUsers = []
            permission.approveUsers  != null ? approveUsers = permission.approveUsers : approveUsers = []
        }
    
        let listDriver: DriverPerDTO[] = []
        let staffs = await this.findAllDriverByOfficeName(staff.affiliatedOffice.baseName)
        staffs.map((s) => {
            let driver: DriverPerDTO = new DriverPerDTO(); 
            driver = s.converDriverToDTO();
            if (approveUsers.length > 0) {
                approveUsers.map((d) =>  {
                    if(d == s.userAccount.id){
                        driver.approve = true
                    }
                })
            }
            if (editUsers.length > 0) {
                editUsers.map((d) => {
                    if(d == s.userAccount.id){
                        driver.edit = true
                    }
                })
            }
            listDriver.push(driver)
        })
        
        return listDriver
    }

    async findAllByOfficeName(officeName: string) {
        return await this.staffRepository.findBy({ affiliatedOffice: { baseName: officeName } });
    }

    async findAllDriverByOfficeName(officeName: string) {
        return await this.staffRepository.findBy({ affiliatedOffice: { baseName: officeName }, userAccount: { role: Role.Driver } });;
    }

    findOne(staffId: string) {
        return this.staffRepository.findOne({
            where: {
                staffId: staffId
            }
        });
    }

    async findOneByIdUser(id: any) {
        return await this.staffRepository.findOneBy({ userAccount: { id: id } });
    }

    findOneById(staffId: any) {
        return this.staffRepository.findOneBy({ staffId });
    }

    findOneByIdAffiliatedOffice(affiliatedOffice: any) {
        return this.staffRepository.findOneBy({ affiliatedOffice });
    }

    findOneByUserName(userName: string) {
        return this.staffRepository.findOneBy({ userName });
    }

    async remove(id: number) {
        await this.staffRepository.delete(id);
    }

    createStaff(res: any) {
        const staff = this.staffRepository.create(res);
        return this.staffRepository.save(staff)
    }

    async save(staff: Staff) {
        await this.staffRepository.save(staff);
    }


    async updateStaffUserById(id: string, res: any) {
        return await this.staffRepository.update(id, res);

    }


    async settingPermission(req: any, idDriver: string) {
        let staff = await this.findOneByIdUser(idDriver)
        let permission = await this.permissionRepository.findOneBy({staff: { staffId: idDriver } })
    
        let editUsers:any = []
        let approveUsers:any = []
        if (permission == null) {
            permission = new Permission()
        }
        let dataEdit = req.dataEdit
        let dataApprove = req.dataApprove
        dataEdit.map(async (e) => {
            let user = await this.userServices.findOneByUserName(e)
            editUsers.push(user.id)
        })
        dataApprove.map(async (e) => {
            let user = await this.userServices.findOneByUserName(e)
            approveUsers.push(user.id)
        })
    
        if (req.approve == true && req.multiapprove == false) {
            permission.approveUsers = approveUsers
        }
        if (req.edit == true && req.multiedit == false) {
            permission.editUsers = editUsers
        }
        permission.authoritiesApproved = req.approve
        permission.edit = req.edit
        permission.multiEdit = req.multiEdit
        permission.multiapproved = req.multiapprove
        permission.staff = staff
        return await this.permissionRepository.save(permission);
    }


}