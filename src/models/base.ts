import { Column, CreateDateColumn, DeleteDateColumn, Entity, UpdateDateColumn } from "typeorm";


@Entity()
export class BaseEntity{
    
    @CreateDateColumn({ nullable: true })
    creatAt: Date
    
    @UpdateDateColumn({ nullable: true })
    updateAt: Date

    @DeleteDateColumn({ nullable: true })
    deleteAt: Date
}