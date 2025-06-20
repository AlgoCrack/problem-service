import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class UpdateProblemReq {
  @ApiProperty({ description: 'problem title', example: 'Two Sum' })
  @IsString()
  @IsOptional()
  title?: string;

  @ApiProperty({ description: 'problem description', example: '1 + 1 = ?' })
  @IsString()
  @IsOptional()
  description?: string;
}

export class CreateProblemReq {
  @ApiProperty({ description: 'problem title', example: 'Two Sum' })
  @IsString()
  title: string;

  @ApiProperty({ description: 'problem description', example: '1 + 1 = ?' })
  @IsString()
  description: string;
}
