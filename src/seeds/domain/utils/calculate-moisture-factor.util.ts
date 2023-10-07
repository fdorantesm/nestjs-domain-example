export function calculateMoistureFactor(moisture: number): number {
  let factor: number;

  if (moisture >= 0 && moisture <= 12) {
    factor = 1;
  }

  if (moisture > 12 && moisture <= 12.6) {
    factor = 0.98;
  }

  if (moisture > 12.6 && moisture <= 13.2) {
    factor = 0.96;
  }

  if (moisture > 13.2 && moisture <= 14) {
    factor = 0.94;
  }

  if (moisture > 14 && moisture <= 17) {
    factor = 0.9;
  }

  return factor;
}
