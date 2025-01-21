"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthModule = void 0;
const common_1 = require("@nestjs/common");
const auth_controller_1 = require("./auth.controller");
const auth_service_1 = require("./auth.service");
const jwt_1 = require("@nestjs/jwt");
const prisma_service_1 = require("../../../provider/prisma/prisma.service");
const file_module_1 = require("../../../common/utils/file/file.module");
const compression_module_1 = require("../../../common/utils/compression/compression.module");
const jwt_auth_service_1 = require("../../../provider/jwt/jwt-auth.service");
const jwt_auth_strategy_1 = require("../../../provider/jwt/strategies/jwt-auth.strategy");
const jwt_auth_module_1 = require("../../../provider/jwt/jwt-auth.module");
const config_1 = require("@nestjs/config");
const user_service_1 = require("../../core/user/user.service");
let AuthModule = class AuthModule {
};
exports.AuthModule = AuthModule;
exports.AuthModule = AuthModule = __decorate([
    (0, common_1.Module)({
        imports: [
            file_module_1.FileModule,
            compression_module_1.CompressionModule,
            jwt_1.JwtModule.registerAsync({
                imports: [config_1.ConfigModule],
                useFactory: async (configService) => ({
                    secret: configService.get('jwt.secret'),
                    signOptions: {
                        expiresIn: configService.get('jwt.expiresIn'),
                    },
                }),
                inject: [config_1.ConfigService],
            }),
            jwt_auth_module_1.JwtAuthModule,
        ],
        controllers: [auth_controller_1.AuthController],
        providers: [auth_service_1.AuthService, jwt_auth_service_1.JwtAuthService, prisma_service_1.PrismaService, jwt_auth_strategy_1.JwtStrategy, user_service_1.UserService],
    })
], AuthModule);
//# sourceMappingURL=auth.module.js.map