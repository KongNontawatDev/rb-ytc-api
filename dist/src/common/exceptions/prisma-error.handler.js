"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handlePrismaError = void 0;
const library_1 = require("@prisma/client/runtime/library");
const common_1 = require("@nestjs/common");
const handlePrismaError = (error) => {
    console.log('prisma error', error);
    if (error instanceof library_1.PrismaClientKnownRequestError) {
        switch (error.code) {
            case 'P2002':
                throw new common_1.ConflictException(`ข้อมูลซ้ำในระบบ - ${getPrismaField(error)}`);
            case 'P2025':
                throw new common_1.NotFoundException('ไม่พบข้อมูลในระบบ');
            case 'P2003':
                throw new common_1.BadRequestException(`ข้อมูลที่อ้างอิงไม่ถูกต้อง - ${getPrismaField(error)}`);
            case 'P2011':
                throw new common_1.BadRequestException('กรุณากรอกข้อมูลให้ครบถ้วน');
            case 'P2006':
                throw new common_1.BadRequestException('รูปแบบข้อมูลไม่ถูกต้อง');
            case 'P2001':
                throw new common_1.NotFoundException('ไม่พบข้อมูลที่ต้องการลบ');
            case 'P2007':
                throw new common_1.BadRequestException('ข้อมูลไม่ตรงตามเงื่อนไขที่กำหนด');
            case 'P2034':
                throw new common_1.ConflictException('พบข้อมูลซ้ำซ้อนในระบบ');
            default:
                throw new common_1.InternalServerErrorException('เกิดข้อผิดพลาดในการเข้าถึงฐานข้อมูล');
        }
    }
    if (error instanceof library_1.PrismaClientValidationError) {
        throw new common_1.BadRequestException('ข้อมูลไม่ถูกต้องตามรูปแบบที่กำหนด');
    }
    throw error;
};
exports.handlePrismaError = handlePrismaError;
const getPrismaField = (error) => {
    try {
        if (error.meta?.target) {
            return Array.isArray(error.meta.target)
                ? error.meta.target.join(', ')
                : String(error.meta.target);
        }
        return 'unknown field';
    }
    catch {
        return 'unknown field';
    }
};
//# sourceMappingURL=prisma-error.handler.js.map