import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class AlbumEntity {

    @PrimaryGeneratedColumn('uuid')
    id: string

    @Column()
    fechaInicio: Date

    @Column()
    fechaFin: Date

    @Column()
    titulo: String




}
