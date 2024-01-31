import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm"
import { Staff } from "./staff.entity"
import { Users } from "./users.entity"
import { PermissionDTO } from "src/staff/permission.dto"


@Entity()
export class Permission {
    @PrimaryGeneratedColumn()
    Id: string

    @ManyToOne(() => Staff, (staff) => staff.permission, { eager: true })
    @JoinColumn()
    staff: Staff

    @Column("simple-array", { nullable: true })
    editUsers: []

    @Column("simple-array", { nullable: true })
    approveUsers: []

    @Column({ default: false })
    multiEdit: boolean

    @Column({ default: false })
    edit: boolean

    @Column({ default: false })
    multiapproved: boolean

    @Column({ default: false })
    authoritiesApproved: boolean

    converDriverToDTO(): PermissionDTO{
        let permissionDTO = new PermissionDTO()
        permissionDTO.userAccount = this.staff.userAccount.username
        permissionDTO.userName = this.staff.userName
        permissionDTO.edit=this.edit
        permissionDTO.approve=this.authoritiesApproved
        permissionDTO.multiedit=this.multiEdit
        permissionDTO.multiapprove=this.multiapproved
         return permissionDTO
     }

}