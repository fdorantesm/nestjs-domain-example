import DataStore = require('nedb-promises');
import { Injectable } from '@nestjs/common';
import { SeedLoadEntity } from 'src/seeds/domain/entities/seed-load.entity';
import { SeedLoad } from 'src/seeds/domain/interfaces/seed-load.interface';

@Injectable()
export class SeedLoadsRepository {
  private store: DataStore<SeedLoad>;

  constructor() {
    this.store = DataStore.create();
  }

  public async bulkInsert(payload: SeedLoad[]): Promise<SeedLoadEntity[]> {
    const rows = await this.store.insertMany(payload);
    return rows.map((row) => SeedLoadEntity.createFromPrimitives(row));
  }

  public async find(): Promise<SeedLoadEntity[]> {
    const rows = await this.store.find({}).sort({ id: 1 });
    return rows.map((row) => SeedLoadEntity.createFromPrimitives(row));
  }
}
