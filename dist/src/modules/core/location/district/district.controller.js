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
exports.DistrictController = void 0;
const common_1 = require("@nestjs/common");
const district_service_1 = require("./district.service");
const create_district_dto_1 = require("./dto/create-district.dto");
const update_district_dto_1 = require("./dto/update-district.dto");
const public_decorator_1 = require("../../../../common/decorators/public.decorator");
const params_district_dto_1 = require("./dto/params-district.dto");
const district_docs_1 = require("./district.docs");
const jwt_auth_guard_1 = require("../../../../provider/jwt/guards/jwt-auth.guard");
let DistrictController = class DistrictController {
    constructor(districtService) {
        this.districtService = districtService;
    }
    async create(body) {
        let { sub, ...bodyData } = body;
        const data = await this.districtService.create(bodyData);
        return {
            message: 'เพิ่มข้อมูลตำบล',
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
            result = await this.districtService.findByCondition(query);
        }
        else {
            const districts = await this.districtService.findAll();
            result = { data: districts };
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
        return await this.districtService.findAll();
    }
    async findOne(params) {
        const data = await this.districtService.findOne(+params.id);
        return {
            message: 'เรียกดูข้อมูลตำบลตามรหัส',
            error: 0,
            data,
        };
    }
    async update(id, updateDistrictDto) {
        const data = await this.districtService.update(+id, updateDistrictDto);
        return {
            message: 'แก้ไขข้อมูลตำบลตามรหัส',
            error: 0,
            data,
        };
    }
    async remove(id) {
        const data = await this.districtService.remove(+id);
        return {
            message: 'ลบข้อมูลตำบลตามรหัส',
            error: 0,
            data,
        };
    }
    async removeMany(body) {
        const data = await this.districtService.removeMany(body.id);
        return {
            message: 'ลบข้อมูลตำบลตามรหัสที่เลือก',
            error: 0,
            data,
        };
    }
};
exports.DistrictController = DistrictController;
__decorate([
    (0, common_1.Post)(),
    district_docs_1.DistrictDocs.create(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_district_dto_1.CreateDistrictDto]),
    __metadata("design:returntype", Promise)
], DistrictController.prototype, "create", null);
__decorate([
    (0, common_1.Get)('/search'),
    district_docs_1.DistrictDocs.findByCondition(),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [params_district_dto_1.FindDistrictsByConditionQueryDto]),
    __metadata("design:returntype", Promise)
], DistrictController.prototype, "findByCondition", null);
__decorate([
    (0, common_1.Get)(),
    (0, public_decorator_1.Public)(),
    district_docs_1.DistrictDocs.findAll(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], DistrictController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    district_docs_1.DistrictDocs.findOne(),
    (0, common_1.UsePipes)(new common_1.ValidationPipe({ transform: true })),
    __param(0, (0, common_1.Param)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [params_district_dto_1.FindOneDistrictParamDto]),
    __metadata("design:returntype", Promise)
], DistrictController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(':id'),
    district_docs_1.DistrictDocs.update(),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_district_dto_1.UpdateDistrictDto]),
    __metadata("design:returntype", Promise)
], DistrictController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    district_docs_1.DistrictDocs.remove(),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], DistrictController.prototype, "remove", null);
__decorate([
    (0, common_1.Post)('delete-many'),
    district_docs_1.DistrictDocs.removeMany(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [update_district_dto_1.DeleteManyDistrictDto]),
    __metadata("design:returntype", Promise)
], DistrictController.prototype, "removeMany", null);
exports.DistrictController = DistrictController = __decorate([
    (0, common_1.Controller)({
        path: 'core/district',
        version: ['1'],
    }),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    __metadata("design:paramtypes", [district_service_1.DistrictService])
], DistrictController);
//# sourceMappingURL=district.controller.js.map