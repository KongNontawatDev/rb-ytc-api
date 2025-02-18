import { Test, TestingModule } from '@nestjs/testing';
import { AccessoryController } from './accessory.controller';
import { FileService } from '@common/utils/file/file.service';
import { LoggerService } from '@common/logger/logger.service';
import { ConfigService } from '@nestjs/config';
import { AccessoryService } from '@modules/core/accessory/accessory.service';
import { CreateAccessoryDto } from '@modules/core/accessory/dto/create-accessory.dto';
import { UpdateAccessoryDto } from '@modules/core/accessory/dto/update-accessory.dto';
import { DeleteManyAccessoryDto, UpdateManyAccessoryDto } from '@modules/core/accessory/dto/params-accessory.dto';

// Types
interface BatchPayload {
  count: number;
}

interface MockResponse<T> {
  message: string;
  error: number;
  data: T;
  meta?: {
    page: number;
    pageSize: number;
    pageCount: number;
    total: number;
  };
}

// Constants
const TEST_CONFIG = {
  APP_NAME: 'test-app',
  APP_ENV: 'test',
} as const;

const TEST_FILE_PATH = './public/accessory/test.jpg';

// Mock Factories
const createMockConfigService = () => ({
  get: jest.fn((key: string) => {
    const config: Record<string, string> = {
      'app.name': TEST_CONFIG.APP_NAME,
      'app.env': TEST_CONFIG.APP_ENV,
    };
    return config[key] ?? null;
  }),
});

const createMockLoggerService = () => ({
  log: jest.fn(),
  error: jest.fn(),
  warn: jest.fn(),
  debug: jest.fn(),
  verbose: jest.fn(),
});

const createMockAccessory = (override = {}) => ({
  id: 1,
  name: 'Test Accessory',
  detail: 'Test Detail',
  image: 'test.jpg',
  status: 1,
  created_at: new Date('2024-02-17'),
  updated_at: new Date('2024-02-17'),
  ...override,
});

const createMockFile = (override = {}): Express.Multer.File => ({
  fieldname: 'image',
  originalname: 'test.jpg',
  encoding: '7bit',
  mimetype: 'image/jpeg',
  destination: './public/accessory',
  filename: 'test.jpg',
  path: TEST_FILE_PATH,
  size: 1024,
  buffer: Buffer.from([]),
  stream: null as any,
  ...override,
});

const createMockAccessoryService = () => ({
  create: jest.fn(),
  findAll: jest.fn(),
  findOne: jest.fn(),
  findByCondition: jest.fn(),
  findForDropdown: jest.fn(),
  update: jest.fn(),
  updateStatusOne: jest.fn(),
  updateStatusMany: jest.fn(),
  remove: jest.fn(),
  removeMany: jest.fn(),
});

const createMockFileService = () => ({
  deleteFiles: jest.fn(),
});

// Test Module Factory
const createTestingModule = async (): Promise<TestingModule> => {
  return Test.createTestingModule({
    controllers: [AccessoryController],
    providers: [
      {
        provide: AccessoryService,
        useValue: createMockAccessoryService(),
      },
      {
        provide: FileService,
        useValue: createMockFileService(),
      },
      {
        provide: LoggerService,
        useValue: createMockLoggerService(),
      },
      {
        provide: ConfigService,
        useValue: createMockConfigService(),
      },
    ],
  }).compile();
};

describe('AccessoryController', () => {
  let controller: AccessoryController;
  let accessoryService: jest.Mocked<AccessoryService>;
  let fileService: jest.Mocked<FileService>;
  let module: TestingModule;

  beforeEach(async () => {
    module = await createTestingModule();
    controller = module.get<AccessoryController>(AccessoryController);
    accessoryService = module.get(AccessoryService);
    fileService = module.get(FileService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('create', () => {
    const mockDto: CreateAccessoryDto = {
      name: 'Test Accessory',
      detail: 'Test Detail',
    };
    const mockFile = createMockFile();
    const mockAccessory = createMockAccessory();

    it('should create an accessory successfully', async () => {
      // Arrange
      accessoryService.create.mockResolvedValue(mockAccessory);

      // Act
      const result = await controller.create(mockDto, mockFile);

      // Assert
      expect(result).toEqual<MockResponse<typeof mockAccessory>>({
        message: 'เพิ่มข้อมูลอุปกรณ์',
        error: 0,
        data: mockAccessory,
      });
      expect(accessoryService.create).toHaveBeenCalledWith(mockDto, mockFile);
      expect(accessoryService.create).toHaveBeenCalledTimes(1);
    });

    it('should handle creation failure and cleanup uploaded file', async () => {
      // Arrange
      const mockError = new Error('Creation failed');
      accessoryService.create.mockRejectedValue(mockError);
      fileService.deleteFiles.mockResolvedValue(undefined);

      // Act & Assert
      await expect(controller.create(mockDto, mockFile))
        .rejects.toThrow(mockError);
      
      expect(fileService.deleteFiles).toHaveBeenCalledWith(TEST_FILE_PATH);
      expect(fileService.deleteFiles).toHaveBeenCalledTimes(1);
    });
  });

  describe('findByCondition', () => {
    const mockQuery = { page: '1', pageSize: '10', status: '1' };
    
    it('should return paginated accessories', async () => {
      // Arrange
      const mockAccessories = [createMockAccessory()];
      const mockPaginatedResponse = {
        data: mockAccessories,
        total: 1,
        pageCount: 1,
      };

      accessoryService.findByCondition.mockResolvedValue(mockPaginatedResponse);

      // Act
      const result = await controller.findByCondition(mockQuery);

      // Assert
      expect(result).toEqual<MockResponse<typeof mockAccessories>>({
        message: 'เรียกดูข้อมูลอุปกรณ์ทั้งหมด',
        meta: {
          page: 1,
          pageSize: 10,
          pageCount: 1,
          total: 1,
        },
        error: 0,
        data: mockAccessories,
      });
      expect(accessoryService.findByCondition).toHaveBeenCalledTimes(1);
    });
  });

  describe('findAll', () => {
    it('should return all accessories', async () => {
      // Arrange
      const mockAccessories = [
        createMockAccessory(),
        createMockAccessory({ id: 2 }),
      ];
      
      accessoryService.findAll.mockResolvedValue(mockAccessories);

      // Act
      const result = await controller.findAll();

      // Assert
      expect(result).toEqual<MockResponse<typeof mockAccessories>>({
        message: 'เรียกดูข้อมูลอุปกรณ์ทั้งหมด',
        error: 0,
        data: mockAccessories,
      });
      expect(accessoryService.findAll).toHaveBeenCalledTimes(1);
    });
  });

  describe('findOne', () => {
    it('should return a single accessory by id', async () => {
      // Arrange
      const mockId = '1';
      const mockAccessory = createMockAccessory();

      accessoryService.findOne.mockResolvedValue(mockAccessory);

      // Act
      const result = await controller.findOne({ id: mockId });

      // Assert
      expect(result).toEqual<MockResponse<typeof mockAccessory>>({
        message: 'เรียกดูข้อมูลอุปกรณ์ตามรหัส',
        error: 0,
        data: mockAccessory,
      });
      expect(accessoryService.findOne).toHaveBeenCalledWith(1);
      expect(accessoryService.findOne).toHaveBeenCalledTimes(1);
    });

    it('should handle non-existent accessory', async () => {
      // Arrange
      const mockId = '999';
      accessoryService.findOne.mockResolvedValue(null);

      // Act
      const result = await controller.findOne({ id: mockId });

      // Assert
      expect(result).toEqual<MockResponse<null>>({
        message: 'เรียกดูข้อมูลอุปกรณ์ตามรหัส',
        error: 0,
        data: null,
      });
    });
  });

  describe('update', () => {
    const mockId = '1';
    const mockDto: UpdateAccessoryDto = {
      id: 1,
      name: 'Updated Accessory',
      detail: 'Updated Detail',
      status: 1,
    };
    const mockFile = createMockFile();

    it('should update an accessory successfully', async () => {
      // Arrange
      const mockUpdatedAccessory = createMockAccessory({
        ...mockDto,
        image: mockFile.filename,
      });

      accessoryService.update.mockResolvedValue(mockUpdatedAccessory);

      // Act
      const result = await controller.update(mockId, mockDto, mockFile);

      // Assert
      expect(result).toEqual<MockResponse<typeof mockUpdatedAccessory>>({
        message: 'แก้ไขข้อมูลอุปกรณ์ตามรหัส',
        error: 0,
        data: mockUpdatedAccessory,
      });
      expect(accessoryService.update).toHaveBeenCalledWith(1, mockDto, mockFile);
      expect(accessoryService.update).toHaveBeenCalledTimes(1);
    });

    it('should handle update failure and cleanup uploaded file', async () => {
      // Arrange
      const mockError = new Error('Update failed');
      accessoryService.update.mockRejectedValue(mockError);
      fileService.deleteFiles.mockResolvedValue(undefined);

      // Act & Assert
      await expect(controller.update(mockId, mockDto, mockFile))
        .rejects.toThrow(mockError);
      
      expect(fileService.deleteFiles).toHaveBeenCalledWith(TEST_FILE_PATH);
      expect(fileService.deleteFiles).toHaveBeenCalledTimes(1);
    });
  });

  describe('Batch Operations', () => {
    describe('updateStatusMany', () => {
      const mockDto: UpdateManyAccessoryDto = {
        id: [1, 2],
        status: 0,
      };

      it('should update status of multiple accessories', async () => {
        // Arrange
        const mockResponse: BatchPayload = { count: 2 };
        accessoryService.updateStatusMany.mockResolvedValue(mockResponse);

        // Act
        const result = await controller.updateStatusMany(mockDto);

        // Assert
        expect(result).toEqual<MockResponse<BatchPayload>>({
          message: 'เปลี่ยนสถานะอุปกรณ์หลายแถว',
          error: 0,
          data: mockResponse,
        });
        expect(accessoryService.updateStatusMany).toHaveBeenCalledWith(
          mockDto.id,
          mockDto.status,
        );
        expect(accessoryService.updateStatusMany).toHaveBeenCalledTimes(1);
      });

      it('should handle when no accessories are updated', async () => {
        // Arrange
        const mockResponse: BatchPayload = { count: 0 };
        accessoryService.updateStatusMany.mockResolvedValue(mockResponse);

        // Act
        const result = await controller.updateStatusMany({
          ...mockDto,
          id: [999, 1000],
        });

        // Assert
        expect(result.data?.count).toBe(0);
      });
    });

    describe('removeMany', () => {
      const mockDto: DeleteManyAccessoryDto = {
        id: [1, 2],
      };

      it('should remove multiple accessories', async () => {
        // Arrange
        const mockResponse: BatchPayload = { count: 2 };
        accessoryService.removeMany.mockResolvedValue(mockResponse);

        // Act
        const result = await controller.removeMany(mockDto);

        // Assert
        expect(result).toEqual<MockResponse<BatchPayload>>({
          message: 'ลบข้อมูลอุปกรณ์หลายแถว',
          error: 0,
          data: mockResponse,
        });
        expect(accessoryService.removeMany).toHaveBeenCalledWith(mockDto.id);
        expect(accessoryService.removeMany).toHaveBeenCalledTimes(1);
      });
    });
  });
});