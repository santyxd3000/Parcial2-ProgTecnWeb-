import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class RedSocialEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string

    @Column()
    nombre: string

    @Column()
    slogan: string


}
