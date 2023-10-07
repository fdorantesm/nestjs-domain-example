import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { SeedsController } from './infrastructure/http/controllers/seed-loads.controller';
import { SeedLoadsRepository } from './infrastructure/store/repositories/seed-loads.memory.repository';
import { SeedLoadsService } from './infrastructure/store/services/seed-loads.service';
import { SEED_LOADS_SERVICE_TOKEN } from './domain/contracts/seed-loads.service';
import { SeedsConfig } from './application/config/seeds.config';
import { UseCases } from './application/use-cases';

@Module({
  imports: [ConfigModule.forFeature(SeedsConfig)],
  controllers: [SeedsController],
  providers: [
    ...UseCases,
    SeedLoadsRepository,
    {
      provide: SEED_LOADS_SERVICE_TOKEN,
      useClass: SeedLoadsService,
    },
  ],
})
export class SeedsModule {}
