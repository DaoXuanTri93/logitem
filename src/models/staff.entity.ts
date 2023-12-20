import { Column, Entity, JoinColumn, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm"
import { Office } from "./office.entity"
import { Users } from "./users.entity"
import { StampApproval } from "./stampApproval.entity"
import { TimeKeeping } from "./timekeeping.entity"
import { StaffUsersDTO } from "src/staff/staffuser.dto"

@Entity()
export class Staff {
    @PrimaryGeneratedColumn()
    staffId: string

    @OneToOne(() => Users, (userAccount) => userAccount.staff,{eager: true})
    @JoinColumn()
    userAccount: Users

    @Column({ nullable: true })
    userName: string

    @Column({ nullable: true })
    email: string

    @Column({ nullable: true })
    telephone: string

    @Column({ nullable: true })
    dateOfBirth: string

    @Column({ nullable: true })
    drivingLicenseNumber: string

    @Column({ nullable: true })
    area: string

    @Column({ nullable: true })
    businessTrip: string
    
    @Column({ nullable: true })
    macAddress: string

    @ManyToOne(() => Office, (office) => office.listStaff,{eager: true})
    @JoinColumn()
    affiliatedOffice: Office

    @OneToMany(()=> StampApproval, (stampApproval) => stampApproval.staff)
    stampApproval: StampApproval 

    @OneToMany(()=> TimeKeeping, (timeKeeping) => timeKeeping.staff)
    timeKeeping: TimeKeeping 

    converStaffToDTO(): StaffUsersDTO{
        let staffUsersDTO = new StaffUsersDTO()


        staffUsersDTO.id = this.staffId
        staffUsersDTO.userAccount = this.userAccount.username
        staffUsersDTO.userName = this.userName
        staffUsersDTO.email = this.email
        staffUsersDTO.telephone = this.telephone
        staffUsersDTO.affiliatedOffice = this.affiliatedOffice.baseName
        staffUsersDTO.role = this.userAccount.role
        staffUsersDTO.MAC = this.userAccount.MAC
         return staffUsersDTO
     }
}