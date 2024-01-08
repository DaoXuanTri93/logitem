import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm"
import { Staff } from "./staff.entity"
import { BaseEntity } from "./base"
import { Role } from "src/enum/role.enum"
import { StampApproval } from "./stampApproval.entity"
import { Status } from "src/enum/status.enum"
import { LogApprovalDTO } from "src/logapproval/logapprovalDTO"

@Entity()
export class LogApproval extends BaseEntity{
    @PrimaryGeneratedColumn()
    id : string

    @ManyToOne(() => Staff, (staff) => staff.logApproval,{eager: true})
    @JoinColumn()
    staff: Staff

    @ManyToOne(() => StampApproval, (stampApproval) => stampApproval.logApproval,{eager: true})
    @JoinColumn()
    stampApproval: StampApproval

    @Column()
    status: Status

    @Column()
    officeName: string

    @Column({nullable: true})
    approvalDay: string

    @Column({nullable: true})
    hourApproval: string


    convertLogApproval():LogApprovalDTO{
        let logApprovalDTO = new LogApprovalDTO();
        logApprovalDTO.stampApprovalId = this.stampApproval.stampApprovalId;
        logApprovalDTO.id = this.id
        logApprovalDTO.officeName = this.officeName
        logApprovalDTO.approvalDay =this.approvalDay
        logApprovalDTO.operatorName = this.staff.userName
        logApprovalDTO.role = this.staff.userAccount.role
        logApprovalDTO.status = this.status
        logApprovalDTO.hourApproval = this.hourApproval
        return logApprovalDTO;
    }
}