import { Test } from '@nestjs/testing';
import {
  SEED_LOADS_SERVICE_TOKEN,
  SeedLoadsService as SeedLoadServiceType,
} from 'src/seeds/domain/contracts/seed-loads.service';
import { SeedLoadsService } from './seed-loads.service';
import { SeedLoadsRepository } from '../repositories/seed-loads.memory.repository';
import { SeedLoadEntity } from 'src/seeds/domain/entities/seed-load.entity';
import { seedLoadsInputMock } from '../../../../../test/mocks/seed-loads-input.mock';

describe('SeedLoadsService', () => {
  let service: SeedLoadServiceType;

  function prepareData() {
    const payload = seedLoadsInputMock.map((load) => {
      const entity = SeedLoadEntity.initialize(load);
      const factor = SeedLoadEntity.calculateFactor(load.moisture);
      entity.setPrice(6);
      entity.setFactor(factor);
      return entity.toJson();
    });

    return payload;
  }

  beforeEach(async () => {
    const testModule = await Test.createTestingModule({
      providers: [
        SeedLoadsRepository,
        {
          provide: SEED_LOADS_SERVICE_TOKEN,
          useClass: SeedLoadsService,
        },
      ],
    }).compile();

    service = testModule.get<SeedLoadServiceType>(SEED_LOADS_SERVICE_TOKEN);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should insert bulk data', async () => {
    expect(service.bulkInsert).toBeDefined();
    expect(typeof service.bulkInsert).toBe('function');
    const payload = prepareData();
    const data = await service.bulkInsert(payload);
    expect(Array.isArray(data)).toBe(true);
    expect(data.length).toBe(4);
    data.map((row, index) => {
      row.setPrice(6);
      const load = row.toJson();
      expect(load).toHaveProperty('id');
      expect(load).toHaveProperty('adjust');
      expect(load).toHaveProperty('factor');
      expect(load).toHaveProperty('moisture');
      expect(load).toHaveProperty('quantity');
      expect(load).toHaveProperty('total');
      expect(load).toHaveProperty('value');
      expect(load.id).toBe(seedLoadsInputMock[index].id);
      expect(load.quantity).toBe(seedLoadsInputMock[index].quantity);
      expect(load.moisture).toBe(seedLoadsInputMock[index].moisture);
    });
  });

  it('should find all data', async () => {
    const payload = prepareData();
    await service.bulkInsert(payload);
    const data = await service.find();
    expect(Array.isArray(data)).toBe(true);
    expect(data.length).toBe(4);
    data.map((row, index) => {
      const load = row.toJson();
      expect(load).toHaveProperty('id');
      expect(load).toHaveProperty('adjust');
      expect(load).toHaveProperty('factor');
      expect(load).toHaveProperty('moisture');
      expect(load).toHaveProperty('quantity');
      expect(load).toHaveProperty('total');
      expect(load).toHaveProperty('value');
      expect(load.id).toBe(seedLoadsInputMock[index].id);
      expect(load.quantity).toBe(seedLoadsInputMock[index].quantity);
      expect(load.moisture).toBe(seedLoadsInputMock[index].moisture);
    });
  });
});
