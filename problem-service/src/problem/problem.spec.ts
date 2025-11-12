import { ProblemService } from './problem.service';
import { LevelOfDifficulty, TestCasesDto } from './problem.dto';

const mockPrisma = {
  $transaction: jest.fn(),
  problem: {
    findMany: jest.fn(),
    findUnique: jest.fn(),
    update: jest.fn(),
    delete: jest.fn(),
    create: jest.fn(),
  },
  testCase: {
    createMany: jest.fn(),
    deleteMany: jest.fn(),
  },
};

describe('ProblemService', () => {
  let service: ProblemService;

  beforeEach(() => {
    service = new ProblemService(mockPrisma as any);
    jest.clearAllMocks();
  });

  describe('create', () => {
    it('should create problem with test cases', async () => {
      const testCases: TestCasesDto[] = [{ input: [1, 2], output: [3] }];
      const title = 'test title';
      const description = 'test description';
      const expectedResult = {
        id: 1,
        title: 'test title',
        description,
        testCases,
      };

      mockPrisma.$transaction.mockImplementation((callback) => {
        return callback(mockPrisma);
      });
      mockPrisma.problem.create.mockResolvedValue({
        id: 1,
        title,
        description,
      });
      mockPrisma.problem.findUnique.mockResolvedValue(expectedResult);

      const result = await service.create(
        title,
        description,
        testCases,
        LevelOfDifficulty.EASY,
      );

      expect(result).toEqual(expectedResult);
      expect(mockPrisma.testCase.createMany).toHaveBeenCalled();
    });
  });

  describe('findAll', () => {
    it('should return all problems', async () => {
      const problems = [
        {
          id: 1,
          title: 'test title',
          description: 'test description',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ];

      mockPrisma.problem.findMany.mockResolvedValue(problems);

      const result = await service.findAll(1, 1);
      expect(result).toEqual(problems);
    });
  });

  describe('findOne', () => {
    it('should return problem by id', async () => {
      const problem = {
        id: 1,
        title: 'test title',
        description: 'test description',
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      mockPrisma.problem.findUnique.mockResolvedValue(problem);

      const result = await service.findOne(1);
      expect(result).toBe(problem);
    });
  });

  describe('update', () => {
    it('should update problem and test cases', async () => {
      const testCases: TestCasesDto[] = [{ input: [1, 2], output: [3] }];
      const problem = {
        id: 1,
        title: 'test title',
        description: 'test description',
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      mockPrisma.$transaction.mockImplementation((callback) => {
        return callback(mockPrisma);
      });
      mockPrisma.problem.findUnique.mockResolvedValue(problem);

      const result = await service.update(
        1,
        'title',
        'desc',
        LevelOfDifficulty.EASY,
        testCases,
      );
      expect(result).toBe(problem);
      expect(mockPrisma.testCase.deleteMany).toHaveBeenCalled();
      expect(mockPrisma.testCase.createMany).toHaveBeenCalled();
    });
  });

  describe('remove', () => {
    it('should delete problem and its test cases', async () => {
      const problem = {
        id: 1,
        title: 'test title',
        description: 'test description',
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      mockPrisma.$transaction.mockImplementation((callback: any) => {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-call
        return callback(mockPrisma);
      });
      mockPrisma.problem.delete.mockResolvedValue(problem);

      const result = await service.remove(1);
      expect(result).toBe(problem);
      expect(mockPrisma.testCase.deleteMany).toHaveBeenCalled();
      expect(mockPrisma.problem.delete).toHaveBeenCalled();
    });
  });
});
