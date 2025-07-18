import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsObject, IsOptional, IsString } from 'class-validator';
import { Prisma } from '@prisma/client';

export class UpdateProblemReq {
  @ApiProperty({ description: 'problem title', example: 'Two Sum' })
  @IsString()
  @IsOptional()
  title?: string;

  @ApiProperty({ description: 'problem description', example: '1 + 1 = ?' })
  @IsString()
  @IsOptional()
  description?: string;

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
}

export class TestCasesDto {
  @ApiProperty({ description: 'input', example: {} })
  @IsObject()
  input: (string | number | boolean)[];

  @ApiProperty({ description: 'output', example: {} })
  @IsObject()
  output: (string | number | boolean)[];
}
