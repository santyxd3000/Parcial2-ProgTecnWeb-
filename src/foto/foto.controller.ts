import { Body, Controller, Delete, Get, HttpCode, Param, Post, UseInterceptors } from '@nestjs/common';
import { BusinessErrorsInterceptor } from 'src/shared/interceptors/business-errors/business-errors.interceptor';
import { FotoService } from './foto.service';
import { FotoDto } from './foto.dto';
import { FotoEntity } from './foto.entity';
import { plainToInstance } from 'class-transformer';

@Controller('fotos')
@UseInterceptors(BusinessErrorsInterceptor)
export class FotoController {
  constructor(private readonly fotoService: FotoService) {}

  @Post()
  async createFoto(@Body() fotoDto: FotoDto) {
    const foto: FotoEntity = plainToInstance(FotoEntity, fotoDto);
    return await this.fotoService.createFoto(foto);
  }

  @Get(':fotoId')
  async findFotoById(@Param('fotoId') fotoId: string) {
    return await this.fotoService.findFotoById(fotoId);
  }

  @Get()
  async findAllFotos() {
    return await this.fotoService.findAllPhotos();
  }

  @Delete(':fotoId')
  @HttpCode(204)
  async deleteFoto(@Param('fotoId') fotoId: string) {
    return await this.fotoService.deleteFoto(fotoId);
  }
}
