import { AlbumEntity } from "src/album/album.entity";
import { RedSocialEntity } from "src/red-social/red-social.entity";
import internal from "stream";
import { Entity, PrimaryGeneratedColumn,Column, IntegerType, ManyToOne } from "typeorm";

@Entity()
export class FotoEntity {
    
    @Column()
    iso: number

    @Column()
    velObturacion: number

    @Column()
    apertura: number

    @PrimaryGeneratedColumn('uuid')
    id: string

    @ManyToOne(() => RedSocialEntity, redSocial => redSocial.fotos)
    redSocial: RedSocialEntity;

    @ManyToOne(() => AlbumEntity, album => album.fotos)
    album: AlbumEntity;
}
