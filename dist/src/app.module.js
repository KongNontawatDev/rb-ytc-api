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
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const prisma_module_1 = require("./provider/prisma/prisma.module");
const logger_module_1 = require("./common/logger/logger.module");
const logger_service_1 = require("./common/logger/logger.service");
const admin_module_1 = require("./modules/admin/admin.module");
const core_module_1 = require("./modules/core/core.module");
const core_1 = require("@nestjs/core");
const http_intercetor_1 = require("./common/intercetors/http.intercetor");
const mailer_module_1 = require("./provider/mailer/mailer.module");
const config_1 = require("@nestjs/config");
const config_2 = __importDefault(require("./config/config"));
const app_module_1 = require("./modules/app/app.module");
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [prisma_module_1.PrismaModule, admin_module_1.AdminModule, app_module_1.AppModule, core_module_1.CoreModule, mailer_module_1.MailerModule,
            config_1.ConfigModule.forRoot({
                isGlobal: true,
                load: [config_2.default],
            }),
            logger_module_1.LoggerModule
        ],
        providers: [
            logger_service_1.LoggerService,
            {
                provide: core_1.APP_INTERCEPTOR,
                useClass: http_intercetor_1.HttpInterceptor,
            },
        ],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map