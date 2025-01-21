import { Injectable } from '@nestjs/common';
import { CreateAmphureDto } from './dto/create-amphure.dto';
import { UpdateAmphureDto } from './dto/update-amphure.dto';
import { PrismaService } from '@provider/prisma/prisma.service';
import { handlePrismaError } from '@common/exceptions/prisma-error.handler';
import { Prisma } from '@prisma/client';
import { FindAmphuresByConditionQueryDto } from './dto/params-amphure.dto';

@Injectable()
export class AmphureService {
  constructor(private db: PrismaService) {}

  async create(data: CreateAmphureDto) {
    try {
      return await this.db.amphure.create({ data });
    } catch (error) {
      handlePrismaError(error);
    }
  }

  async findByCondition(query: FindAmphuresByConditionQueryDto) {
    const { textSearch, searchField, page, pageSize, sortField, sortOrder,province_id } =
      query;

    try {
      const where: Prisma.amphureWhereInput = {};
      const whereCount: Prisma.amphureWhereInput = {};

      const andConditions: Prisma.amphureWhereInput[] = [];

      if (textSearch && searchField) {
        const searchFields = searchField
          .split(',')
          .map((field) => field.trim());

        // Add `contains` search for each field
        andConditions.push({
          OR: searchFields.map((field) => ({
            [field]: {
              contains: textSearch,
            },
          })),
        });
      }

      // Combine all conditions in AND
      if (andConditions.length > 0) {
        where['AND'] = andConditions;
      }

      if(province_id) {
        where['AND'] = {
          province_id:Number(province_id)
        }
        whereCount.province_id = Number(province_id)
      }

      console.log('where', where);

      const skip = (Number(page) - 1) * Number(pageSize);

      const [data, pageCount, total] = await Promise.all([
        this.db.amphure.findMany({
          where,
          skip: Number(skip),
          take: Number(pageSize),
          orderBy: sortField
            ? {
                [sortField]: sortOrder,
              }
            : undefined,
        }),
        this.db.amphure.count({ where }),
        this.db.amphure.count({where:whereCount}),
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
      return await this.db.amphure.findMany();
    } catch (error) {
      handlePrismaError(error);
    }
  }

  async findOne(id: number) {
    try {
      return await this.db.amphure.findFirst({ where: { id } });
    } catch (error) {
      handlePrismaError(error);
    }
  }

  async findManyByProvinceId(province_id: number) {
    try {
      return await this.db.amphure.findMany({ where: { province_id } });
    } catch (error) {
      handlePrismaError(error);
    }
  }

  async update(id: number, data: UpdateAmphureDto) {
    try {
      return await this.db.amphure.update({ data, where: { id } });
    } catch (error) {
      handlePrismaError(error);
    }
  }

  async remove(id: number) {
    try {
      return await this.db.amphure.delete({
        where: { id },
      });
    } catch (error) {
      handlePrismaError(error);
    }
  }

  async removeMany(id: number[]) {
    try {
      return await this.db.amphure.deleteMany({
        where: {
          id: {
            in: id
          },
        },
      });
    } catch (error) {
      handlePrismaError(error);
    }
  }
}
