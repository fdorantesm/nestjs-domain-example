import { IsArray, ValidateNested } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { SeedLoadDto } from './seed-load.dto';
import { seedLoadsInputMock } from '../../../../../test/mocks/seed-loads-input.mock';

export class RegisterSeedLoadsDto {
  @ApiProperty({
    example: seedLoadsInputMock,
  })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => SeedLoadDto)
  public readonly loads: SeedLoadDto[];
}
