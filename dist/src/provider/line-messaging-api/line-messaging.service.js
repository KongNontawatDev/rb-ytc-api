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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LineMessagingService = void 0;
const common_1 = require("@nestjs/common");
const axios_1 = __importDefault(require("axios"));
let LineMessagingService = class LineMessagingService {
    constructor() {
        this.axiosInstance = axios_1.default.create({
            baseURL: 'https://api.line.me/v2/bot/message',
            headers: {
                Authorization: `Bearer ULA/AkKAYmb4Gg9qj4xdnk5hSBgg7wSV8EWPleMkZVTa1hfpW10yFXg2xmxVHD2tldu2JTNS5cKvERF6DdGa8nA4qMZ4rRHpfzEPM1bQ9wKba8ykhFe9Pv8lgcyjDvWr4acogHnmTY48bBjAVDQsFAdB04t89/1O/w1cDnyilFU=`,
                'Content-Type': 'application/json',
            },
        });
    }
    async pushMessage(to, messages) {
        try {
            const response = await this.axiosInstance.post('/push', {
                to,
                messages,
            });
            return response.data;
        }
        catch (error) {
            console.log(error);
            throw new common_1.HttpException(error.response?.data || 'LINE API Error', error.response?.status || common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async replyMessage(replyToken, messages) {
        try {
            const response = await this.axiosInstance.post('/reply', {
                replyToken,
                messages,
            });
            return response.data;
        }
        catch (error) {
            throw new common_1.HttpException(error.response?.data || 'LINE API Error', error.response?.status || common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    createTemplateMessage(altText, template) {
        return {
            type: 'template',
            altText,
            template,
        };
    }
};
exports.LineMessagingService = LineMessagingService;
exports.LineMessagingService = LineMessagingService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [])
], LineMessagingService);
//# sourceMappingURL=line-messaging.service.js.map