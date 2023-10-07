import { Inject, Injectable, Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { SeedLoadEntity } from 'src/seeds/domain/entities/seed-load.entity';
import { SeedLoadPayload } from '../../types/seed-load-payload.type';
import {
  SEED_LOADS_SERVICE_TOKEN,
  SeedLoadsService,
} from 'src/seeds/domain/contracts/seed-loads.service';

@Injectable()
export class LoadSeedsUseCase {
  constructor(
    private readonly configService: ConfigService,
    @Inject(SEED_LOADS_SERVICE_TOKEN)
    private readonly seedLoadsService: SeedLoadsService,
  ) {}

  public async run(loads: SeedLoadPayload[]) {
    const cornPrice = this.configService.get<number>('seeds.cornPrice');
    const seedLoadsReport = loads.map((load) => {
      const factor = SeedLoadEntity.calculateFactor(load.moisture);
      const loadEntity = SeedLoadEntity.initialize(load);
      loadEntity.setPrice(cornPrice);
      loadEntity.setFactor(factor);
      return loadEntity.toJson();
    });

    await this.seedLoadsService.bulkInsert(seedLoadsReport);

    const rows = await this.seedLoadsService.find();

    const data = rows.map((row) => {
      row.setPrice(cornPrice);
      return row.toReport();
    });

    return { loads: data };
  }
}
