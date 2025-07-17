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
} from '@nestjs/common';
import { ProblemService } from './problem.service';
import { Problem } from '@prisma/client';
import { CreateProblemReq, UpdateProblemReq } from './problem.dto';

@Controller('/api/problem')
export class ProblemController {
  constructor(private readonly problemService: ProblemService) {}

  @Post()
  @UsePipes(ValidationPipe)
  async create(@Body() body: CreateProblemReq): Promise<Problem> {
    const { title, description, testCases } = body;
    const res = await this.problemService.create(title, description, testCases);
    return res;
  }

  @Get()
  @UsePipes(ValidationPipe)
  async findAll(): Promise<Problem[]> {
    const res = await this.problemService.findAll();
    return res;
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
    const { title, description, testCases } = body;
    const res = await this.problemService.update(
      id,
      title,
      description,
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
