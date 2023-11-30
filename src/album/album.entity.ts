import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { UsuarioEntity } from "src/usuario/usuario.entity";
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


    @ManyToOne(() => UsuarioEntity, usuario => usuario.albums)
    usuario: UsuarioEntity;

    @OneToMany(() => FotoEntity, foto => foto.album)
    fotos: FotoEntity[];

}
