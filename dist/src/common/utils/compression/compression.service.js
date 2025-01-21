"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var CompressionService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.CompressionService = void 0;
const common_1 = require("@nestjs/common");
const fs_1 = require("fs");
const sharp = require('sharp');
let CompressionService = CompressionService_1 = class CompressionService {
    constructor() {
        this.logger = new common_1.Logger(CompressionService_1.name);
    }
    async compressImage(filePath) {
        const tempFilePath = `${filePath}.temp`;
        try {
            const metadata = await sharp(filePath).metadata();
            const sharpInstance = sharp(filePath);
            if (metadata.format === 'jpeg' || metadata.format === 'jpg') {
                await sharpInstance
                    .jpeg({ quality: 80 })
                    .toFile(tempFilePath);
            }
            else if (metadata.format === 'png') {
                await sharpInstance
                    .png({ compressionLevel: 9 })
                    .toFile(tempFilePath);
            }
            else {
                await sharpInstance.toFile(tempFilePath);
            }
            await fs_1.promises.rename(tempFilePath, filePath);
            this.logger.log(`Compressed file: ${filePath}`);
            return filePath;
        }
        catch (error) {
            this.logger.error(`Failed to compress file: ${filePath}`, error);
            await fs_1.promises.unlink(tempFilePath).catch(() => { });
            throw error;
        }
    }
    async compressFiles(files) {
        const compressedFiles = {};
        const compress = async (file) => {
            return await this.compressImage(file.path);
        };
        if (Array.isArray(files)) {
            compressedFiles['default'] = await Promise.all(files.map(compress));
        }
        else if (files.fieldname) {
            compressedFiles['default'] = [await compress(files)];
        }
        else {
            for (const field in files) {
                compressedFiles[field] = await Promise.all(files[field].map(compress));
            }
        }
        return compressedFiles;
    }
};
exports.CompressionService = CompressionService;
exports.CompressionService = CompressionService = CompressionService_1 = __decorate([
    (0, common_1.Injectable)()
], CompressionService);
//# sourceMappingURL=compression.service.js.map