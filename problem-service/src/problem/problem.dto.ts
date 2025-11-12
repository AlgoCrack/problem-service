import { ApiProperty } from '@nestjs/swagger';
import {
  IsArray,
  IsDate,
  IsNumber,
  IsObject,
  IsOptional,
  IsString,
} from 'class-validator';

export enum LevelOfDifficulty {
  EASY = 'easy',
  MEDIUMN = 'mediumn',
  HARD = 'hard',
}

export class UpdateProblemReq {
  @ApiProperty({ description: 'problem title', example: 'Two Sum' })
  @IsString()
  @IsOptional()
  title?: string;

  @ApiProperty({ description: 'problem description', example: '1 + 1 = ?' })
  @IsString()
  @IsOptional()
  description?: string;

  @ApiProperty({ description: 'easy', example: {} })
  @IsString()
  levelOfDifficulty: LevelOfDifficulty;

  @ApiProperty({ description: 'test case', example: {} })
  @IsArray()
  @IsOptional()
  testCases?: TestCasesDto[];
}

export class CreateProblemReq {
  @ApiProperty({ description: 'problem title', example: 'Two Sum' })
  @IsString()
  title: string;

  @ApiProperty({ description: 'problem description', example: '1 + 1 = ?' })
  @IsString()
  description: string;

  @ApiProperty({ description: 'test case', example: {} })
  @IsArray()
  @IsOptional()
  testCases: TestCasesDto[];

  @ApiProperty({ description: 'easy', example: {} })
  @IsString()
  levelOfDifficulty: LevelOfDifficulty;
}

export class TestCasesDto {
  @ApiProperty({ description: 'input', example: {} })
  @IsObject()
  input: (string | number | boolean)[];

  @ApiProperty({ description: 'output', example: {} })
  @IsObject()
  output: (string | number | boolean)[];
}

export class FindAllRes {
  @ApiProperty({ description: 'input', example: 1 })
  @IsNumber()
  id: number;

  @ApiProperty({ description: 'output', example: 'two sum' })
  @IsString()
  title: string;

  @ApiProperty({ description: 'created at', example: new Date() })
  @IsDate()
  createdAt: Date;

  @ApiProperty({ description: 'updated at', example: new Date() })
  @IsDate()
  updatedAt: Date;
}
