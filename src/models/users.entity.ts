import { Column, Entity, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Staff } from "./staff.entity";
import { Role } from "src/enum/role.enum";
import { EnterDistance } from "./enterDistance.entity";
import { SearchUserDTO } from "src/users/users.dto";
@Entity()
export class Users {
  @PrimaryGeneratedColumn()
  id: string;

  @Column({ length: 500 })
  username: string;

  @Column()
  password: string;

  @Column({ nullable: true })
  role: Role;

  @Column({ nullable: true })
  MAC: string;

  @OneToOne(() => Staff, (staff) => staff.userAccount)
  staff?: Staff

  @OneToMany(() => EnterDistance, (busSchedule) => busSchedule.userNameId)
  busSchedule?: EnterDistance


  converUsersToSearchDTO(): SearchUserDTO {
    let searchUserDTO = new SearchUserDTO();

    searchUserDTO.id = this.id
    searchUserDTO.role = this.role
    searchUserDTO.username = this.username

    return searchUserDTO
  }
}
