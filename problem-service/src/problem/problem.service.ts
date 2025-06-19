import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Prisma } from '@prisma/client';
import { Problem } from '@prisma/client';

@Injectable()
export class ProblemService {
  constructor(private readonly prisma: PrismaService) {}

  async create(title: string, description: string): Promise<Problem> {
    try {
      const res = await this.prisma.problem.create({
        data: { title, description },
      });
      return res;
    } catch (error) {
      console.error('Error creating problem:', error);
      throw new Error('Failed to create problem');
    }
  }

  async findAll(): Promise<Problem[]> {
    try {
      const res = await this.prisma.problem.findMany();
      return res;
    } catch (error) {
      console.error('Error finding problems:', error);
      throw new Error('Failed to find problems');
    }
  }

  async findOne(id: number): Promise<Problem | null> {
    try {
      const res = await this.prisma.problem.findUnique({ where: { id } });
      return res;
    } catch (error) {
      console.error('Error finding problem:', error);
      throw new Error('Failed to find problem');
    }
  }

  async update(
    id: number,
    title: string,
    description: string,
  ): Promise<Problem> {
    try {
      const res = await this.prisma.problem.update({
        where: { id },
        data: { title, description },
      });
      return res;
    } catch (error) {
      if (
        error instanceof Prisma.PrismaClientKnownRequestError &&
        error.code === 'P2025'
      ) {
        throw new NotFoundException('Problem not found');
      }
      throw error;
    }
  }

  async remove(id: number): Promise<Problem> {
    try {
      const res = await this.prisma.problem.delete({ where: { id } });
      return res;
    } catch (error) {
      if (
        error instanceof Prisma.PrismaClientKnownRequestError &&
        error.code === 'P2025'
      ) {
        throw new NotFoundException('Problem not found');
      }
      throw error;
    }
  }
}
