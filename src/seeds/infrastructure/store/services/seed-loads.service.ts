import { Injectable } from '@nestjs/common';
import { SeedLoadsRepository } from '../repositories/seed-loads.memory.repository';
import { SeedLoad } from 'src/seeds/domain/interfaces/seed-load.interface';

@Injectable()
export class SeedLoadsService {
  constructor(private readonly moistureRepository: SeedLoadsRepository) {}

  public bulkInsert(payload: SeedLoad[]) {
    return this.moistureRepository.bulkInsert(payload);
  }

  public find() {
    return this.moistureRepository.find();
  }
}
