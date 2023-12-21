import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm"
import { Staff } from "./staff.entity"
import { BaseEntity } from "./base"
import { Status } from "src/enum/status.enum"

@Entity()
export class MissionRegistation extends BaseEntity{
    @PrimaryGeneratedColumn()
    id : string

    @ManyToOne(() => Staff, (staff) => staff.mission,{eager: true})
    @JoinColumn()
    staff: Staff

    @Column()
    userName: string

    @Column({nullable: true})
    startDay: string

    @Column({nullable: true})
    endDay: string

    @Column({default: Status.WAITINGCONFIRM})
    statusMission: Status

}