import { PrismaClientKnownRequestError, PrismaClientValidationError } from '@prisma/client/runtime/library';
import { BadRequestException, NotFoundException, InternalServerErrorException, ConflictException } from '@nestjs/common';

export const handlePrismaError = (error: any) => {
  console.log('prisma error',error);
  
  if (error instanceof PrismaClientKnownRequestError) {
    switch (error.code) {
      // Unique constraint violations
      case 'P2002':
        throw new ConflictException(`ข้อมูลซ้ำในระบบ - ${getPrismaField(error)}`);
      
      // Record not found
      case 'P2025':
        throw new NotFoundException('ไม่พบข้อมูลในระบบ');
      
      // Foreign key constraint violations
      case 'P2003':
        throw new BadRequestException(`ข้อมูลที่อ้างอิงไม่ถูกต้อง - ${getPrismaField(error)}`);
      
      // Required field constraints
      case 'P2011':
        throw new BadRequestException('กรุณากรอกข้อมูลให้ครบถ้วน');
      
      // Invalid data type
      case 'P2006':
        throw new BadRequestException('รูปแบบข้อมูลไม่ถูกต้อง');
      
      // Record to delete does not exist
      case 'P2001':
        throw new NotFoundException('ไม่พบข้อมูลที่ต้องการลบ');
      
      // Input field constraints
      case 'P2007':
        throw new BadRequestException('ข้อมูลไม่ตรงตามเงื่อนไขที่กำหนด');
      
      // Multiple records found where one was expected
      case 'P2034':
        throw new ConflictException('พบข้อมูลซ้ำซ้อนในระบบ');
        
      default:
        throw new InternalServerErrorException('เกิดข้อผิดพลาดในการเข้าถึงฐานข้อมูล');
    }
  }

  if (error instanceof PrismaClientValidationError) {
    throw new BadRequestException('ข้อมูลไม่ถูกต้องตามรูปแบบที่กำหนด');
  }

  throw error;
};

// Helper function to extract field name from Prisma error
const getPrismaField = (error: PrismaClientKnownRequestError): string => {
  try {
    if (error.meta?.target) {
      return Array.isArray(error.meta.target) 
        ? error.meta.target.join(', ')
        : String(error.meta.target);
    }
    return 'unknown field';
  } catch {
    return 'unknown field';
  }
};