import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FotoEntity } from './foto.entity';
import { Repository } from 'typeorm';
import { BusinessError, BusinessLogicException } from 'src/shared/errors/business-errors';

@Injectable()
export class FotoService {
    constructor(
        @InjectRepository(FotoEntity)
        private readonly fotoRepository: Repository<FotoEntity>
        ){}

        async create(foto: FotoEntity): Promise<FotoEntity> {
            if (foto.iso > 6400 || foto.iso < 100)
            throw new BusinessLogicException("No ISO validation conditions", BusinessError.VALIDATION_FAILED);
            if (foto.velObturacion > 250 || foto.iso < 2)
            throw new BusinessLogicException("No valObturacion validation conditions", BusinessError.VALIDATION_FAILED);
            if (foto.apertura > 32 || foto.apertura < 1)
            throw new BusinessLogicException("No aperturavalidation conditions", BusinessError.VALIDATION_FAILED);

            return await this.fotoRepository.save(foto);
        }

        async findFotoById(id: string): Promise<FotoEntity> {
            const foto: FotoEntity = await this.fotoRepository.findOne({where: {id}, relations: ["redSocial","album"] } );
            if (!foto)
              throw new BusinessLogicException("The photo with the given id was not found", BusinessError.NOT_FOUND);
       
            return foto;
        }

        async findAllPhotos(): Promise<FotoEntity[]> {
            return await this.fotoRepository.find({ relations: ["redSocial","album"] });
        }

        async deleteFoto(id: string) {
            const foto: FotoEntity = await this.fotoRepository.findOne({where:{id}});
            if (!foto)
              throw new BusinessLogicException("The photo with the given id was not found", BusinessError.NOT_FOUND);
         
            await this.fotoRepository.remove(foto);
        }

}
