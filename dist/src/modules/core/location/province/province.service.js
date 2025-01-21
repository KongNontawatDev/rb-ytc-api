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
exports.ProvinceService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../../../provider/prisma/prisma.service");
const prisma_error_handler_1 = require("../../../../common/exceptions/prisma-error.handler");
let ProvinceService = class ProvinceService {
    constructor(db) {
        this.db = db;
    }
    async create(data) {
        try {
            return await this.db.province.create({ data });
        }
        catch (error) {
            (0, prisma_error_handler_1.handlePrismaError)(error);
        }
    }
    async findByCondition(query) {
        const { textSearch, searchField, page, pageSize, sortField, sortOrder } = query;
        try {
            const where = {};
            const andConditions = [];
            if (textSearch && searchField) {
                const searchFields = searchField
                    .split(',')
                    .map((field) => field.trim());
                andConditions.push({
                    OR: searchFields.map((field) => ({
                        [field]: {
                            contains: textSearch,
                        },
                    })),
                });
            }
            if (andConditions.length > 0) {
                where['AND'] = andConditions;
            }
            console.log('where', where);
            const skip = (Number(page) - 1) * Number(pageSize);
            const [data, pageCount, total] = await Promise.all([
                this.db.province.findMany({
                    where,
                    skip: Number(skip),
                    take: Number(pageSize),
                    orderBy: sortField
                        ? {
                            [sortField]: sortOrder,
                        }
                        : undefined,
                }),
                this.db.province.count({ where }),
                this.db.province.count(),
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
            return await this.db.province.findMany();
        }
        catch (error) {
            (0, prisma_error_handler_1.handlePrismaError)(error);
        }
    }
    async findOne(id) {
        try {
            return await this.db.province.findFirst({ where: { id } });
        }
        catch (error) {
            (0, prisma_error_handler_1.handlePrismaError)(error);
        }
    }
    async update(id, data) {
        try {
            return await this.db.province.update({ data, where: { id } });
        }
        catch (error) {
            (0, prisma_error_handler_1.handlePrismaError)(error);
        }
    }
    async remove(id) {
        try {
            return await this.db.province.delete({
                where: { id },
            });
        }
        catch (error) {
            (0, prisma_error_handler_1.handlePrismaError)(error);
        }
    }
    async removeMany(id) {
        try {
            return await this.db.province.deleteMany({
                where: {
                    id: {
                        in: id
                    },
                },
            });
        }
        catch (error) {
            (0, prisma_error_handler_1.handlePrismaError)(error);
        }
    }
};
exports.ProvinceService = ProvinceService;
exports.ProvinceService = ProvinceService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], ProvinceService);
//# sourceMappingURL=province.service.js.map