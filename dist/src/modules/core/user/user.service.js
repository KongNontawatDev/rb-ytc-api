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
exports.UserService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../../provider/prisma/prisma.service");
const prisma_error_handler_1 = require("../../../common/exceptions/prisma-error.handler");
const file_service_1 = require("../../../common/utils/file/file.service");
const path_1 = __importDefault(require("path"));
const compression_service_1 = require("../../../common/utils/compression/compression.service");
let UserService = class UserService {
    constructor(db, fileService, compressionService) {
        this.db = db;
        this.fileService = fileService;
        this.compressionService = compressionService;
    }
    async create(data, file) {
        const imagePath = file ? file.filename : data.image;
        if (file) {
            await this.compressionService.compressFiles(file);
        }
        try {
            return await this.db.user.create({
                data: {
                    ...data,
                    department_id: Number(data.department_id),
                    image: String(imagePath),
                },
            });
        }
        catch (error) {
            (0, prisma_error_handler_1.handlePrismaError)(error);
        }
    }
    async findByCondition(query) {
        const { textSearch, searchField, page, pageSize, sortField, sortOrder, status, department_id, } = query;
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
            if (department_id) {
                const Values = department_id
                    .split(',')
                    .map((value) => Number(value.trim()));
                andConditions.push({
                    OR: Values.map((statusValue) => ({
                        department_id: statusValue,
                    })),
                });
            }
            if (andConditions.length > 0) {
                where['AND'] = andConditions;
            }
            console.log('where', where);
            const skip = (Number(page) - 1) * Number(pageSize);
            const [data, pageCount, total] = await Promise.all([
                this.db.user.findMany({
                    where,
                    include: {
                        department: {
                            select: {
                                id: true,
                                name: true,
                            },
                        },
                    },
                    skip: Number(skip),
                    take: Number(pageSize),
                    orderBy: sortField
                        ? {
                            [sortField]: sortOrder,
                        }
                        : undefined,
                }),
                this.db.user.count({ where }),
                this.db.user.count(),
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
            const user = await this.db.user.findMany();
            return user;
        }
        catch (error) {
            (0, prisma_error_handler_1.handlePrismaError)(error);
        }
    }
    async findForDropdown() {
        try {
            const user = await this.db.user.findMany({
                select: {
                    id: true,
                    full_name: true,
                    department_id: true,
                    tel: true
                },
            });
            return user;
        }
        catch (error) {
            (0, prisma_error_handler_1.handlePrismaError)(error);
        }
    }
    async findOne(id) {
        try {
            const user = await this.db.user.findUnique({
                where: { id },
                include: {
                    booking_list: {
                        select: {
                            title: true,
                            book_start: true,
                            book_end: true,
                            room: {
                                select: {
                                    name: true,
                                }
                            }
                        },
                        orderBy: {
                            book_start: "desc"
                        }
                    }
                }
            });
            return user;
        }
        catch (error) {
            (0, prisma_error_handler_1.handlePrismaError)(error);
        }
    }
    async update(id, data, file) {
        const imagePath = file ? file.filename : data.image;
        try {
            const existingUser = await this.db.user.findUnique({
                where: { id },
                select: { image: true },
            });
            if (file) {
                if (existingUser?.image) {
                    const oldFilePath = path_1.default.join('public', 'user', existingUser.image);
                    await this.fileService.deleteFiles(oldFilePath);
                }
                await this.compressionService.compressFiles(file);
            }
            if (!file &&
                (!data.image ||
                    (typeof data.image === 'string' && data.image.trim() === '')) &&
                existingUser?.image) {
                const oldFilePath = path_1.default.join('public', 'user', existingUser.image);
                await this.fileService.deleteFiles(oldFilePath);
                data.image = null;
            }
            return await this.db.user.update({
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
    async updateStatusMany(ids, status) {
        try {
            return await this.db.user.updateMany({
                where: {
                    id: {
                        in: ids,
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
    async updateStatusOne(id, data) {
        try {
            return await this.db.user.update({ data, where: { id } });
        }
        catch (error) {
            (0, prisma_error_handler_1.handlePrismaError)(error);
        }
    }
    async remove(id) {
        try {
            const user = await this.db.user.findUnique({
                where: { id },
                select: { image: true },
            });
            if (user?.image) {
                const filePath = path_1.default.join('public', 'user', user.image);
                await this.fileService.deleteFiles(filePath);
            }
            return await this.db.user.delete({
                where: { id },
            });
        }
        catch (error) {
            (0, prisma_error_handler_1.handlePrismaError)(error);
        }
    }
    async removeMany(id) {
        try {
            const admins = await this.db.user.findMany({
                where: { id: { in: id } },
                select: { image: true },
            });
            for (const user of admins) {
                if (user.image) {
                    const filePath = path_1.default.join('public', 'user', user.image);
                    await this.fileService.deleteFiles(filePath);
                }
            }
            return await this.db.user.deleteMany({
                where: { id: { in: id } },
            });
        }
        catch (error) {
            (0, prisma_error_handler_1.handlePrismaError)(error);
        }
    }
};
exports.UserService = UserService;
exports.UserService = UserService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        file_service_1.FileService,
        compression_service_1.CompressionService])
], UserService);
//# sourceMappingURL=user.service.js.map