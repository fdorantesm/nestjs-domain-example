import { registerAs } from '@nestjs/config';

export const SeedsConfig = registerAs('seeds', () => ({
  cornPrice: parseInt(process.env.CORN_PRICE, 10),
}));
