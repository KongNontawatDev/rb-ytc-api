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
Object.defineProperty(exports, "__esModule", { value: true });
exports.ValidationUploadExceptionFilter = void 0;
const file_service_1 = require("../utils/file/file.service");
const common_1 = require("@nestjs/common");
let ValidationUploadExceptionFilter = class ValidationUploadExceptionFilter {
    constructor(fileService) {
        this.fileService = fileService;
    }
    async catch(exception, host) {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse();
        const request = ctx.getRequest();
        const files = request.files;
        const file = request.file;
        try {
            if (files) {
                for (const file of files) {
                    await this.fileService.deleteFiles(file.path);
                }
            }
            else if (file) {
                await this.fileService.deleteFiles(file.path);
            }
        }
        catch (error) {
            console.error('เกิดข้อผิดพลาดในการลบไฟล์:', error);
        }
        response.status(400).json(exception.getResponse());
    }
};
exports.ValidationUploadExceptionFilter = ValidationUploadExceptionFilter;
exports.ValidationUploadExceptionFilter = ValidationUploadExceptionFilter = __decorate([
    (0, common_1.Catch)(common_1.BadRequestException),
    __metadata("design:paramtypes", [file_service_1.FileService])
], ValidationUploadExceptionFilter);
//# sourceMappingURL=uploadsFilter.js.map