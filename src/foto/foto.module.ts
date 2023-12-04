import { Module } from '@nestjs/common';
import { FotoService } from './foto.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FotoEntity } from './foto.entity';
import { AlbumEntity } from 'src/album/album.entity';
import { FotoController } from './foto.controller';

@Module({
  imports: [TypeOrmModule.forFeature([FotoEntity,AlbumEntity])],
  providers: [FotoService],
  controllers: [FotoController]
})
export class FotoModule {}
