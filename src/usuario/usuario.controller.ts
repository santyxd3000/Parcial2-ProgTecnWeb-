import { Body, Controller, Get, Param, Post, UseInterceptors } from '@nestjs/common';
import { BusinessErrorsInterceptor } from 'src/shared/interceptors/business-errors/business-errors.interceptor';
import { UsuarioService } from './usuario.service';
import { UsuarioDto } from './usuario.dto';
import { UsuarioEntity } from './usuario.entity';
import { plainToInstance } from 'class-transformer';

@Controller('usuarios')
@UseInterceptors(BusinessErrorsInterceptor)
export class UsuarioController {
  constructor(private readonly usuarioService: UsuarioService) {}

  @Post()
  async createUsuario(@Body() usuarioDto: UsuarioDto) {
    const usuario: UsuarioEntity = plainToInstance(UsuarioEntity, usuarioDto);
    return await this.usuarioService.createUsuario(usuario);
  }

  @Get()
  async findAllUsuarios() {
    return await this.usuarioService.findAllUsuarios();
  }

  @Get(':usuarioId')
  async findUsuarioById(@Param('usuarioId') usuarioId: string) {
    return await this.usuarioService.findUsuariobyId(usuarioId);
  }
}
