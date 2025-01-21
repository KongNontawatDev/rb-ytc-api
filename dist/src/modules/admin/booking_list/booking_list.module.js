"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BookingListModule = void 0;
const common_1 = require("@nestjs/common");
const booking_list_controller_1 = require("./booking_list.controller");
const booking_list_service_1 = require("../../core/booking_list/booking_list.service");
const booking_list_module_1 = require("../../core/booking_list/booking_list.module");
const date_module_1 = require("../../../common/utils/date/date.module");
let BookingListModule = class BookingListModule {
};
exports.BookingListModule = BookingListModule;
exports.BookingListModule = BookingListModule = __decorate([
    (0, common_1.Module)({
        imports: [booking_list_module_1.BookingListCoreModule, date_module_1.DateModule],
        controllers: [booking_list_controller_1.BookingListController],
        providers: [booking_list_service_1.BookingListService],
    })
], BookingListModule);
//# sourceMappingURL=booking_list.module.js.map