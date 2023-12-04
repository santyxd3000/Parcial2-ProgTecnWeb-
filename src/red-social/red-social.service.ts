import { Injectable } from '@nestjs/common';
import { RedSocialEntity } from './red-social.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BusinessError, BusinessLogicException } from 'src/shared/errors/business-errors';

@Injectable()
export class RedSocialService {
    constructor(
        @InjectRepository(RedSocialEntity)
        private readonly redSocialRepository: Repository<RedSocialEntity>
        ){}

        async createLibreria(redSocial: RedSocialEntity): Promise<RedSocialEntity> {
            if (redSocial.slogan.length == 0 || redSocial.slogan.length > 20){
                throw new BusinessLogicException("Conditions not validated", BusinessError.VALIDATION_FAILED);
            }
            return await this.redSocialRepository.save(redSocial);
        }



}
