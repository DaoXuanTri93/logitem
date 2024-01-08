import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm"
import { Staff } from "./staff.entity"
import { BaseEntity } from "./base"
import { Status } from "src/enum/status.enum"
import { MissionDTO } from "src/mission/mission.dto"

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

    convertMissionDTO():MissionDTO{
        let missionDTO = new MissionDTO();
        missionDTO.userName = this.userName
        missionDTO.id = this.id
        missionDTO.endDay =this.endDay;
        missionDTO.startDay = this.startDay
        missionDTO.statusMission = this.statusMission
        return missionDTO
    }
}