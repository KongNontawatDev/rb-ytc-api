import { CreateProvinceDto } from '@modules/core/location/province/dto/create-province.dto';
import { HttpStatus } from '@nestjs/common';
import { ApiBody, ApiParam, ApiResponse } from '@nestjs/swagger';
export const commonApiResponses = {
  success: (example?: object,meta:boolean=false) =>
  ApiResponse({
    status: HttpStatus.OK,
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
  created: (example?: object) =>
    ApiResponse({
      status: HttpStatus.CREATED,
      description: 'Created successful.',
      schema: {
        example: {
          message: 'Created successful.',
          error: 0,
          data: example || {},
        },
      },
    }),

  badRequest: ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Bad Request',
    schema: {
      example: {
        message: ['Invalid input'],
        error: 'Bad Request',
        statusCode: 400,
      },
    },
  }),

  notFound: ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Not Found',
    schema: {
      example: {
        message: 'Resource not found',
        error: 'Not Found',
        statusCode: 404,
      },
    },
  }),

  conflict: ApiResponse({
    status: HttpStatus.CONFLICT,
    description: 'Conflict',
    schema: {
      example: {
        message: 'Resource conflict',
        error: 'Conflict',
        statusCode: 409,
      },
    },
  }),

  unauthorized: ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: 'Unauthorized',
    schema: {
      example: {
        message: 'ต้องเข้าสู่ระบบก่อน',
        error: 'Unauthorized',
        statusCode: 401,
      },
    },
  }),

  forbidden: ApiResponse({
    status: HttpStatus.FORBIDDEN,
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

// Helper functions for reusable decorators
export const createApiBody = (required: string[], properties: Record<string, any>) =>
  ApiBody({
    schema: {
      type: 'object',
      required,
      properties,
    },
  });

export const createApiParam = (name: string, type: any, description: string) =>
  ApiParam({
    name,
    type,
    description,
    required: true,
  });

export const createCommonApiResponses = (successExample: any, isAuth = true,isPermission = true,isMeta=false) => {
  const responses = [
    commonApiResponses.success(successExample, isMeta),
    commonApiResponses.badRequest,
    commonApiResponses.notFound,
  ];
  if (isAuth) {
    responses.push(commonApiResponses.unauthorized);
  }
  if(isPermission) {
    responses.push(commonApiResponses.forbidden);
  }
  return responses;
};
