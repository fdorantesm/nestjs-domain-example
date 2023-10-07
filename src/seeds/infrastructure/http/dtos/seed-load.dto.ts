import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsNumber, IsPositive } from 'class-validator';

export class SeedLoadDto {
  @ApiProperty({ example: 1 })
  @IsNumber()
  @IsInt()
  @IsPositive()
  public readonly id: number;

  @ApiProperty({ example: 12850 })
  @IsNumber()
  @IsPositive()
  public readonly quantity: number;

  @ApiProperty({ example: 12.6 })
  @IsNumber()
  @IsPositive()
  public readonly moisture: number;
}
