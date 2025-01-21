"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.S3FileUploadService = void 0;
const common_1 = require("@nestjs/common");
const multerS3 = __importStar(require("multer-s3"));
const aws_sdk_1 = require("aws-sdk");
const path_1 = require("path");
const uuid_1 = require("uuid");
let S3FileUploadService = class S3FileUploadService {
    constructor() {
        this.s3 = new aws_sdk_1.S3({
            accessKeyId: 'your-access-key-id',
            secretAccessKey: 'your-secret-access-key',
            region: 'your-region',
        });
    }
    s3FileUploadOptions(options) {
        const { bucketName, maxFileSize, mimeTypes, fields } = options;
        const storage = multerS3({
            s3: this.s3,
            bucket: bucketName,
            metadata: (req, file, cb) => {
                cb(null, { fieldName: file.fieldname });
            },
            key: (req, file, cb) => {
                try {
                    const uniqueFileName = `${Date.now()}-${(0, uuid_1.v4)()}${(0, path_1.extname)(file.originalname)}`;
                    cb(null, uniqueFileName);
                }
                catch (error) {
                    cb(new common_1.BadRequestException('Error generating unique filename'), error);
                }
            },
        });
        const fileFilter = (req, file, callback) => {
            const allowedMimeTypes = Array.isArray(mimeTypes) ? mimeTypes : [mimeTypes];
            if (!allowedMimeTypes.includes(file.mimetype)) {
                const errorMessage = `Unsupported file type: ${file.mimetype}. Allowed types: ${allowedMimeTypes.join(', ')}`;
                callback(new common_1.BadRequestException(errorMessage), false);
            }
            else {
                callback(null, true);
            }
        };
        const fieldsObject = fields.reduce((acc, field) => {
            acc[field] = { storage, limits: { fileSize: maxFileSize }, fileFilter };
            return acc;
        }, {});
        return fieldsObject;
    }
};
exports.S3FileUploadService = S3FileUploadService;
exports.S3FileUploadService = S3FileUploadService = __decorate([
    (0, common_1.Injectable)()
], S3FileUploadService);
//# sourceMappingURL=s3.service.js.map