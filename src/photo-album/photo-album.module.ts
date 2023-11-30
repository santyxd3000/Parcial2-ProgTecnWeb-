import { Module } from '@nestjs/common';
import { PhotoAlbumService } from './photo-album.service';

@Module({
  providers: [PhotoAlbumService]
})
export class PhotoAlbumModule {}
