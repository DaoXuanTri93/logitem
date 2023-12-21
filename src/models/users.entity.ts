import { Column, Entity, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Staff } from "./staff.entity";
import { EnterDistance } from "./enterDistance.entity";

@Entity()
export class Users {
  @PrimaryGeneratedColumn()
  id: string;

  @Column({ length: 500 })
  username: string;

  @Column()
  password: string;

  @Column({nullable: true})
  role: string;

  @Column({nullable: true})
  MAC: string;

  @OneToOne(() => Staff, (staff) => staff.userAccount)
  staff?: Staff

  @OneToMany(() => EnterDistance, (busSchedule) => busSchedule.userNameId)
  busSchedule?: EnterDistance
}
