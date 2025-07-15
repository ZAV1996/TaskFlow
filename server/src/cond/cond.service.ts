import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Cond } from './entities/cond.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { InputID } from 'src/workflow/inputs/create.input';
import { CreateOrUpdateCondInput } from './inputs/createOrUpdate.input';

@Injectable()
export class CondService {
    constructor(@InjectRepository(Cond) private condRepo: Repository<Cond>) { }

    async getAllConds() {
        return await this.condRepo.find()
    }
    
    async getCondByID({ ID }: InputID) {
        return await this.condRepo.findOneBy({ ID })
    }

    async createOrUpdateCond(input: CreateOrUpdateCondInput) {
        return await this.condRepo.save(input)
    }

    async deleteCond({ ID }: InputID) {
        return (await this.condRepo.delete({ ID })).raw
    }
}
