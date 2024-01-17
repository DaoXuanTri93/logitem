import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm"
import { Staff } from "./staff.entity"
import { OfficeDTO } from "src/office/office.dto"
import { Area } from "./area.entity"


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

    @ManyToOne(() => Area, (area) => area.office,{eager: true})
    @JoinColumn()
    area: Area

    @OneToMany(() => Staff, (staff) => staff.affiliatedOffice)
    staff?: Staff

    convertOfficeToDTO():OfficeDTO{
        let officeDTO = new OfficeDTO();
        officeDTO.officeId = this.officeId
        officeDTO.coordinate = this.coordinate
        return officeDTO
    }

    convertOfficeByStaffToDTO():OfficeDTO{
        let officeDTO = new OfficeDTO();
        officeDTO.officeId = this.officeId
        officeDTO.baseName = this.baseName
        return officeDTO
    }
    convertOfficeDTO():OfficeDTO{
        let officedto = new OfficeDTO();
        officedto.officeId = this.officeId;
        officedto.baseName = this.baseName;
        officedto.address = this.address;
        officedto.telephoneNumber = this.telephoneNumber;
        officedto.manager = this.baseName;
        officedto.driverInformation = this.driverInformation;
        officedto.drivingRoute = this.drivingRoute;
        officedto.vehicleInformation = this.vehicleInformation;
        officedto.drivingSchedule = this.drivingSchedule
        officedto.coordinate = this.coordinate
        return officedto;
    }

}