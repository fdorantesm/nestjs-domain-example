import { SeedLoadEntity } from '../entities/seed-load.entity';
import { SeedLoad } from '../interfaces/seed-load.interface';

export const SEED_LOADS_SERVICE_TOKEN = Symbol('SEED_LOADS_SERVICE_TOKEN');

export interface SeedLoadsService {
  bulkInsert(payload: SeedLoad[]): Promise<SeedLoadEntity[]>;
  find(): Promise<SeedLoadEntity[]>;
}
