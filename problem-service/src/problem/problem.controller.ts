import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Param,
  Body,
  NotFoundException,
} from '@nestjs/common';
import { ProblemService } from './problem.service';
import { Problem } from '@prisma/client';

@Controller('/api/problem')
export class ProblemController {
  constructor(private readonly problemService: ProblemService) {}

  @Post()
  async create(
    @Body() body: { title: string; description: string },
  ): Promise<Problem> {
    const { title, description } = body;
    const res = await this.problemService.create(title, description);
    return res;
  }

  @Get()
  async findAll(): Promise<Problem[]> {
    const res = await this.problemService.findAll();
    return res;
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Problem> {
    const problem = await this.problemService.findOne(Number(id));
    if (!problem) {
      throw new NotFoundException('Problem not found');
    }
    return problem;
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() body: { title: string; description: string },
  ): Promise<Problem> {
    const { title, description } = body;
    const res = await this.problemService.update(
      Number(id),
      title,
      description,
    );
    return res;
  }

  @Delete(':id')
  async remove(@Param('id') id: string): Promise<Problem> {
    const res = await this.problemService.remove(Number(id));
    return res;
  }
}
