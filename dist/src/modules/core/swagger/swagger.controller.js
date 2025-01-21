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
exports.SwaggerController = void 0;
const common_1 = require("@nestjs/common");
const path_1 = require("path");
const fs_1 = require("fs");
const swagger_service_1 = require("./swagger.service");
let SwaggerController = class SwaggerController {
    constructor(swaggerService) {
        this.swaggerService = swaggerService;
    }
    getSwaggerJson(req, res) {
        const filePath = (0, path_1.join)(__dirname, '../../../../../swagger-spec.json');
        const swaggerData = (0, fs_1.readFileSync)(filePath, 'utf8');
        res.type('application/json').send(swaggerData);
    }
};
exports.SwaggerController = SwaggerController;
__decorate([
    (0, common_1.Get)(),
    (0, common_1.Version)(common_1.VERSION_NEUTRAL),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", void 0)
], SwaggerController.prototype, "getSwaggerJson", null);
exports.SwaggerController = SwaggerController = __decorate([
    (0, common_1.Controller)({
        path: 'core/swagger'
    }),
    __metadata("design:paramtypes", [swagger_service_1.SwaggerService])
], SwaggerController);
//# sourceMappingURL=swagger.controller.js.map