import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm"
import { Staff } from "./staff.entity"
import { OfficeDTO } from "src/office/office.dto"
import { Office } from "./office.entity"


@Entity()
export class Area{

    @PrimaryGeneratedColumn()
    id: string

    @Column({ nullable: true })
    areaName : string

    @Column({ nullable: true })
    address : string

    @Column({ nullable: true })
    telephoneNumber : string

    @Column({ nullable: true })
    manager : string

    @Column({ nullable: true })
    coordinate : string

    @Column({ nullable: true })
    engravingRangeRadius : string
    
    @OneToMany(() => Office, (office) => office.area)
    office: Office

    @OneToMany(() => Staff, (staff) => staff.area)
    staff: Staff

}