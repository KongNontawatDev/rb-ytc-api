"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CoreModule = void 0;
const common_1 = require("@nestjs/common");
const swagger_module_1 = require("./swagger/swagger.module");
const test_module_1 = require("./test/test.module");
const health_module_1 = require("./health/health.module");
const province_module_1 = require("./location/province/province.module");
const amphure_module_1 = require("./location/amphure/amphure.module");
const district_module_1 = require("./location/district/district.module");
let CoreModule = class CoreModule {
};
exports.CoreModule = CoreModule;
exports.CoreModule = CoreModule = __decorate([
    (0, common_1.Module)({
        imports: [swagger_module_1.SwaggerModule, test_module_1.TestModule, health_module_1.HealthModule, province_module_1.ProvinceModule, amphure_module_1.AmphureModule, district_module_1.DistrictModule]
    })
], CoreModule);
//# sourceMappingURL=core.module.js.map