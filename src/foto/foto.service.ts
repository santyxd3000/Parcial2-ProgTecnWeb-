import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FotoEntity } from './foto.entity';
import { Repository } from 'typeorm';
import { BusinessError, BusinessLogicException } from 'src/shared/errors/business-errors';
import { AlbumEntity } from 'src/album/album.entity';

@Injectable()
export class FotoService {
    constructor(
        @InjectRepository(FotoEntity)
        private readonly fotoRepository: Repository<FotoEntity>,
        @InjectRepository(AlbumEntity)
        private readonly albumRepository: Repository<AlbumEntity>,
        ){}

        async createFoto(foto: FotoEntity): Promise<FotoEntity> {
            if (foto.iso < 100 || foto.iso > 6400) {
              throw new BusinessLogicException('Invalid ISO',BusinessError.VALIDATION_FAILED,
              );
            }
            if (foto.velObturacion < 2 || foto.velObturacion > 250) {
              throw new BusinessLogicException('Invalid velObturacion',BusinessError.VALIDATION_FAILED,);
            }
        
            if (foto.apertura < 1 || foto.apertura > 32) {
              throw new BusinessLogicException('Invalid apertura',BusinessError.VALIDATION_FAILED,
              );
            }
        
            const avgISO = (100 + 6400) / 2;
            const avgVelObturacion = (2 + 250) / 2;
            const avgApertura = (1 + 32) / 2;
        
            let above = 0;
        
            if (foto.iso > avgISO) {
              above++;
            }
        
            if (foto.velObturacion > avgVelObturacion) {
              above++;
            }
        
            if (foto.apertura > avgApertura) {
              above++;
            }
        
            if (above > 2) {
              throw new BusinessLogicException('Only two values can be above their mean',BusinessError.VALIDATION_FAILED,
              );
            }
        
            return await this.fotoRepository.save(foto);
          }

        async findFotoById(id: string): Promise<FotoEntity> {
            const foto: FotoEntity = await this.fotoRepository.findOne({where: {id}, relations: ["usuario","album"] } );
            if (!foto)
              throw new BusinessLogicException("The photo with the given id was not found", BusinessError.NOT_FOUND);
       
            return foto;
        }

        async findAllPhotos(): Promise<FotoEntity[]> {
            return await this.fotoRepository.find({ relations: ["usuario","album"] });
        }

        async deleteFoto(id: string) {
            const foto: FotoEntity = await this.fotoRepository.findOne({where: { id },relations: ['album'],});
            if (!foto)
              throw new BusinessLogicException('The photo with the given id was not found',BusinessError.NOT_FOUND,);
            const album: AlbumEntity | undefined = foto.album;

            await this.fotoRepository.remove(foto);
        
            if (album) {
              const withPhotos = await this.albumRepository.findOne({where: { id: album.id },relations: ['fotos'],
              });
        
              if (withPhotos && withPhotos.fotos.length === 0) {
                await this.albumRepository.remove(withPhotos);
              }}}
}
