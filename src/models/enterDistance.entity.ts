import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm"
import { Users } from "./users.entity"
import { EnterDistanceDTO, EnterDistanceImageDTO } from "src/EnterDistance/enterDistance.dto"

@Entity()
export class EnterDistance {
    @PrimaryGeneratedColumn()
    id : string

    @ManyToOne(() => Users, (userNameId) => userNameId.busSchedule,{eager: true})
    @JoinColumn()
    userNameId: Users

    @Column({nullable: true})
    startingPoint: number

    @Column({nullable: true})
    firstKilometerPhoto: string

    @Column({nullable: true})
    endPoint: number 

    @Column({nullable: true})
    lastKilometerPhoto: string 

    @Column({nullable: true})
    totalDistance: number

    @Column({nullable: true})
    runningDay: string

    convertEnterDistance():EnterDistanceDTO{
        let enterDistanceDTO = new EnterDistanceDTO();
        enterDistanceDTO.userNameId = this.userNameId.id
        enterDistanceDTO.firstKilometerPhoto = this.firstKilometerPhoto
        enterDistanceDTO.endPoint = this.endPoint
        enterDistanceDTO.lastKilometerPhoto = this.lastKilometerPhoto
        enterDistanceDTO.totalDistance = this.totalDistance
        enterDistanceDTO.runningDay = this.runningDay
        return enterDistanceDTO
    }

    converDistanceImage():EnterDistanceImageDTO{
        let enterDistanceImageDTO = new EnterDistanceImageDTO();
        enterDistanceImageDTO.firstKilometerPhoto = this.firstKilometerPhoto
        enterDistanceImageDTO.lastKilometerPhoto = this.lastKilometerPhoto
        return enterDistanceImageDTO
    }
}