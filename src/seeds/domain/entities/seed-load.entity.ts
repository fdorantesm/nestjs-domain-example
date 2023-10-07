import { SeedLoadPayload } from '../interfaces/seed-load-payload.interface';
import { SeedLoadReport } from '../interfaces/seed-load-report.interface';
import { SeedLoad } from '../interfaces/seed-load.interface';
import { SeedLoadOptions } from '../interfaces/seed-load-options.interface';
import { calculateMoistureFactor } from '../utils/calculate-moisture-factor.util';

export class SeedLoadEntity {
  private _id: number;
  private _quantity: number;
  private _adjust: number;
  private _total: number;
  private _value: number;
  private _moisture: number;
  private _factor: number;
  private __price: number;

  private constructor(input: SeedLoad, options?: SeedLoadOptions) {
    this._id = input.id;
    this._quantity = input.quantity;
    this._moisture = input.moisture;
    this._adjust = input.adjust;
    this._total = input.total;
    this._value = input.value;
    this._factor = input.factor;

    if (options?.price) {
      this.__price = options.price;
    }
  }

  public static initialize(
    input: SeedLoadPayload,
    options?: SeedLoadOptions,
  ): SeedLoadEntity {
    return new SeedLoadEntity(
      {
        ...input,
        adjust: 0,
        total: 0,
        value: 0,
        factor: 0,
      },
      options,
    );
  }

  public static createFromPrimitives(
    input: SeedLoad,
    options?: SeedLoadOptions,
  ): SeedLoadEntity {
    return new SeedLoadEntity(input, options);
  }

  public static calculateFactor(moisture: number): number {
    return calculateMoistureFactor(moisture);
  }

  public setFactor(factor: number): void {
    this._factor = factor;
  }

  public setPrice(price: number): void {
    this.__price = price;
  }

  public getAdjust(): number {
    return this._quantity * (1 - this._factor);
  }

  public getValue(): number {
    return this.getTotal() * this.__price;
  }

  public getTotal(): number {
    return this._quantity * this._factor;
  }

  public toJson(): SeedLoad {
    return {
      id: this._id,
      quantity: this._quantity,
      adjust: Number(Number(this.getAdjust()).toFixed(2)),
      total: Number(Number(this.getTotal()).toFixed(2)),
      value: Number(Number(this.getValue()).toFixed(2)),
      moisture: this._moisture,
      factor: this._factor,
    };
  }

  public toReport(): Omit<SeedLoadReport, 'factor' | 'moisture'> {
    return {
      id: this._id,
      quantity: this._quantity,
      adjust: Number(Number(this.getAdjust()).toFixed(2)),
      total: Number(Number(this.getTotal()).toFixed(2)),
      value: Number(Number(this.getValue()).toFixed(2)),
    };
  }

  public getId(): number {
    return this._id;
  }

  public getQuantity(): number {
    return this._quantity;
  }

  public getMoisture(): number {
    return this._moisture;
  }

  public getFactor(): number {
    return this._factor;
  }

  public getPrice(): number {
    return this.__price;
  }
}
