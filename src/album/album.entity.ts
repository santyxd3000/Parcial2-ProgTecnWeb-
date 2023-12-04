import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { FotoEntity } from "src/foto/foto.entity";

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

    @OneToMany(() => FotoEntity, foto => foto.album)
    fotos: FotoEntity[];

}
