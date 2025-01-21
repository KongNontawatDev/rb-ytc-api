"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AccessoryModule = void 0;
const common_1 = require("@nestjs/common");
const accessory_service_1 = require("./accessory.service");
const file_module_1 = require("../../../common/utils/file/file.module");
const compression_module_1 = require("../../../common/utils/compression/compression.module");
const access_control_module_1 = require("../../admin/access-control/access-control.module");
let AccessoryModule = class AccessoryModule {
};
exports.AccessoryModule = AccessoryModule;
exports.AccessoryModule = AccessoryModule = __decorate([
    (0, common_1.Module)({
        imports: [file_module_1.FileModule, compression_module_1.CompressionModule, access_control_module_1.AccessControlModule],
        providers: [accessory_service_1.AccessoryService],
    })
], AccessoryModule);
//# sourceMappingURL=accessory.module.js.map