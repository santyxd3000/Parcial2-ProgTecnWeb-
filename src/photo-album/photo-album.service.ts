import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AlbumEntity } from 'src/album/album.entity';
import { FotoEntity } from 'src/foto/foto.entity';
import { BusinessError, BusinessLogicException } from 'src/shared/errors/business-errors';
import { Repository } from 'typeorm';

@Injectable()
export class PhotoAlbumService {
    @InjectRepository(FotoEntity)
    private readonly fotoRepository: Repository<FotoEntity>,

    @InjectRepository(AlbumEntity)
    private readonly albumRepository: Repository<AlbumEntity>
    
    async addFotoAlbum(fotoId: string, albumId: string): Promise<AlbumEntity> {
        const foto: FotoEntity = await this.fotoRepository.findOne({where: {id: fotoId}});
        if (!foto)
          throw new BusinessLogicException("The foto with the given id was not found", BusinessError.NOT_FOUND);
    }

}


