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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AmphureController = void 0;
const common_1 = require("@nestjs/common");
const amphure_service_1 = require("./amphure.service");
const create_amphure_dto_1 = require("./dto/create-amphure.dto");
const update_amphure_dto_1 = require("./dto/update-amphure.dto");
const public_decorator_1 = require("../../../../common/decorators/public.decorator");
const params_amphure_dto_1 = require("./dto/params-amphure.dto");
const amphure_docs_1 = require("./amphure.docs");
const jwt_auth_guard_1 = require("../../../../provider/jwt/guards/jwt-auth.guard");
let AmphureController = class AmphureController {
    constructor(amphureService) {
        this.amphureService = amphureService;
    }
    async create(body) {
        let { sub, ...bodyData } = body;
        const data = await this.amphureService.create(bodyData);
        return {
            message: 'เพิ่มข้อมูลอำเภอ',
            error: 0,
            data,
        };
    }
    async findByCondition(query) {
        const hasQueryParams = query.textSearch ||
            query.searchField ||
            query.page ||
            query.pageSize ||
            query.sortField ||
            query.sortOrder;
        let result;
        if (hasQueryParams) {
            result = await this.amphureService.findByCondition(query);
        }
        else {
            const amphures = await this.amphureService.findAll();
            result = { data: amphures };
        }
        if (result) {
            return {
                message: 'เรียกดูข้อมูลผู้ใช้ทั้งหมด',
                ...(hasQueryParams && {
                    meta: {
                        page: Number(query.page) || 1,
                        pageSize: Number(query.pageSize) || 10,
                        pageCount: result.pageCount,
                        total: result.total,
                    },
                }),
                error: 0,
                data: result.data,
            };
        }
    }
    async findAll() {
        return await this.amphureService.findAll();
    }
    async findOne(params) {
        const data = await this.amphureService.findOne(+params.id);
        return {
            message: 'เรียกดูข้อมูลอำเภอตามรหัส',
            error: 0,
            data,
        };
    }
    async update(id, updateAmphureDto) {
        const data = await this.amphureService.update(+id, updateAmphureDto);
        return {
            message: 'แก้ไขข้อมูลอำเภอตามรหัส',
            error: 0,
            data,
        };
    }
    async remove(id) {
        const data = await this.amphureService.remove(+id);
        return {
            message: 'ลบข้อมูลอำเภอตามรหัส',
            error: 0,
            data,
        };
    }
    async removeMany(body) {
        const data = await this.amphureService.removeMany(body.id);
        return {
            message: 'ลบข้อมูลอำเภอตามรหัสที่เลือก',
            error: 0,
            data,
        };
    }
};
exports.AmphureController = AmphureController;
__decorate([
    (0, common_1.Post)(),
    amphure_docs_1.AmphureDocs.create(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_amphure_dto_1.CreateAmphureDto]),
    __metadata("design:returntype", Promise)
], AmphureController.prototype, "create", null);
__decorate([
    (0, common_1.Get)('/search'),
    amphure_docs_1.AmphureDocs.findByCondition(),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [params_amphure_dto_1.FindAmphuresByConditionQueryDto]),
    __metadata("design:returntype", Promise)
], AmphureController.prototype, "findByCondition", null);
__decorate([
    (0, common_1.Get)(),
    (0, public_decorator_1.Public)(),
    amphure_docs_1.AmphureDocs.findAll(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], AmphureController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    amphure_docs_1.AmphureDocs.findOne(),
    (0, common_1.UsePipes)(new common_1.ValidationPipe({ transform: true })),
    __param(0, (0, common_1.Param)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [params_amphure_dto_1.FindOneAmphureParamDto]),
    __metadata("design:returntype", Promise)
], AmphureController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(':id'),
    amphure_docs_1.AmphureDocs.update(),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_amphure_dto_1.UpdateAmphureDto]),
    __metadata("design:returntype", Promise)
], AmphureController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    amphure_docs_1.AmphureDocs.remove(),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], AmphureController.prototype, "remove", null);
__decorate([
    (0, common_1.Post)('delete-many'),
    amphure_docs_1.AmphureDocs.removeMany(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [update_amphure_dto_1.DeleteManyAmphureDto]),
    __metadata("design:returntype", Promise)
], AmphureController.prototype, "removeMany", null);
exports.AmphureController = AmphureController = __decorate([
    (0, common_1.Controller)({
        path: 'core/amphure',
        version: ['1'],
    }),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    __metadata("design:paramtypes", [amphure_service_1.AmphureService])
], AmphureController);
//# sourceMappingURL=amphure.controller.js.map