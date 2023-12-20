import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm"
import { Staff } from "./staff.entity"
import { OfficeUserDTO } from "src/office/office.dto"

@Entity()
export class Office{

    @PrimaryGeneratedColumn()
    officeId: string

    @Column({ nullable: true })
    baseName : string

    @Column({ nullable: true })
    basePhoto : string

    @Column({ nullable: true })
    address : string

    @Column({ nullable: true })
    telephoneNumber : string

    @Column({ nullable: true })
    manager : string

    @Column({ nullable: true })
    driverInformation : string

    @Column({ nullable: true })
    drivingRoute : string

    @Column({ nullable: true })
    vehicleInformation : string

    @Column({ nullable: true })
    drivingSchedule : string

    @Column({ nullable: true })
    detailedInformation : string

    @Column({ nullable: true })
    coordinate : string

    @Column({ nullable: true })
    engravingRangeRadius : string

    @OneToMany(() => Staff, (listStaff) => listStaff.affiliatedOffice)
    listStaff?: Staff[]


    converOfficeToDTO(): OfficeUserDTO{
        let officeUsersDTO = new OfficeUserDTO() ;
        
        officeUsersDTO.id = this.officeId
        officeUsersDTO.baseName = this.baseName
         return officeUsersDTO
     }
}