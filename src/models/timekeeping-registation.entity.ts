import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm"
import { Staff } from "./staff.entity"
import { BaseEntity } from "./base"

@Entity()
export class TimekeepingRegistation extends BaseEntity{
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

    @Column({default: false})
    mission: boolean

    @Column({unique:true})
    dayTimeKeeping: String
}