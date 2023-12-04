import { faker } from "@faker-js/faker";
import { AlbumEntity } from "./album.entity";
import { FotoEntity } from "src/foto/foto.entity";
import { Test, TestingModule } from "@nestjs/testing";
import { TypeOrmTestingConfig } from "src/shared/testing-utils/typeorm-testing-config";
import { AlbumService } from "./album.service";
import { Repository } from "typeorm";
import { getRepositoryToken } from "@nestjs/typeorm";

describe('AlbumService', () => {
  let service: AlbumService;
  let repository: Repository<AlbumEntity>;
  let fotoRepository: Repository<FotoEntity>;
  let albumsList: AlbumEntity[];
  let foto: FotoEntity;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [...TypeOrmTestingConfig()],
      providers: [AlbumService],
    }).compile();

    service = module.get<AlbumService>(AlbumService);
    repository = module.get<Repository<AlbumEntity>>(
      getRepositoryToken(AlbumEntity),
    );
    fotoRepository = module.get<Repository<FotoEntity>>(
      getRepositoryToken(FotoEntity),
    );
    await seedDatabase();
  });

  const seedDatabase = async () => {
    repository.clear;
    fotoRepository.clear;
    albumsList = [];
    foto = null;
    for (let i = 0; i < 5; i++) {
      const album: AlbumEntity = await repository.save({
        fechaInicio: faker.date.past(),
        fechaFin: faker.date.future(),
        titulo: faker.lorem.word(),
        fotos: [],
      });
      albumsList.push(album);
    }
  };

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('Album created', async () => {
    const album: AlbumEntity = {
      id: '',fechaInicio: faker.date.past(),fechaFin: faker.date.future(),titulo: faker.lorem.word(),fotos: [],
    };

    const newAlbum: AlbumEntity = await service.createAlbum(album);
    expect(newAlbum).not.toBeNull();

    const storedAlbum: AlbumEntity = await repository.findOne({
      where: { id: newAlbum.id },
    });
    expect(storedAlbum).not.toBeNull();
    expect(storedAlbum.id).toEqual(newAlbum.id);
    expect(storedAlbum.fechaInicio).toEqual(newAlbum.fechaInicio);
    expect(storedAlbum.fechaFin).toEqual(newAlbum.fechaFin);
    expect(storedAlbum.titulo).toEqual(newAlbum.titulo);
  });

  it('Exception with invalid title', async () => {
    const album: AlbumEntity = {
      id: '',fechaInicio: faker.date.past(),fechaFin: faker.date.future(),titulo: '',fotos: [],
    };

    await expect(service.createAlbum(album)).rejects.toHaveProperty(
      'message', 'The album title can not be empty',
    );
  });

  it('Album returned by id', async () => {
    const storedAlbum: AlbumEntity = albumsList[0];
    const album: AlbumEntity = await service.findAlbumById(storedAlbum.id);
    expect(album).not.toBeNull();
    expect(album.id).toEqual(storedAlbum.id);
    expect(album.fechaInicio).toEqual(storedAlbum.fechaInicio);
    expect(album.fechaFin).toEqual(storedAlbum.fechaFin);
    expect(album.titulo).toEqual(storedAlbum.titulo);
  });

  it('Invalid album id', async () => {
    await expect(service.findAlbumById('0')).rejects.toHaveProperty(
      'message','The album with the given id was not found',
    );
  });

  it('Photo added to album', async () => {
    const album: AlbumEntity = albumsList[0];

    foto = await fotoRepository.save({
      iso: faker.number.int({ min: 100, max: 3250 }),velObturacion: faker.number.int({ min: 2, max: 126 }),apertura: faker.number.int({ min: 1, max: 15 }),fecha: faker.date.between({from: album.fechaInicio,to: album.fechaFin,
      }),
    });

    const response: boolean = await service.addPhotoToAlbum(foto.id, album.id);

    expect(!response);
  });

  it('Exception for invalid date', async () => {
    const album: AlbumEntity = albumsList[0];

    foto = await fotoRepository.save({
      iso: faker.number.int({ min: 100, max: 3250 }),
      velObturacion: faker.number.int({ min: 2, max: 126 }),
      apertura: faker.number.int({ min: 1, max: 15 }),
      fecha: faker.date.past({ years: 10, refDate: album.fechaInicio }),
    });

    await expect(
      service.addPhotoToAlbum(foto.id, album.id),
    ).rejects.toHaveProperty(
      'message','Foto date must be between album start and end date',
    );
  });

  it('Album removed', async () => {
    const album: AlbumEntity = albumsList[0];
    await service.deleteAlbum(album.id);
    const storedAlbum: AlbumEntity = await repository.findOne({
      where: { id: album.id },
    });
    expect(storedAlbum).toBeNull();
  });

  it('Exception for invalid album', async () => {
    await expect(() => service.deleteAlbum('0')).rejects.toHaveProperty(
      'message','The album with the given id was not found',
    );
  });

  it('Exception for album creation with one photo', async () => {
    const album: AlbumEntity = albumsList[0];

    foto = await fotoRepository.save({
      iso: faker.number.int({ min: 100, max: 3250 }),
      velObturacion: faker.number.int({ min: 2, max: 126 }),
      apertura: faker.number.int({ min: 1, max: 15 }),
      fecha: faker.date.between({
        from: album.fechaInicio,
        to: album.fechaFin,
      }),
    });

    await service.addPhotoToAlbum(foto.id, album.id);

    await expect(() => service.deleteAlbum(album.id)).rejects.toHaveProperty(
      'message','The album can not be deleted because it has associated fotos',
    );
  });
});