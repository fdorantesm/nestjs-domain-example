import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';
import {
  putSeedLoadsRequestMock,
  putSeedLoadsResponseMock,
} from './mocks/put-seed-loads.mock';
import { seedLoadsInputMock } from './mocks/seed-loads-input.mock';
import { seedLoadsOutputMock } from './mocks/seed-loads-output.mock';

describe('AppController (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/seeds (PUT)', async () => {
    const response = await request(app.getHttpServer())
      .put('/seeds')
      .send(putSeedLoadsRequestMock)
      .expect(200);

    expect(response.body).toHaveProperty('loads');
    expect(Array.isArray(response.body.loads)).toBe(true);
    expect(response.body.loads.length).toBe(seedLoadsOutputMock.length);

    response.body.loads.map((load, index) => {
      console.log(load, seedLoadsOutputMock[index]);
      expect(load.id).toBe(seedLoadsOutputMock[index].id);
      expect(load.quantity).toBe(seedLoadsOutputMock[index].quantity);
      expect(load.total).toBe(seedLoadsOutputMock[index].total);
      expect(load.value).toBe(seedLoadsOutputMock[index].value);
    });
  });
});
