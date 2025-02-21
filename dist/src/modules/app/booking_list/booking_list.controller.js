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
const date_service_1 = require("../../../common/utils/date/date.service");
const booking_list_service_1 = require("../../core/booking_list/booking_list.service");
const create_booking_list_dto_1 = require("../../core/booking_list/dto/create-booking_list.dto");
const params_booking_list_dto_1 = require("../../core/booking_list/dto/params-booking_list.dto");
const update_booking_list_dto_1 = require("../../core/booking_list/dto/update-booking_list.dto");
const common_1 = require("@nestjs/common");
const line_messaging_service_1 = require("../../../provider/line-messaging-api/line-messaging.service");
const booking_template_1 = require("../../../provider/line-messaging-api/templates/booking-template");
let BookingListController = class BookingListController {
    constructor(bookingListService, lineMessageingService, dateService) {
        this.bookingListService = bookingListService;
        this.lineMessageingService = lineMessageingService;
        this.dateService = dateService;
    }
    async findAll() {
        const booking_list = await this.bookingListService.findAll();
        return {
            message: 'เรียกดูข้อมูลรายการจองทั้งหมด',
            error: 0,
            data: booking_list,
        };
    }
    async findAllCurrentMonth() {
        const booking_list = await this.bookingListService.findAllCurrentMonth();
        return {
            message: 'เรียกดูข้อมูลรายการจองทั้งหมด',
            error: 0,
            data: booking_list,
        };
    }
    async findAllByUser(params) {
        const booking_list = await this.bookingListService.findManyByUser(+params.user_id);
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
    async findRoomBookedDates(params) {
        const data = await this.bookingListService.findRoomBookedDates(+params.room_id);
        return {
            message: 'เรียกดูข้อมูลวันที่จองตามรหัสห้อง',
            error: 0,
            data,
        };
    }
    async create(body) {
        const data = await this.bookingListService.create(body);
        if (data) {
            await this.lineMessageingService.pushMessage(data.user.line_id, (0, booking_template_1.bookingTemplate)('จองห้องประชุมแล้ว', data, '#34A853', this.dateService));
        }
        return {
            message: 'เพิ่มข้อมูลรายการจอง',
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
    async updateStatusOne(id, body) {
        const data = await this.bookingListService.updateStatusOne(+id, body);
        if (data) {
            await this.lineMessageingService.pushMessage(data.user.line_id, (0, booking_template_1.bookingTemplate)('ยกเลิกจองห้องประชุมแล้ว', data, '#EA4335', this.dateService));
        }
        return {
            message: 'แก้ไขสถานะรายการจองตามรหัส',
            error: 0,
            data,
        };
    }
};
exports.BookingListController = BookingListController;
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], BookingListController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)('by/month'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], BookingListController.prototype, "findAllCurrentMonth", null);
__decorate([
    (0, common_1.Get)('by/user/:user_id'),
    (0, common_1.UsePipes)(new common_1.ValidationPipe({ transform: true })),
    __param(0, (0, common_1.Param)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [params_booking_list_dto_1.findManyBookingListByUserDto]),
    __metadata("design:returntype", Promise)
], BookingListController.prototype, "findAllByUser", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, common_1.UsePipes)(new common_1.ValidationPipe({ transform: true })),
    __param(0, (0, common_1.Param)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [params_booking_list_dto_1.FindOneBookingListParamDto]),
    __metadata("design:returntype", Promise)
], BookingListController.prototype, "findOne", null);
__decorate([
    (0, common_1.Get)('room/booking_date/:room_id'),
    (0, common_1.UsePipes)(new common_1.ValidationPipe({ transform: true })),
    __param(0, (0, common_1.Param)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [params_booking_list_dto_1.FindRoomBookingDateParamDto]),
    __metadata("design:returntype", Promise)
], BookingListController.prototype, "findRoomBookedDates", null);
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_booking_list_dto_1.CreateBookingListDto]),
    __metadata("design:returntype", Promise)
], BookingListController.prototype, "create", null);
__decorate([
    (0, common_1.Patch)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_booking_list_dto_1.UpdateBookingListDto]),
    __metadata("design:returntype", Promise)
], BookingListController.prototype, "update", null);
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
        path: 'app/booking_list',
        version: '1',
    }),
    __metadata("design:paramtypes", [booking_list_service_1.BookingListService,
        line_messaging_service_1.LineMessagingService,
        date_service_1.DateService])
], BookingListController);
//# sourceMappingURL=booking_list.controller.js.map