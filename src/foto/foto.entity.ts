import internal from "stream";
import { Entity, PrimaryGeneratedColumn,Column, IntegerType } from "typeorm";

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
}
