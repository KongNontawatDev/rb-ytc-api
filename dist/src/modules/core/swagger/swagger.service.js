"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SwaggerService = void 0;
const common_1 = require("@nestjs/common");
let SwaggerService = class SwaggerService {
    create() {
        return 'This action adds a new swagger';
    }
    findAll() {
        return `This action returns all swagger`;
    }
    findOne(id) {
        return `This action returns a #${id} swagger`;
    }
    update(id) {
        return `This action updates a #${id} swagger`;
    }
    remove(id) {
        return `This action removes a #${id} swagger`;
    }
};
exports.SwaggerService = SwaggerService;
exports.SwaggerService = SwaggerService = __decorate([
    (0, common_1.Injectable)()
], SwaggerService);
//# sourceMappingURL=swagger.service.js.map