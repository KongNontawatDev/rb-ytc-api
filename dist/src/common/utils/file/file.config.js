"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.fileUploadOptions = void 0;
const common_1 = require("@nestjs/common");
const multer_1 = require("multer");
const path_1 = require("path");
const uuid_1 = require("uuid");
const fileUploadOptions = ({ destination, maxFileSize, mimeTypes, }) => {
    return {
        storage: (0, multer_1.diskStorage)({
            destination,
            filename: (req, file, callback) => {
                try {
                    const uniqueSuffix = `${(0, uuid_1.v4)()}${(0, path_1.extname)(file.originalname)}`;
                    callback(null, uniqueSuffix);
                }
                catch (error) {
                    callback(new common_1.BadRequestException('Error generating unique filename'), error);
                }
            },
        }),
        limits: {
            fileSize: maxFileSize,
        },
        fileFilter: (req, file, callback) => {
            try {
                const allowedMimeTypes = Array.isArray(mimeTypes) ? mimeTypes : [mimeTypes];
                if (!allowedMimeTypes.includes(file.mimetype)) {
                    const errorMessage = `ไม่รองรับไฟล์ประเภท: ${file.mimetype}. รองรับเฉพาะไฟล์: ${allowedMimeTypes.join(', ')}`;
                    callback(new common_1.BadRequestException(errorMessage), false);
                }
                else {
                    callback(null, true);
                }
            }
            catch (error) {
                callback(new common_1.BadRequestException('Error while checking file type'), false);
            }
        },
    };
};
exports.fileUploadOptions = fileUploadOptions;
//# sourceMappingURL=file.config.js.map