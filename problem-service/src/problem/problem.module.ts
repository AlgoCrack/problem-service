import { Module } from '@nestjs/common';
import { ProblemController } from './problem.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { ProblemService } from './problem.service';

@Module({
  imports: [PrismaModule],
  controllers: [ProblemController],
  providers: [ProblemService],
  exports: [ProblemService],
})
export class ProblemModule {}
