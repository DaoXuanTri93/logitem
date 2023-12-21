import { Column, Entity, JoinColumn, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm"
import { Office } from "./office.entity"
import { Users } from "./users.entity"
import { StampApproval } from "./stampApproval.entity"
import { TimeKeeping } from "./timekeeping.entity"
import { MissionRegistation } from "./mission-registation.entity"

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
    stampApproval: string 

    @OneToMany(()=> TimeKeeping, (timeKeeping) => timeKeeping.staff)
    timeKeeping: TimeKeeping 

    @OneToMany(()=> MissionRegistation, (mission) => mission.staff)
    mission: MissionRegistation 

}