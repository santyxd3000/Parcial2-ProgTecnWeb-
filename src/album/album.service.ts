import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AlbumEntity } from './album.entity';
import { Repository } from 'typeorm';
import { BusinessError, BusinessLogicException } from 'src/shared/errors/business-errors';

@Injectable()
export class AlbumService {
    constructor(
        @InjectRepository(AlbumEntity)
        private readonly albumRepository: Repository<AlbumEntity>
    ){}

    async createAlbum(album: AlbumEntity): Promise<AlbumEntity> {
        if (!album.titulo)
        throw new BusinessLogicException("The title can't be empty", BusinessError.VALIDATION_FAILED);
        return await this.albumRepository.save(album);
    }

    async findUsuarioById(id: string): Promise<AlbumEntity> {
        const album: AlbumEntity = await this.albumRepository.findOne({where: {id}, relations: ["usuario","fotos"] } );
        if (!album)
          throw new BusinessLogicException("The album was not found", BusinessError.NOT_FOUND);
   
        return album;
    }

    async deleteAlbum(id: string) {
        const album: AlbumEntity = await this.albumRepository.findOne({where:{id}});
        if (!album)
          throw new BusinessLogicException("The album with the given id was not found", BusinessError.NOT_FOUND);
        
        if (album.fotos.length != 0)
        throw new BusinessLogicException("Can't delete album because it has photos", BusinessError.VALIDATION_FAILED);

        await this.albumRepository.remove(album);
    }
}
