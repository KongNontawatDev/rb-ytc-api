"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ApiDocs = exports.QueryParamsDecorators = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const api_responses_1 = require("./api-responses");
const QueryParamsDecorators = (queries) => {
    return queries.map(query => (0, swagger_1.ApiQuery)({
        name: query.name,
        required: query.required,
        example: query.example,
        enum: query.enum,
        schema: {
            type: typeof query.example,
        },
    }));
};
exports.QueryParamsDecorators = QueryParamsDecorators;
exports.ApiDocs = {
    create: (tag) => (0, common_1.applyDecorators)((0, swagger_1.ApiTags)(tag), (0, swagger_1.ApiOperation)({ description: 'Create new resource' }), api_responses_1.commonApiResponses.success(), api_responses_1.commonApiResponses.badRequest),
    findAll: (tag, queries) => (0, common_1.applyDecorators)((0, swagger_1.ApiTags)(tag), (0, swagger_1.ApiOperation)({ description: 'Get all resources' }), api_responses_1.commonApiResponses.success(), api_responses_1.commonApiResponses.badRequest, ...(0, exports.QueryParamsDecorators)(queries)),
    findOne: (tag) => (0, common_1.applyDecorators)((0, swagger_1.ApiTags)(tag), (0, swagger_1.ApiOperation)({ description: 'Get resource by ID' }), api_responses_1.commonApiResponses.success(), api_responses_1.commonApiResponses.badRequest, api_responses_1.commonApiResponses.notFound),
    update: (tag) => (0, common_1.applyDecorators)((0, swagger_1.ApiTags)(tag), (0, swagger_1.ApiOperation)({ description: 'Update resource' }), api_responses_1.commonApiResponses.success(), api_responses_1.commonApiResponses.badRequest, api_responses_1.commonApiResponses.notFound),
    delete: (tag) => (0, common_1.applyDecorators)((0, swagger_1.ApiTags)(tag), (0, swagger_1.ApiOperation)({ description: 'Delete resource' }), api_responses_1.commonApiResponses.success(), api_responses_1.commonApiResponses.badRequest, api_responses_1.commonApiResponses.notFound),
    custom: (tag, description, status) => (0, common_1.applyDecorators)((0, swagger_1.ApiTags)(tag), (0, swagger_1.ApiOperation)({ description: description }), (0, swagger_1.ApiResponse)({ status, description })),
};
//# sourceMappingURL=api-decorators.js.map