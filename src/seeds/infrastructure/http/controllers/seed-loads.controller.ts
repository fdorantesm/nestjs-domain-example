import { Body, Controller, Post, Put } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { RegisterSeedLoadsDto } from '../dtos/register-seed-load.dto';
import { LoadSeedsUseCase } from 'src/seeds/application/use-cases/load-seeds/load-seeds.use-case';

@ApiTags('Seeds')
@Controller({ path: 'seeds' })
export class SeedsController {
  constructor(private readonly loadSeedsUseCase: LoadSeedsUseCase) {}

  @Put('/')
  public create(@Body() body: RegisterSeedLoadsDto) {
    return this.loadSeedsUseCase.run(
      body.loads.map((load) => ({
        id: load.id,
        quantity: load.quantity,
        moisture: load.moisture,
      })),
    );
  }
}
