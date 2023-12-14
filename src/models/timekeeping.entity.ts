import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm"
import { Staff } from "./staff.entity"
import { TimeKeepingDTO } from "src/timekeeping/timekeeping.dto"

@Entity()
export class TimeKeeping {
    @PrimaryGeneratedColumn()
    id : string

    @ManyToOne(() => Staff, (staff) => staff.timeKeeping,{eager: true})
    @JoinColumn()
    staff: Staff

    @Column()
    userName: string

    @Column({nullable: true})
    timeStartDay: string

    @Column({nullable: true})
    timeEndDay: string

    @Column({nullable: true})
    overTimeStart: string 

    @Column({nullable: true})
    overTimeEnd: string 

    @Column({nullable: true})
    workOutside: string

    @Column({unique:true})
    dayTimeKeeping: String

    convertTimeKeepingToDTO():TimeKeepingDTO{
        let timeKeepingDTO = new TimeKeepingDTO();
        timeKeepingDTO.timeStartDay = this.timeStartDay
        timeKeepingDTO.timeEndDay = this.timeEndDay
        return timeKeepingDTO
    }
}