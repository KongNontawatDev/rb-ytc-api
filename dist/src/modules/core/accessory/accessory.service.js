"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AccessoryService = void 0;
const common_1 = require("@nestjs/common");
const prisma_error_handler_1 = require("../../../common/exceptions/prisma-error.handler");
const file_service_1 = require("../../../common/utils/file/file.service");
const path_1 = __importDefault(require("path"));
const prisma_service_1 = require("../../../provider/prisma/prisma.service");
const compression_service_1 = require("../../../common/utils/compression/compression.service");
let AccessoryService = class AccessoryService {
    constructor(db, fileService, compressionService) {
        this.db = db;
        this.fileService = fileService;
        this.compressionService = compressionService;
    }
    async create(data, file) {
        const imagePath = file ? file.filename : null;
        try {
            const accessory = await this.db.accessory.findFirst({ where: { name: data.name } });
            if (accessory) {
                throw new common_1.BadRequestException(`อุปกรณ์ ${data.name} มีอยู่ในระบบแล้ว`);
            }
            return await this.db.accessory.create({
                data: {
                    ...data,
                    image: imagePath || 'default.png',
                },
            });
        }
        catch (error) {
            (0, prisma_error_handler_1.handlePrismaError)(error);
        }
    }
    async findByCondition(query) {
        const { textSearch, searchField, page, pageSize, sortField, sortOrder, status, } = query;
        try {
            const where = {};
            const andConditions = [];
            if (textSearch && searchField) {
                const searchFields = searchField
                    .split(',')
                    .map((field) => field.trim());
                const searchConditions = searchFields
                    .map((field) => {
                    if (field === 'id' || field === 'status') {
                        const numValue = Number(textSearch);
                        if (!isNaN(numValue)) {
                            return {
                                [field]: numValue,
                            };
                        }
                        return undefined;
                    }
                    return {
                        [field]: {
                            contains: textSearch,
                        },
                    };
                })
                    .filter((condition) => condition !== undefined);
                if (searchConditions.length > 0) {
                    andConditions.push({
                        OR: searchConditions,
                    });
                }
            }
            if (status) {
                const statusValues = status
                    .split(',')
                    .map((value) => Number(value.trim()));
                andConditions.push({
                    OR: statusValues.map((statusValue) => ({
                        status: statusValue,
                    })),
                });
            }
            if (andConditions.length > 0) {
                where['AND'] = andConditions;
            }
            const skip = (Number(page) - 1) * Number(pageSize);
            const [data, pageCount, total] = await Promise.all([
                this.db.accessory.findMany({
                    where,
                    skip: Number(skip),
                    take: Number(pageSize),
                    orderBy: sortField
                        ? {
                            [sortField]: sortOrder,
                        }
                        : undefined,
                }),
                this.db.accessory.count({ where }),
                this.db.accessory.count(),
            ]);
            return {
                data,
                pageCount,
                total,
            };
        }
        catch (error) {
            (0, prisma_error_handler_1.handlePrismaError)(error);
            return {
                data: [],
                pageCount: 0,
                total: 0,
            };
        }
    }
    async findAll() {
        try {
            const accessory = await this.db.accessory.findMany();
            return accessory;
        }
        catch (error) {
            (0, prisma_error_handler_1.handlePrismaError)(error);
        }
    }
    async findOne(id) {
        try {
            const accessory = await this.db.accessory.findUnique({
                where: { id },
            });
            return accessory;
        }
        catch (error) {
            (0, prisma_error_handler_1.handlePrismaError)(error);
        }
    }
    async findForDropdown() {
        try {
            const accessory = await this.db.accessory.findMany({
                select: {
                    id: true,
                    name: true,
                    image: true
                },
            });
            return accessory;
        }
        catch (error) {
            (0, prisma_error_handler_1.handlePrismaError)(error);
        }
    }
    async update(id, data, file) {
        const imagePath = file ? file.filename : data.image;
        try {
            const accessory = await this.db.accessory.findFirst({ where: { name: data.name, NOT: { id } } });
            if (accessory) {
                throw new common_1.BadRequestException(`อุปกรณ์ ${data.name} มีอยู่ในระบบแล้ว`);
            }
            const existingAccessory = await this.db.accessory.findUnique({
                where: { id },
                select: { image: true },
            });
            if (file) {
                await this.compressionService.compressFiles(file);
                if (existingAccessory?.image) {
                    const oldFilePath = path_1.default.join('public', 'accessory', existingAccessory.image);
                    await this.fileService.deleteFiles(oldFilePath);
                }
            }
            if (!file &&
                (!data.image ||
                    (typeof data.image === 'string' && data.image.trim() === '')) &&
                existingAccessory?.image) {
                const oldFilePath = path_1.default.join('public', 'accessory', existingAccessory.image);
                await this.fileService.deleteFiles(oldFilePath);
                data.image = null;
            }
            return await this.db.accessory.update({
                where: { id },
                data: {
                    ...data,
                    id: Number(data.id),
                    image: imagePath,
                },
            });
        }
        catch (error) {
            (0, prisma_error_handler_1.handlePrismaError)(error);
        }
    }
    async updateStatusOne(id, data) {
        try {
            return await this.db.accessory.update({ data, where: { id } });
        }
        catch (error) {
            (0, prisma_error_handler_1.handlePrismaError)(error);
        }
    }
    async updateStatusMany(id, status) {
        try {
            return await this.db.accessory.updateMany({
                where: {
                    id: {
                        in: id,
                    },
                },
                data: {
                    status: Number(status),
                },
            });
        }
        catch (error) {
            (0, prisma_error_handler_1.handlePrismaError)(error);
        }
    }
    async remove(id) {
        try {
            const accessory = await this.db.accessory.findUnique({
                where: { id },
                select: { image: true },
            });
            if (accessory?.image) {
                const filePath = path_1.default.join('public', 'accessory', accessory.image);
                await this.fileService.deleteFiles(filePath);
            }
            return await this.db.accessory.delete({
                where: { id },
            });
        }
        catch (error) {
            (0, prisma_error_handler_1.handlePrismaError)(error);
        }
    }
    async removeMany(id) {
        try {
            const admins = await this.db.accessory.findMany({
                where: { id: { in: id } },
                select: { image: true },
            });
            for (const accessory of admins) {
                if (accessory.image) {
                    const filePath = path_1.default.join('public', 'accessory', accessory.image);
                    await this.fileService.deleteFiles(filePath);
                }
            }
            return await this.db.accessory.deleteMany({
                where: { id: { in: id } },
            });
        }
        catch (error) {
            (0, prisma_error_handler_1.handlePrismaError)(error);
        }
    }
};
exports.AccessoryService = AccessoryService;
exports.AccessoryService = AccessoryService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        file_service_1.FileService,
        compression_service_1.CompressionService])
], AccessoryService);
//# sourceMappingURL=accessory.service.js.map