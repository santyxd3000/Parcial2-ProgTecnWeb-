import { Test, TestingModule } from '@nestjs/testing';
import { FotoService } from './foto.service';
import { Repository } from 'typeorm';
import { FotoEntity } from './foto.entity';
import { TypeOrmTestingConfig } from 'src/shared/testing-utils/typeorm-testing-config';
import { getRepositoryToken } from '@nestjs/typeorm';
import { faker } from '@faker-js/faker';

describe('FotoService', () => {
  let service: FotoService;
  let repository: Repository<FotoEntity>;
  let fotosList: FotoEntity[];

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [...TypeOrmTestingConfig()],
      providers: [FotoService],
    }).compile();

    service = module.get<FotoService>(FotoService);
    repository = module.get<Repository<FotoEntity>>(
      getRepositoryToken(FotoEntity),
    );
    await seedDatabase();
  });

  const seedDatabase = async () => {
    repository.clear();
    fotosList = [];
    for (let i = 0; i < 5; i++) {
      const foto: FotoEntity = await repository.save({
        iso: faker.number.int({ min: 100, max: 3250 }),
        velObturacion: faker.number.int({ min: 2, max: 126 }),
        apertura: faker.number.int({ min: 1, max: 15 }),
        fecha: faker.date.past(),
      });
      fotosList.push(foto);
    }
  };

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('findAllFotos should return a list of fotos', async () => {
    const fotos: FotoEntity[] = await service.findAllPhotos();
    expect(fotos).not.toBeNull();
    expect(fotos).toHaveLength(fotosList.length);
  });

  it('findFotoById should return a foto by id', async () => {
    const storedFoto: FotoEntity = fotosList[0];
    const foto: FotoEntity = await service.findFotoById(storedFoto.id);
    expect(foto).not.toBeNull();
    expect(foto.id).toEqual(storedFoto.id);
    expect(foto.iso).toEqual(storedFoto.iso);
    expect(foto.velObturacion).toEqual(storedFoto.velObturacion);
    expect(foto.apertura).toEqual(storedFoto.apertura);
    expect(foto.fecha).toEqual(storedFoto.fecha);
  });

  it('Exception for invalid photo', async () => {
    await expect(service.findFotoById('0')).rejects.toHaveProperty(
      'message',
      'The foto with the given id was not found',
    );
  });

  it('createFoto should return a new foto', async () => {
    const foto: FotoEntity = {
      id: '',iso: faker.number.int({ min: 100, max: 3250 }),velObturacion: faker.number.int({ min: 2, max: 126 }),apertura: faker.number.int({ min: 1, max: 15 }),fecha: faker.date.past(),usuario: null,album: null,
    };

    const newFoto: FotoEntity = await service.createFoto(foto);
    expect(newFoto).not.toBeNull();

    const storedFoto: FotoEntity = await repository.findOne({
      where: { id: newFoto.id },
    });
    expect(storedFoto).not.toBeNull();
    expect(storedFoto.iso).toEqual(newFoto.iso);
    expect(storedFoto.velObturacion).toEqual(newFoto.velObturacion);
    expect(storedFoto.apertura).toEqual(newFoto.apertura);
    expect(storedFoto.fecha).toEqual(newFoto.fecha);
  });

  it('Exception for invalid iso', async () => {
    const foto: FotoEntity = {
      id: '',iso: 50,velObturacion: faker.number.int({ min: 2, max: 126 }),apertura: faker.number.int({ min: 1, max: 15 }),fecha: faker.date.past(),usuario: null,album: null,
    };

    await expect(service.createFoto(foto)).rejects.toHaveProperty(
      'message',
      'Invalid ISO',
    );
  });

  it('Exception for valObturacion', async () => {
    const foto: FotoEntity = {
      id: '',
      iso: faker.number.int({ min: 100, max: 3250 }),
      velObturacion: 500,
      apertura: faker.number.int({ min: 1, max: 15 }),
      fecha: faker.date.past(),
      usuario: null,
      album: null,
    };

    await expect(service.createFoto(foto)).rejects.toHaveProperty(
      'message','Invalid velObturacion',
    );
  });

  it('Exception for invalid apertura', async () => {
    const foto: FotoEntity = {
      id: '',
      iso: faker.number.int({ min: 100, max: 3250 }),
      velObturacion: faker.number.int({ min: 2, max: 126 }),
      apertura: 50,
      fecha: faker.date.past(),
      usuario: null,
      album: null,
    };

    await expect(service.createFoto(foto)).rejects.toHaveProperty(
      'message','Invalid apertura',
    );
  });

  it('Exception for invalid parameters', async () => {
    const foto: FotoEntity = {
      id: '',iso: 3500,velObturacion: 150,apertura: 18,fecha: faker.date.past(),usuario: null,album: null,
    };

    await expect(service.createFoto(foto)).rejects.toHaveProperty(
      'message',
      'Máximo 2 valores deben estar por encima del valor medio de sus cotas',
    );
  });

  it('deleteFoto should remove a foto', async () => {
    const foto: FotoEntity = fotosList[0];
    await service.deleteFoto(foto.id);
    const storedFoto: FotoEntity = await repository.findOne({
      where: { id: foto.id },
    });
    expect(storedFoto).toBeNull();
  });

  it('Exception for invalid photo', async () => {
    await expect(() => service.deleteFoto('0')).rejects.toHaveProperty(
      'message',
      'The foto with the given id was not found',
    );
  });
});
