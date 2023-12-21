import { Staff } from 'src/models/staff.entity';
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm"
@Entity()
export class TimeKeeping {
    @PrimaryGeneratedColumn()
    id : string

    @ManyToOne(() => Staff, (staff) => staff.timeKeeping)
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

    @Column()
    dayTimeKeeping: string
}