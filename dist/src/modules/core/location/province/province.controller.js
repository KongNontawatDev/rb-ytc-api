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
exports.ProvinceController = void 0;
const common_1 = require("@nestjs/common");
const province_service_1 = require("./province.service");
const create_province_dto_1 = require("./dto/create-province.dto");
const update_province_dto_1 = require("./dto/update-province.dto");
const public_decorator_1 = require("../../../../common/decorators/public.decorator");
const params_province_dto_1 = require("./dto/params-province.dto");
const province_docs_1 = require("./province.docs");
const jwt_auth_guard_1 = require("../../../../provider/jwt/guards/jwt-auth.guard");
let ProvinceController = class ProvinceController {
    constructor(provinceService) {
        this.provinceService = provinceService;
    }
    async create(body) {
        let { sub, ...bodyData } = body;
        const data = await this.provinceService.create(bodyData);
        return {
            message: 'เพิ่มข้อมูลจังหวัด',
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
            result = await this.provinceService.findByCondition(query);
        }
        else {
            const provinces = await this.provinceService.findAll();
            result = { data: provinces };
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
        return await this.provinceService.findAll();
    }
    async findOne(params) {
        const data = await this.provinceService.findOne(+params.id);
        return {
            message: 'เรียกดูข้อมูลจังหวัดตามรหัส',
            error: 0,
            data,
        };
    }
    async update(id, updateProvinceDto) {
        let { sub, ...body } = updateProvinceDto;
        const data = await this.provinceService.update(+id, body);
        return {
            message: 'แก้ไขข้อมูลจังหวัดตามรหัส',
            error: 0,
            data,
        };
    }
    async remove(id) {
        const data = await this.provinceService.remove(+id);
        return {
            message: 'ลบข้อมูลจังหวัดตามรหัส',
            error: 0,
            data,
        };
    }
    async removeMany(body) {
        const data = await this.provinceService.removeMany(body.id);
        return {
            message: 'ลบข้อมูลจังหวัดตามรหัสที่เลือก',
            error: 0,
            data,
        };
    }
};
exports.ProvinceController = ProvinceController;
__decorate([
    (0, common_1.Post)(),
    province_docs_1.ProvinceDocs.create(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_province_dto_1.CreateProvinceDto]),
    __metadata("design:returntype", Promise)
], ProvinceController.prototype, "create", null);
__decorate([
    (0, common_1.Get)('/search'),
    province_docs_1.ProvinceDocs.findByCondition(),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [params_province_dto_1.FindProvincesByConditionQueryDto]),
    __metadata("design:returntype", Promise)
], ProvinceController.prototype, "findByCondition", null);
__decorate([
    (0, common_1.Get)(),
    (0, public_decorator_1.Public)(),
    province_docs_1.ProvinceDocs.findAll(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], ProvinceController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    province_docs_1.ProvinceDocs.findOne(),
    (0, common_1.UsePipes)(new common_1.ValidationPipe({ transform: true })),
    __param(0, (0, common_1.Param)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [params_province_dto_1.FindOneProvinceParamDto]),
    __metadata("design:returntype", Promise)
], ProvinceController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(':id'),
    province_docs_1.ProvinceDocs.update(),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_province_dto_1.UpdateProvinceDto]),
    __metadata("design:returntype", Promise)
], ProvinceController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    province_docs_1.ProvinceDocs.remove(),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ProvinceController.prototype, "remove", null);
__decorate([
    (0, common_1.Post)('delete-many'),
    province_docs_1.ProvinceDocs.removeMany(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [update_province_dto_1.DeleteManyProvinceDto]),
    __metadata("design:returntype", Promise)
], ProvinceController.prototype, "removeMany", null);
exports.ProvinceController = ProvinceController = __decorate([
    (0, common_1.Controller)({
        path: 'core/province',
        version: ['1'],
    }),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    __metadata("design:paramtypes", [province_service_1.ProvinceService])
], ProvinceController);
//# sourceMappingURL=province.controller.js.map