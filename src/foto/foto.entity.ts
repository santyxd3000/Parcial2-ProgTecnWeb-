import { AlbumEntity } from "src/album/album.entity";
import { UsuarioEntity } from "src/usuario/usuario.entity";
import { Entity, PrimaryGeneratedColumn,Column, IntegerType, ManyToOne } from "typeorm";

@Entity()
export class FotoEntity {
    
    @Column()
    iso: number

    @Column()
    velObturacion: number

    @Column()
    apertura: number

    @Column()
    fecha: Date

    @PrimaryGeneratedColumn('uuid')
    id: string

    @ManyToOne(() => UsuarioEntity, usuario => usuario.fotos)
    usuario: UsuarioEntity;

    @ManyToOne(() => AlbumEntity, album => album.fotos)
    album: AlbumEntity;
}
