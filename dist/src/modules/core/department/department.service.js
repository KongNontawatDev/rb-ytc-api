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
Object.defineProperty(exports, "__esModule", { value: true });
exports.DepartmentService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../../provider/prisma/prisma.service");
const prisma_error_handler_1 = require("../../../common/exceptions/prisma-error.handler");
let DepartmentService = class DepartmentService {
    constructor(db) {
        this.db = db;
    }
    async create(data) {
        try {
            const department = await this.db.department.findFirst({
                where: { name: data.name },
            });
            if (department) {
                throw new common_1.BadRequestException(`ชื่อแผนก/ฝ่ายงาน ${data.name} มีอยู่ในระบบแล้ว`);
            }
            return await this.db.department.create({ data });
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
                this.db.department.findMany({
                    where,
                    skip: Number(skip),
                    take: Number(pageSize),
                    orderBy: sortField
                        ? {
                            [sortField]: sortOrder,
                        }
                        : undefined,
                }),
                this.db.department.count({ where }),
                this.db.department.count(),
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
            return await this.db.department.findMany();
        }
        catch (error) {
            (0, prisma_error_handler_1.handlePrismaError)(error);
        }
    }
    async findOne(id) {
        try {
            return await this.db.department.findFirst({ where: { id } });
        }
        catch (error) {
            (0, prisma_error_handler_1.handlePrismaError)(error);
        }
    }
    async findForDropdown() {
        try {
            const department = await this.db.department.findMany({
                select: {
                    id: true,
                    name: true,
                },
            });
            return department;
        }
        catch (error) {
            (0, prisma_error_handler_1.handlePrismaError)(error);
        }
    }
    async update(id, data) {
        try {
            return await this.db.department.update({ data, where: { id } });
        }
        catch (error) {
            (0, prisma_error_handler_1.handlePrismaError)(error);
        }
    }
    async updateStatusOne(id, data) {
        try {
            return await this.db.department.update({ data, where: { id } });
        }
        catch (error) {
            (0, prisma_error_handler_1.handlePrismaError)(error);
        }
    }
    async updateStatusMany(ids, status) {
        try {
            return await this.db.department.updateMany({
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
    async remove(id) {
        try {
            return await this.db.department.delete({
                where: { id },
            });
        }
        catch (error) {
            (0, prisma_error_handler_1.handlePrismaError)(error);
        }
    }
    async removeMany(id) {
        try {
            return await this.db.department.deleteMany({
                where: {
                    id: {
                        in: id,
                    },
                },
            });
        }
        catch (error) {
            (0, prisma_error_handler_1.handlePrismaError)(error);
        }
    }
};
exports.DepartmentService = DepartmentService;
exports.DepartmentService = DepartmentService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], DepartmentService);
//# sourceMappingURL=department.service.js.map