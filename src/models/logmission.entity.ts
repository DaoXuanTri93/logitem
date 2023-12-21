import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm"
import { Staff } from "./staff.entity"
import { BaseEntity } from "./base"
import { Status } from "src/enum/status.enum"

@Entity()
export class LogMission extends BaseEntity{
    @PrimaryGeneratedColumn()
    id : string

    @Column()
    staffId: String

    @Column({unique:true})
    missionId: String

    @Column()
    userName: string

    @Column()
    startDay: string

    @Column()
    endDay: string

}