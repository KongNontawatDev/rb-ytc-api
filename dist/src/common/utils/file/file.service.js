"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var FileService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.FileService = void 0;
const common_1 = require("@nestjs/common");
const promises_1 = require("fs/promises");
const sharp_1 = __importDefault(require("sharp"));
let FileService = FileService_1 = class FileService {
    constructor() {
        this.logger = new common_1.Logger(FileService_1.name);
    }
    async deleteFiles(files) {
        const filePaths = [];
        if (typeof files === 'string') {
            filePaths.push(files);
        }
        else if (Array.isArray(files)) {
            filePaths.push(...files);
        }
        else if (typeof files === 'object') {
            for (const key in files) {
                if (Array.isArray(files[key])) {
                    filePaths.push(...files[key]);
                }
            }
        }
        for (const path of filePaths) {
            try {
                await (0, promises_1.unlink)(path);
                this.logger.log(`Successfully deleted file: ${path}`);
            }
            catch (error) {
                this.logger.error(`Error deleting file ${path}:`, error);
            }
        }
    }
    async checkTransparency(filePath) {
        const { channels } = await (0, sharp_1.default)(filePath).metadata();
        return channels === 4;
    }
    async coverToTransparency(file) {
        console.log('file path', file.path);
        await (0, sharp_1.default)(file.path)
            .toFormat('png')
            .png({ quality: 100 })
            .toFile(file.path);
    }
};
exports.FileService = FileService;
exports.FileService = FileService = FileService_1 = __decorate([
    (0, common_1.Injectable)()
], FileService);
//# sourceMappingURL=file.service.js.map