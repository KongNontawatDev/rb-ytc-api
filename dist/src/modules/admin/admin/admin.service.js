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
exports.AdminService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../../provider/prisma/prisma.service");
const prisma_error_handler_1 = require("../../../common/exceptions/prisma-error.handler");
const file_service_1 = require("../../../common/utils/file/file.service");
const path_1 = __importDefault(require("path"));
const compression_service_1 = require("../../../common/utils/compression/compression.service");
const auth_service_1 = require("../auth/auth.service");
let AdminService = class AdminService {
    constructor(db, fileService, compressionService, authService) {
        this.db = db;
        this.fileService = fileService;
        this.compressionService = compressionService;
        this.authService = authService;
    }
    async create(data, file) {
        try {
            const adminExistsName = await this.db.admin.findFirst({
                where: { name: data.name },
            });
            if (adminExistsName) {
                throw new common_1.BadRequestException(`แอดมินชื่อ ${data.name} มีอยู่ในระบบแล้ว`);
            }
            const adminExistsEmail = await this.db.admin.findUnique({
                where: { email: data.email },
            });
            if (adminExistsEmail) {
                throw new common_1.BadRequestException(`อีเมล ${data.email} มีอยู่ในระบบแล้ว`);
            }
            const imagePath = file ? file.filename : null;
            if (file) {
                await this.compressionService.compressFiles(file);
            }
            const hashedPassword = await this.authService.hashData(data.password);
            const admin = await this.db.admin.create({
                data: {
                    email: data.email,
                    name: data.name,
                    image: imagePath,
                    status: 1,
                    role_id: data.role_id,
                    password: hashedPassword,
                },
                select: {
                    id: true,
                    email: true,
                    image: true,
                    name: true,
                    role_id: true,
                    status: true,
                    created_at: true,
                    updated_at: true,
                },
            });
            return admin;
        }
        catch (error) {
            (0, prisma_error_handler_1.handlePrismaError)(error);
        }
    }
    async findByCondition(query) {
        const { textSearch, searchField, page, pageSize, sortField, sortOrder, status, role_id } = query;
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
            if (role_id) {
                const role_idValues = role_id
                    .split(',')
                    .map((value) => Number(value.trim()));
                andConditions.push({
                    OR: role_idValues.map((role_idValue) => ({
                        role_id: role_idValue,
                    })),
                });
            }
            if (andConditions.length > 0) {
                where['AND'] = andConditions;
            }
            const skip = (Number(page) - 1) * Number(pageSize);
            const [data, pageCount, total] = await Promise.all([
                this.db.admin.findMany({
                    where,
                    include: {
                        role: {
                            select: {
                                id: true,
                                name: true
                            }
                        }
                    },
                    skip: Number(skip),
                    take: Number(pageSize),
                    orderBy: sortField
                        ? {
                            [sortField]: sortOrder,
                        }
                        : undefined,
                }),
                this.db.admin.count({ where }),
                this.db.admin.count(),
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
            const admin = await this.db.admin.findMany();
            return admin;
        }
        catch (error) {
            (0, prisma_error_handler_1.handlePrismaError)(error);
        }
    }
    async findOne(id) {
        try {
            const admin = await this.db.admin.findUnique({
                where: { id },
            });
            return admin;
        }
        catch (error) {
            (0, prisma_error_handler_1.handlePrismaError)(error);
        }
    }
    async update(id, data, file) {
        const imagePath = file ? file.filename : data.image;
        try {
            const adminExistsName = await this.db.admin.findFirst({
                where: { name: data.name, NOT: { id } },
            });
            if (adminExistsName) {
                throw new common_1.BadRequestException(`แอดมินชื่อ ${data.name} มีอยู่ในระบบแล้ว`);
            }
            const adminExistsEmail = await this.db.admin.findUnique({
                where: { email: data.email, NOT: { id } },
            });
            if (adminExistsEmail) {
                throw new common_1.BadRequestException(`อีเมล ${data.email} มีอยู่ในระบบแล้ว`);
            }
            const existingAdmin = await this.db.admin.findUnique({
                where: { id },
                select: { image: true },
            });
            if (file) {
                if (existingAdmin?.image) {
                    const oldFilePath = path_1.default.join('public', 'admin', existingAdmin.image);
                    await this.fileService.deleteFiles(oldFilePath);
                }
                await this.compressionService.compressFiles(file);
            }
            if (!file &&
                (!data.image ||
                    (typeof data.image === 'string' && data.image.trim() === '')) &&
                existingAdmin?.image) {
                const oldFilePath = path_1.default.join('public', 'admin', existingAdmin.image);
                await this.fileService.deleteFiles(oldFilePath);
                data.image = null;
            }
            return await this.db.admin.update({
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
            return await this.db.admin.updateMany({
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
            return await this.db.admin.update({ data, where: { id } });
        }
        catch (error) {
            (0, prisma_error_handler_1.handlePrismaError)(error);
        }
    }
    async remove(id) {
        try {
            const admin = await this.db.admin.findUnique({
                where: { id },
                select: { image: true },
            });
            if (admin?.image) {
                const filePath = path_1.default.join('public', 'admin', admin.image);
                await this.fileService.deleteFiles(filePath);
            }
            return await this.db.admin.delete({
                where: { id },
            });
        }
        catch (error) {
            (0, prisma_error_handler_1.handlePrismaError)(error);
        }
    }
    async removeMany(id) {
        try {
            const admins = await this.db.admin.findMany({
                where: { id: { in: id } },
                select: { image: true },
            });
            for (const admin of admins) {
                if (admin.image) {
                    const filePath = path_1.default.join('public', 'admin', admin.image);
                    await this.fileService.deleteFiles(filePath);
                }
            }
            return await this.db.admin.deleteMany({
                where: { id: { in: id } },
            });
        }
        catch (error) {
            (0, prisma_error_handler_1.handlePrismaError)(error);
        }
    }
};
exports.AdminService = AdminService;
exports.AdminService = AdminService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        file_service_1.FileService,
        compression_service_1.CompressionService,
        auth_service_1.AuthService])
], AdminService);
//# sourceMappingURL=admin.service.js.map