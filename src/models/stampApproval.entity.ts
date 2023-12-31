import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm"
import { Staff } from "./staff.entity"
import { StampApprovalDTO } from "src/stampApproval/stampApproval.dto"
import { LogApproval } from "./timekeeping-registation.entity"
import { Status } from "src/enum/status.enum"


@Entity()
export class StampApproval {
    @PrimaryGeneratedColumn()
    stampApprovalId : string

    @ManyToOne(() => Staff, (staff) => staff.stampApproval,{eager: true})
    @JoinColumn()
    staff: Staff

    @Column()
    officeName: string

    @Column()
    driverName: string

    @Column()
    submissionDate: string

    @Column({default: false})
    approval: boolean

    @Column({nullable: true})
    approvalDate: String

    @Column()
    stampingBeforeCorrection: string // ngay truoc

    @Column()
    stampingAfterCorrection: string // ngay sau

    @Column({default: Status.PENDING})
    status: Status

    @Column({nullable: true})
    reason: string

    @OneToMany(()=> LogApproval, (logApproval) => logApproval.stampApproval)
    logApproval: LogApproval

    convertStampApproval():StampApprovalDTO{
        let stampApprovalDTO = new StampApprovalDTO();
        stampApprovalDTO.stampApprovalId = this.stampApprovalId;
        stampApprovalDTO.staff = this.staff.staffId;
        stampApprovalDTO.approval = this.approval;
        stampApprovalDTO.officeName = this.officeName;
        stampApprovalDTO.driverName = this.driverName;
        stampApprovalDTO.submissionDate = this.submissionDate;
        stampApprovalDTO.approvalDate = this.approvalDate;
        stampApprovalDTO.stampingBeforeCorrection = this.stampingBeforeCorrection;
        stampApprovalDTO.stampingAfterCorrection = this.stampingAfterCorrection;
        stampApprovalDTO.status = this.status;
        stampApprovalDTO.reason = this.reason;
        return stampApprovalDTO;
    }
}