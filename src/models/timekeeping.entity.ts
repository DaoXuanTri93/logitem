import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm"
import { Staff } from "./staff.entity"

@Entity()
export class TimeKeeping {
    @PrimaryGeneratedColumn()
    id : string

    @ManyToOne(() => Staff, (staff) => staff.timeKeeping)
    @JoinColumn()
    staff: string

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

    @Column()
    dayTimeKeeping: String
}