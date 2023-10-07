import { SeedLoadPayload } from './seed-load-payload.interface';

export interface SeedLoadReport extends SeedLoadPayload {
  adjust: number;
  total: number;
  value: number;
  factor: number;
}
