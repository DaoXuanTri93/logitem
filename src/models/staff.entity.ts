import { Column, Entity, JoinColumn, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm"
import { Office } from "./office.entity"
import { Users } from "./users.entity"
import { StampApproval } from "./stampApproval.entity"
import { TimeKeeping } from "./timekeeping.entity"
import { StaffDTO } from "src/staff/staff.dto"

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

    @OneToMany(()=> TimeKeeping, (timeKeeping) => timeKeeping.staff,{eager: true})
    timeKeeping: TimeKeeping 

    convertStaffDTO():StaffDTO{
        let staffDTO = new StaffDTO();
          staffDTO.affiliatedOffice = this.affiliatedOffice.baseName
          staffDTO.userName = this.userName
          staffDTO.area = this.area
          staffDTO.date = this.timeKeeping.dayTimeKeeping
          staffDTO.clockInTime = this.timeKeeping.timeStartDay
          staffDTO.clockOutTime = this.timeKeeping.timeEndDay
          staffDTO.overtimeClockInTime = this.timeKeeping.overTimeStart
          staffDTO.overtimeClockOutTime = this.timeKeeping.overTimeEnd
          staffDTO.businessTrip = this.businessTrip
        return staffDTO
    }
}