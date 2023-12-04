import { Test, TestingModule } from '@nestjs/testing';
import { UsuarioService } from './usuario.service';
import { Repository } from 'typeorm';
import { UsuarioEntity } from './usuario.entity';
import { TypeOrmTestingConfig } from 'src/shared/testing-utils/typeorm-testing-config';
import { getRepositoryToken } from '@nestjs/typeorm';
import { faker } from '@faker-js/faker';

describe('UsuarioService', () => {
  let service: UsuarioService;
  let repository: Repository<UsuarioEntity>;
  let usuariosList: UsuarioEntity[];

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [...TypeOrmTestingConfig()],
      providers: [UsuarioService],
    }).compile();

    service = module.get<UsuarioService>(UsuarioService);
    repository = module.get<Repository<UsuarioEntity>>(
      getRepositoryToken(UsuarioEntity),
    );
    await seedDatabase();
  });

  const seedDatabase = async () => {
    repository.clear();
    usuariosList = [];
    for (let i = 0; i < 5; i++) {
      const usuario: UsuarioEntity = await repository.save({
        nombre: faker.person.firstName(),
        telefono: faker.string.numeric(10),
      });
      usuariosList.push(usuario);
    }
  };

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('New usuario created', async () => {
    const usuario: UsuarioEntity = {
      id: '',
      nombre: faker.company.name(),
      telefono: faker.string.numeric(10),
      redSocial: null,
      fotos: [],
    };

    const newUsuario: UsuarioEntity = await service.createUsuario(usuario);
    expect(newUsuario).not.toBeNull();

    const storedUsuario: UsuarioEntity = await repository.findOne({
      where: { id: newUsuario.id },
    });
    expect(storedUsuario).not.toBeNull();
    expect(storedUsuario.id).toEqual(newUsuario.id);
    expect(storedUsuario.nombre).toEqual(newUsuario.nombre);
    expect(storedUsuario.telefono).toEqual(newUsuario.telefono);
  });

  it('createUsuario should throw an exception for a usuario with invalid telefono', async () => {
    const usuario: UsuarioEntity = {
      id: '',
      nombre: faker.company.name(),
      telefono: faker.string.numeric({ length: { min: 1, max: 9 } }),
      redSocial: null,
      fotos: [],
    };

    await expect(service.createUsuario(usuario)).rejects.toHaveProperty(
      'message',
      "Telefono must have exactly 10 characters",
    );
  });

  it('List of Usuario returned', async () => {
    const usuarios: UsuarioEntity[] = await service.findAllUsuarios();
    expect(usuarios).not.toBeNull();
    expect(usuarios).toHaveLength(usuariosList.length);
  });

  it('Returned usuario by id', async () => {
    const storedUsuario: UsuarioEntity = usuariosList[0];
    const usuario: UsuarioEntity = await service.findUsuariobyId(
      storedUsuario.id,
    );
    expect(usuario).not.toBeNull();
    expect(usuario.id).toEqual(storedUsuario.id);
    expect(usuario.nombre).toEqual(storedUsuario.nombre);
    expect(usuario.telefono).toEqual(storedUsuario.telefono);
  });

  it('Exception thrown for usuario', async () => {
    await expect(service.findUsuariobyId('0')).rejects.toHaveProperty(
      'message',
      'The usuario with the given id was not found',
    );
  });
});