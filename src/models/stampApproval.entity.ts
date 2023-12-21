import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm"
import { Staff } from "./staff.entity"
import { StampApprovalDTO } from "src/stampApproval/stampApproval.dto"


@Entity()
export class StampApproval {
    @PrimaryGeneratedColumn()
    stampApprovalId : string

    @ManyToOne(() => Staff, (staff) => staff.stampApproval,{eager: true})
    @JoinColumn()
    staff: Staff

    @Column({nullable: true})
    officeName: string

    @Column({nullable: true})
    driverName: string

    @Column({nullable: true})
    submissionDate: string

    @Column({nullable: true})
    approval: boolean

    @Column({nullable: true})
    approvalDate: String

    @Column({nullable: true})
    stampingBeforeCorrection: string // ngay truoc

    @Column({nullable: true})
    stampingAfterCorrection: string // ngay sau

    @Column({nullable: true})
    reason: string

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
        stampApprovalDTO.reason = this.reason
        return stampApprovalDTO;
    }
}