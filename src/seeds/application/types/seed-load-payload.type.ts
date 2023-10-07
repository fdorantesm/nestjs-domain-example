import { SeedLoad } from 'src/seeds/domain/interfaces/seed-load.interface';

export type SeedLoadPayload = Pick<SeedLoad, 'id' | 'quantity'> & {
  moisture: number;
};
