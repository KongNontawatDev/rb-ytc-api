"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AmphureModule = void 0;
const common_1 = require("@nestjs/common");
const amphure_service_1 = require("./amphure.service");
const amphure_controller_1 = require("./amphure.controller");
const access_control_module_1 = require("../../../admin/access-control/access-control.module");
const auth_module_1 = require("../../../admin/auth/auth.module");
let AmphureModule = class AmphureModule {
};
exports.AmphureModule = AmphureModule;
exports.AmphureModule = AmphureModule = __decorate([
    (0, common_1.Module)({
        imports: [auth_module_1.AuthModule, access_control_module_1.AccessControlModule],
        controllers: [amphure_controller_1.AmphureController,],
        providers: [amphure_service_1.AmphureService],
    })
], AmphureModule);
//# sourceMappingURL=amphure.module.js.map