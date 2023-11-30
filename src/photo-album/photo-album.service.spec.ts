import { Test, TestingModule } from '@nestjs/testing';
import { PhotoAlbumService } from './photo-album.service';

describe('PhotoAlbumService', () => {
  let service: PhotoAlbumService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PhotoAlbumService],
    }).compile();

    service = module.get<PhotoAlbumService>(PhotoAlbumService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
