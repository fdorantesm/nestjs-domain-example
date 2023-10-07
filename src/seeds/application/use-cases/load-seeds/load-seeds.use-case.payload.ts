import { SeedLoad } from 'src/seeds/domain/interfaces/seed-load.interface';
import { SeedLoadPayload } from '../../types/seed-load-payload.type';

export type LoadSeedsUseCasePayload = {
  loads: SeedLoad[];
};
