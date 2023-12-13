import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm"
import { Staff } from "./staff.entity"

@Entity()
export class StampApproval {
    @PrimaryGeneratedColumn()
    stampApprovalId : string

    @ManyToOne(() => Staff, (staff) => staff.stampApproval)
    @JoinColumn()
    staff: string

    @Column()
    driverName: string

    @Column()
    applicationDateAndTime: string

    @Column()
    approval: string

    @Column()
    stampingBeforeCorrection: string // ngay truoc

    @Column()
    stampingAfterCorrection: string // ngay sau

    @Column()
    reason: string
}