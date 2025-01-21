import { applyDecorators } from '@nestjs/common';
import { ApiQuery, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { commonApiResponses } from './api-responses';

export const QueryParamsDecorators = (queries: { name: string; required: boolean; example: any; enum?: any[] }[]) => {
  return queries.map(query =>
    ApiQuery({
      name: query.name,
      required: query.required,
      example: query.example,
      enum: query.enum,
      schema: {
        type: typeof query.example,
      },
    }),
  );
};

export const ApiDocs = {
  create: (tag: string) =>
    applyDecorators(
      ApiTags(tag),
      ApiOperation({ description: 'Create new resource' }),
      commonApiResponses.success(),
      commonApiResponses.badRequest,
    ),

  findAll: (tag: string, queries: any[]) =>
    applyDecorators(
      ApiTags(tag),
      ApiOperation({ description: 'Get all resources' }),
      commonApiResponses.success(),
      commonApiResponses.badRequest,
      ...QueryParamsDecorators(queries),
    ),

  findOne: (tag: string) =>
    applyDecorators(
      ApiTags(tag),
      ApiOperation({ description: 'Get resource by ID' }),
      commonApiResponses.success(),
      commonApiResponses.badRequest,
      commonApiResponses.notFound,
    ),

  update: (tag: string) =>
    applyDecorators(
      ApiTags(tag),
      ApiOperation({ description: 'Update resource' }),
      commonApiResponses.success(),
      commonApiResponses.badRequest,
      commonApiResponses.notFound,
    ),

  delete: (tag: string) =>
    applyDecorators(
      ApiTags(tag),
      ApiOperation({ description: 'Delete resource' }),
      commonApiResponses.success(),
      commonApiResponses.badRequest,
      commonApiResponses.notFound,
    ),

  custom: (tag: string, description: string, status: number) =>
    applyDecorators(
      ApiTags(tag),
      ApiOperation({ description: description }),
      ApiResponse({ status, description }),
    ),
};