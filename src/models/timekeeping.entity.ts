import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm"
import { Staff } from "./staff.entity"
import { TimeKeepingDTO } from "src/timekeeping/timekeeping.dto"
import { DriverDTO } from "src/staff/driver.dto"

@Entity()
export class TimeKeeping {
    @PrimaryGeneratedColumn()
    id: string

    @ManyToOne(() => Staff, (staff) => staff.timeKeeping, { eager: true })
    @JoinColumn()
    staff: Staff

    @Column()
    userName: string

    @Column({ nullable: true })
    timeStartDay: string

    @Column({ nullable: true })
    timeEndDay: string

    @Column({ nullable: true })
    overTimeStart: string

    @Column({ nullable: true })
    overTimeEnd: string

    @Column({ default: false })
    mission: boolean

    @Column({ nullable: true })
    totalDistance: number

    @Column()
    dayTimeKeeping: String

    convertTimeKeepingToDTO(): TimeKeepingDTO {
        let timeKeepingDTO = new TimeKeepingDTO();
        timeKeepingDTO.timeStartDay = this.timeStartDay
        timeKeepingDTO.timeEndDay = this.timeEndDay
        return timeKeepingDTO
    }

    convertTimeKeepingDriverToDTO(): TimeKeepingDTO {
        let timeKeepingDTO = new TimeKeepingDTO();
        timeKeepingDTO.id = this.id
        timeKeepingDTO.userName = this.userName
        timeKeepingDTO.officeName = this.staff.affiliatedOffice.baseName
        timeKeepingDTO.officeId = this.staff.affiliatedOffice.officeId
        timeKeepingDTO.area = this.staff.affiliatedOffice.area.areaName
        timeKeepingDTO.timeStartDay = this.timeStartDay
        timeKeepingDTO.timeEndDay = this.timeEndDay
        timeKeepingDTO.overTimeStart = this.overTimeStart
        timeKeepingDTO.overTimeEnd = this.overTimeEnd
        timeKeepingDTO.workOutside = this.mission
        timeKeepingDTO.totalDistance = this.totalDistance
        timeKeepingDTO.dayTimeKeeping = this.dayTimeKeeping
        return timeKeepingDTO
    }
    convertTimeKeepingDriverByIdToDTO(): DriverDTO {
        let driverDTO = new DriverDTO();
        driverDTO.userName = this.userName
        driverDTO.staffId = this.staff.staffId.toString()
        driverDTO.dateOfBirth = this.staff.dateOfBirth
        driverDTO.area = this.staff.affiliatedOffice.area.areaName
        driverDTO.mission = this.mission.toString()
        driverDTO.phone = this.staff.telephone
        return driverDTO
    }
}