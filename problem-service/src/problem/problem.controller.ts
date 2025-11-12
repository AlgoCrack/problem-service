import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Param,
  Body,
  NotFoundException,
  ParseIntPipe,
  UsePipes,
  ValidationPipe,
  Query,
} from '@nestjs/common';
import { ProblemService } from './problem.service';
import { Problem } from '@prisma/client';
import { CreateProblemReq, FindAllRes, UpdateProblemReq } from './problem.dto';

@Controller('/api/problem')
export class ProblemController {
  constructor(private readonly problemService: ProblemService) {}

  @Post()
  @UsePipes(ValidationPipe)
  async create(@Body() body: CreateProblemReq): Promise<Problem> {
    const { title, description, testCases, levelOfDifficulty } = body;
    const res = await this.problemService.create(
      title,
      description,
      testCases,
      levelOfDifficulty,
    );
    return res;
  }

  @Get()
  async findAll(
    @Query('page') pageStr: string,
    @Query('pageSize') pageSizeStr: string,
  ): Promise<FindAllRes[]> {
    const page = parseInt(pageStr) || 1;
    const pageSize = parseInt(pageSizeStr) || 10;
    return this.problemService.findAll(page, pageSize);
  }

  @Get(':id')
  @UsePipes(ValidationPipe)
  async findOne(@Param('id', ParseIntPipe) id: number): Promise<Problem> {
    const problem = await this.problemService.findOne(id);
    if (!problem) {
      throw new NotFoundException('Problem not found');
    }
    return problem;
  }

  @Patch(':id')
  @UsePipes(ValidationPipe)
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() body: UpdateProblemReq,
  ): Promise<Problem | null> {
    const { title, description, testCases, levelOfDifficulty } = body;
    const res = await this.problemService.update(
      id,
      title,
      description,
      levelOfDifficulty,
      testCases,
    );
    return res;
  }

  @Delete(':id')
  @UsePipes(ValidationPipe)
  async remove(@Param('id', ParseIntPipe) id: number): Promise<Problem> {
    const res = await this.problemService.remove(id);
    return res;
  }
}
