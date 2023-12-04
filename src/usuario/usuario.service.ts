import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UsuarioEntity } from './usuario.entity';
import { Repository } from 'typeorm';
import { BusinessError, BusinessLogicException } from 'src/shared/errors/business-errors';

@Injectable()
export class UsuarioService {
    constructor(
        @InjectRepository(UsuarioEntity)
        private readonly usuarioRepository: Repository<UsuarioEntity>
        ){}


        async createUsuario(usuario: UsuarioEntity): Promise<UsuarioEntity> {
        if (usuario.telefono.length != 10){
            throw new BusinessLogicException("The telephone can't have more or less than 10 characters", BusinessError.VALIDATION_FAILED);
        }
            return await this.usuarioRepository.save(usuario);}
    

        async findUsuariobyId(id: string): Promise<UsuarioEntity> {
                const usuario: UsuarioEntity = await this.usuarioRepository.findOne({where: {id}, relations: ["redSocial","fotos"] } );
                if (!usuario)
                  throw new BusinessLogicException("The user with the given id was not found", BusinessError.NOT_FOUND);
           
                return usuario;
        }

        async findAllUsuarios(): Promise<UsuarioEntity[]> {
            return await this.usuarioRepository.find({ relations: ["redSocial","fotos"] });
        }
}
