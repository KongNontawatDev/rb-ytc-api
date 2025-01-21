"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createCommonApiResponses = exports.createApiParam = exports.createApiBody = exports.commonApiResponses = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
exports.commonApiResponses = {
    success: (example, meta = false) => (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.OK,
        description: 'Operation successful.',
        schema: {
            example: {
                message: 'Operation successful.',
                error: 0,
                data: example || {},
                ...(meta && {
                    meta: {
                        page: 1,
                        pageSize: 10,
                        pageCount: 77,
                        total: 77,
                    },
                }),
            },
        },
    }),
    created: (example) => (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.CREATED,
        description: 'Created successful.',
        schema: {
            example: {
                message: 'Created successful.',
                error: 0,
                data: example || {},
            },
        },
    }),
    badRequest: (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.BAD_REQUEST,
        description: 'Bad Request',
        schema: {
            example: {
                message: ['Invalid input'],
                error: 'Bad Request',
                statusCode: 400,
            },
        },
    }),
    notFound: (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.NOT_FOUND,
        description: 'Not Found',
        schema: {
            example: {
                message: 'Resource not found',
                error: 'Not Found',
                statusCode: 404,
            },
        },
    }),
    conflict: (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.CONFLICT,
        description: 'Conflict',
        schema: {
            example: {
                message: 'Resource conflict',
                error: 'Conflict',
                statusCode: 409,
            },
        },
    }),
    unauthorized: (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.UNAUTHORIZED,
        description: 'Unauthorized',
        schema: {
            example: {
                message: 'ต้องเข้าสู่ระบบก่อน',
                error: 'Unauthorized',
                statusCode: 401,
            },
        },
    }),
    forbidden: (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.FORBIDDEN,
        description: 'Forbidden',
        schema: {
            example: {
                message: 'คุณไม่ได้รับอนุญาติให้กระทำสิ่งนี้',
                error: 'Forbidden',
                statusCode: 401,
            },
        },
    }),
};
const createApiBody = (required, properties) => (0, swagger_1.ApiBody)({
    schema: {
        type: 'object',
        required,
        properties,
    },
});
exports.createApiBody = createApiBody;
const createApiParam = (name, type, description) => (0, swagger_1.ApiParam)({
    name,
    type,
    description,
    required: true,
});
exports.createApiParam = createApiParam;
const createCommonApiResponses = (successExample, isAuth = true, isPermission = true, isMeta = false) => {
    const responses = [
        exports.commonApiResponses.success(successExample, isMeta),
        exports.commonApiResponses.badRequest,
        exports.commonApiResponses.notFound,
    ];
    if (isAuth) {
        responses.push(exports.commonApiResponses.unauthorized);
    }
    if (isPermission) {
        responses.push(exports.commonApiResponses.forbidden);
    }
    return responses;
};
exports.createCommonApiResponses = createCommonApiResponses;
//# sourceMappingURL=api-responses.js.map