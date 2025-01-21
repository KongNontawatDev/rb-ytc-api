import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateDepartmentDto } from './dto/create-department.dto';
import { UpdateDepartmentDto } from './dto/update-department.dto';
import { PrismaService } from '@provider/prisma/prisma.service';
import { handlePrismaError } from '@common/exceptions/prisma-error.handler';
import { Prisma } from '@prisma/client';
import {
  FindDepartmentsByConditionQueryDto,
  UpdateStatusDepartmentDto,
} from './dto/params-department.dto';

@Injectable()
export class DepartmentService {
  constructor(private db: PrismaService) {}

  async create(data: CreateDepartmentDto) {
    try {
      const department = await this.db.department.findFirst({
        where: { name: data.name },
      });
      if (department) {
        throw new BadRequestException(
          `ชื่อแผนก/ฝ่ายงาน ${data.name} มีอยู่ในระบบแล้ว`,
        );
      }
      return await this.db.department.create({ data });
    } catch (error) {
      handlePrismaError(error);
    }
  }

  async findByCondition(query: FindDepartmentsByConditionQueryDto) {
    const {
      textSearch,
      searchField,
      page,
      pageSize,
      sortField,
      sortOrder,
      status,
    } = query;

    try {
      const where: Prisma.departmentWhereInput = {};

      const andConditions: Prisma.departmentWhereInput[] = [];
      if (textSearch && searchField) {
        const searchFields = searchField
          .split(',')
          .map((field) => field.trim());

        // แยกการค้นหาตามประเภทของ field
        const searchConditions = searchFields
          .map((field) => {
            // สำหรับ field ที่เป็นตัวเลข
            if (field === 'id' || field === 'status') {
              const numValue = Number(textSearch);
              // ตรวจสอบว่าค่าที่แปลงเป็นตัวเลขถูกต้องหรือไม่
              if (!isNaN(numValue)) {
                return {
                  [field]: numValue,
                };
              }
              // ถ้าแปลงเป็นตัวเลขไม่ได้ ให้ return undefined
              return undefined;
            }
            // สำหรับ field ที่เป็น string
            return {
              [field]: {
                contains: textSearch,
              },
            };
          })
          .filter((condition) => condition !== undefined); // กรองเอาเฉพาะเงื่อนไขที่ถูกต้อง

        if (searchConditions.length > 0) {
          andConditions.push({
            OR: searchConditions,
          });
        }
      }
      // if (textSearch && searchField) {
      //   const searchFields = searchField
      //     .split(',')
      //     .map((field) => field.trim());

      //   // Add `contains` search for each field
      //   andConditions.push({
      //     OR: searchFields.map((field) => ({
      //       [field]: {
      //         contains: (field=="id"||field=="status")?Number(textSearch):textSearch,
      //       },
      //     })),
      //   });
      // }

      if (status) {
        const statusValues = status
          .split(',')
          .map((value) => Number(value.trim()));

        andConditions.push({
          OR: statusValues.map((statusValue) => ({
            status: statusValue,
          })),
        });
      }

      // Combine all conditions in AND
      if (andConditions.length > 0) {
        where['AND'] = andConditions;
      }

      const skip = (Number(page) - 1) * Number(pageSize);

      const [data, pageCount, total] = await Promise.all([
        this.db.department.findMany({
          where,
          skip: Number(skip),
          take: Number(pageSize),
          orderBy: sortField
            ? {
                [sortField]: sortOrder,
              }
            : undefined,
        }),
        this.db.department.count({ where }),
        this.db.department.count(),
      ]);

      return {
        data,
        pageCount,
        total,
      };
    } catch (error) {
      handlePrismaError(error);
      return {
        data: [],
        pageCount: 0,
        total: 0,
      };
    }
  }

  async findAll() {
    try {
      return await this.db.department.findMany();
    } catch (error) {
      handlePrismaError(error);
    }
  }

  async findOne(id: number) {
    try {
      return await this.db.department.findFirst({ where: { id } });
    } catch (error) {
      handlePrismaError(error);
    }
  }

  async findForDropdown() {
    try {
      const department = await this.db.department.findMany({
        select: {
          id: true,
          name: true,
        },
      });
      return department;
    } catch (error) {
      handlePrismaError(error);
    }
  }

  async update(id: number, data: UpdateDepartmentDto) {
    try {
      return await this.db.department.update({ data, where: { id } });
    } catch (error) {
      handlePrismaError(error);
    }
  }

  async updateStatusOne(id: number, data: UpdateStatusDepartmentDto) {
    try {
      return await this.db.department.update({ data, where: { id } });
    } catch (error) {
      handlePrismaError(error);
    }
  }

  async updateStatusMany(ids: number[], status: number) {
    try {
      return await this.db.department.updateMany({
        where: {
          id: {
            in: ids, // กำหนดให้ค้นหา id ที่อยู่ใน array ids
          },
        },
        data: {
          status: Number(status), // กำหนดค่าที่จะอัปเดตในฟิลด์ status
        },
      });
    } catch (error) {
      handlePrismaError(error);
    }
  }

  async remove(id: number) {
    try {
      return await this.db.department.delete({
        where: { id },
      });
    } catch (error) {
      handlePrismaError(error);
    }
  }

  async removeMany(id: number[]) {
    try {
      return await this.db.department.deleteMany({
        where: {
          id: {
            in: id,
          },
        },
      });
    } catch (error) {
      handlePrismaError(error);
    }
  }
}
