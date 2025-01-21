"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdminModule = void 0;
const common_1 = require("@nestjs/common");
const user_module_1 = require("./user/user.module");
const admin_module_1 = require("./admin/admin.module");
const accessory_module_1 = require("./accessory/accessory.module");
const department_module_1 = require("./department/department.module");
const room_module_1 = require("./room/room.module");
const booking_list_module_1 = require("./booking_list/booking_list.module");
const dashboard_module_1 = require("./dashboard/dashboard.module");
let AdminModule = class AdminModule {
};
exports.AdminModule = AdminModule;
exports.AdminModule = AdminModule = __decorate([
    (0, common_1.Module)({
        imports: [user_module_1.UserModule, admin_module_1.AdminModule, accessory_module_1.AccessoryModule, department_module_1.DepartmentModule, room_module_1.RoomModule, booking_list_module_1.BookingListModule, dashboard_module_1.DashboardModule]
    })
], AdminModule);
//# sourceMappingURL=admin.module.js.map