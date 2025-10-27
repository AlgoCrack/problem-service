import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Problem } from '@prisma/client';
import { handlePrismaError } from '../utils/error-utils';
import { FindAllRes, TestCasesDto } from './problem.dto';

@Injectable()
export class ProblemService {
  constructor(private readonly prisma: PrismaService) {}

  async create(
    title: string,
    description: string,
    testCases: TestCasesDto[],
  ): Promise<Problem> {
    try {
      const res = await this.prisma.$transaction(async (prisma) => {
        // 寫入 Problem
        const problem = await prisma.problem.create({
          data: { title, description },
        });

        // 寫入 TestCase
        if (testCases && testCases.length > 0) {
          await prisma.testCase.createMany({
            data: testCases.map((tc) => ({ ...tc, problemId: problem.id })),
          });
        }

        // 查詢並回傳包含 testCases 的 problem
        return prisma.problem.findUnique({
          where: { id: problem.id },
          include: { testCases: true },
        });
      });

      // 沒有 res 時回傳錯誤
      if (!res) {
        throw new Error('Problem not found after creation');
      }

      return res;
    } catch (error) {
      console.error('Error creating problem:', error);
      throw new Error('Failed to create problem');
    }
  }

  async findAll(): Promise<FindAllRes[]> {
    try {
      const res = await this.prisma.problem.findMany({
        select: {
          id: true,
          title: true,
          createdAt: true,
          updatedAt: true,
        },
      });
      return res;
    } catch (error) {
      console.error('Error finding problems:', error);
      throw new Error('Failed to find problems');
    }
  }

  async findOne(id: number): Promise<Problem | null> {
    try {
      const res = await this.prisma.problem.findUnique({
        where: { id },
        include: { testCases: true },
      });
      return res;
    } catch (error) {
      console.error('Error finding problem:', error);
      throw new Error('Failed to find problem');
    }
  }

  async update(
    id: number,
    title?: string,
    description?: string,
    testCases?: TestCasesDto[],
  ): Promise<Problem | null> {
    try {
      await this.prisma.$transaction(async (prisma) => {
        // 更新 Problem
        await prisma.problem.update({
          where: { id },
          data: { title, description },
        });

        // 如果有 testCases，先刪除舊的再新增
        if (testCases) {
          await prisma.testCase.deleteMany({ where: { problemId: id } });
          if (testCases.length > 0) {
            await prisma.testCase.createMany({
              data: testCases.map((tc) => ({ ...tc, problemId: id })),
            });
          }
        }
      });

      // 回傳包含 testCases 的最新 problem
      const res = await this.findOne(id);

      return res;
    } catch (error) {
      handlePrismaError(error);
    }
  }

  async remove(id: number): Promise<Problem> {
    try {
      const res = await this.prisma.$transaction(async (prisma) => {
        // 先刪除所有 testCases
        await prisma.testCase.deleteMany({ where: { problemId: id } });
        // 再刪除 problem
        return prisma.problem.delete({ where: { id } });
      });
      return res;
    } catch (error) {
      handlePrismaError(error);
    }
  }
}
