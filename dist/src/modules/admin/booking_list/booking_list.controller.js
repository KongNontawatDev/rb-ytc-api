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
exports.BookingListController = void 0;
const booking_list_service_1 = require("../../core/booking_list/booking_list.service");
const create_booking_list_dto_1 = require("../../core/booking_list/dto/create-booking_list.dto");
const params_booking_list_dto_1 = require("../../core/booking_list/dto/params-booking_list.dto");
const update_booking_list_dto_1 = require("../../core/booking_list/dto/update-booking_list.dto");
const common_1 = require("@nestjs/common");
let BookingListController = class BookingListController {
    constructor(bookingListService) {
        this.bookingListService = bookingListService;
    }
    async create(body) {
        const data = await this.bookingListService.create(body);
        return {
            message: 'เพิ่มข้อมูลรายการจอง',
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
            result = await this.bookingListService.findByCondition(query);
        }
        else {
            const booking_lists = await this.bookingListService.findAll();
            result = { data: booking_lists };
        }
        if (result) {
            return {
                message: 'เรียกดูข้อมูลรายการจองทั้งหมด',
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
        const booking_list = await this.bookingListService.findAll();
        return {
            message: 'เรียกดูข้อมูลรายการจองทั้งหมด',
            error: 0,
            data: booking_list,
        };
    }
    async findOne(params) {
        const data = await this.bookingListService.findOne(+params.id);
        return {
            message: 'เรียกดูข้อมูลรายการจองตามรหัส',
            error: 0,
            data,
        };
    }
    async findCount() {
        const data = await this.bookingListService.findCount();
        return {
            message: 'เรียกดูข้อมูลจำนวนรายการจอง',
            error: 0,
            data,
        };
    }
    async findManyByRoomForCalendarAndTimeline(params) {
        const data = await this.bookingListService.findManyByRoomForCalendarAndTimeline(+params.room_id);
        return {
            message: 'เรียกดูข้อมูลรายการจองตามรหัสห้อง',
            error: 0,
            data,
        };
    }
    async findManyByUserForCalendarAndTimeline(params) {
        const data = await this.bookingListService.findManyByRoomForCalendarAndTimeline(+params.user_id);
        return {
            message: 'เรียกดูข้อมูลรายการจองตามรหัสผู้ใช้',
            error: 0,
            data,
        };
    }
    async update(id, body) {
        const data = await this.bookingListService.update(+id, body);
        return {
            message: 'แก้ไขข้อมูลรายการจองตามรหัส',
            error: 0,
            data,
        };
    }
    async remove(id) {
        const data = await this.bookingListService.remove(+id);
        return {
            message: 'ลบข้อมูลรายการจองตามรหัส',
            error: 0,
            data,
        };
    }
    async removeMany(body) {
        const data = await this.bookingListService.removeMany(body.id);
        return {
            message: 'ลบข้อมูลรายการจองตามรหัสที่เลือก',
            error: 0,
            data,
        };
    }
    async updateStatusMany(body) {
        const data = await this.bookingListService.updateStatusMany(body.id, body.status);
        return {
            message: 'เปลี่ยนสถานะรายการจองหลายแถว',
            error: 0,
            data,
        };
    }
    async updateStatusOne(id, body) {
        const data = await this.bookingListService.updateStatusOne(+id, body);
        return {
            message: 'แก้ไขสถานะรายการจองตามรหัส',
            error: 0,
            data,
        };
    }
};
exports.BookingListController = BookingListController;
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_booking_list_dto_1.CreateBookingListDto]),
    __metadata("design:returntype", Promise)
], BookingListController.prototype, "create", null);
__decorate([
    (0, common_1.Get)('/search'),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [params_booking_list_dto_1.FindBookingListsByConditionQueryDto]),
    __metadata("design:returntype", Promise)
], BookingListController.prototype, "findByCondition", null);
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], BookingListController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, common_1.UsePipes)(new common_1.ValidationPipe({ transform: true })),
    __param(0, (0, common_1.Param)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [params_booking_list_dto_1.FindOneBookingListParamDto]),
    __metadata("design:returntype", Promise)
], BookingListController.prototype, "findOne", null);
__decorate([
    (0, common_1.Get)('list/count'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], BookingListController.prototype, "findCount", null);
__decorate([
    (0, common_1.Get)('room/calendar-and-timeline/:room_id'),
    (0, common_1.UsePipes)(new common_1.ValidationPipe({ transform: true })),
    __param(0, (0, common_1.Param)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [params_booking_list_dto_1.findManyBookingListByRoomForCalendarAndTimelineParamDto]),
    __metadata("design:returntype", Promise)
], BookingListController.prototype, "findManyByRoomForCalendarAndTimeline", null);
__decorate([
    (0, common_1.Get)('user/calendar-and-timeline/:user_id'),
    (0, common_1.UsePipes)(new common_1.ValidationPipe({ transform: true })),
    __param(0, (0, common_1.Param)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [params_booking_list_dto_1.findManyBookingListByUserForCalendarAndTimelineParamDto]),
    __metadata("design:returntype", Promise)
], BookingListController.prototype, "findManyByUserForCalendarAndTimeline", null);
__decorate([
    (0, common_1.Patch)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_booking_list_dto_1.UpdateBookingListDto]),
    __metadata("design:returntype", Promise)
], BookingListController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], BookingListController.prototype, "remove", null);
__decorate([
    (0, common_1.Post)('delete-many'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [params_booking_list_dto_1.DeleteManyBookingListDto]),
    __metadata("design:returntype", Promise)
], BookingListController.prototype, "removeMany", null);
__decorate([
    (0, common_1.Post)('update-status-many'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [params_booking_list_dto_1.UpdateManyBookingListDto]),
    __metadata("design:returntype", Promise)
], BookingListController.prototype, "updateStatusMany", null);
__decorate([
    (0, common_1.Patch)('update/status/:id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_booking_list_dto_1.UpdateStatusBookingListDto]),
    __metadata("design:returntype", Promise)
], BookingListController.prototype, "updateStatusOne", null);
exports.BookingListController = BookingListController = __decorate([
    (0, common_1.Controller)({
        path: 'admin/booking_list',
        version: '1',
    }),
    __metadata("design:paramtypes", [booking_list_service_1.BookingListService])
], BookingListController);
//# sourceMappingURL=booking_list.controller.js.map