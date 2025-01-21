import { Injectable } from '@nestjs/common';
import { CreateProvinceDto } from './dto/create-province.dto';
import { UpdateProvinceDto } from './dto/update-province.dto';
import { PrismaService } from '@provider/prisma/prisma.service';
import { handlePrismaError } from '@common/exceptions/prisma-error.handler';
import { Prisma } from '@prisma/client';
import { FindProvincesByConditionQueryDto } from './dto/params-province.dto';

@Injectable()
export class ProvinceService {
  constructor(private db: PrismaService) {}

  async create(data: CreateProvinceDto) {
    try {
      return await this.db.province.create({ data });
    } catch (error) {
      handlePrismaError(error);
    }
  }

  async findByCondition(query: FindProvincesByConditionQueryDto) {
    const { textSearch, searchField, page, pageSize, sortField, sortOrder } =
      query;

    try {
      const where: Prisma.provinceWhereInput = {};

      const andConditions: Prisma.provinceWhereInput[] = [];

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

      console.log('where', where);

      const skip = (Number(page) - 1) * Number(pageSize);

      const [data, pageCount, total] = await Promise.all([
        this.db.province.findMany({
          where,
          skip: Number(skip),
          take: Number(pageSize),
          orderBy: sortField
            ? {
                [sortField]: sortOrder,
              }
            : undefined,
        }),
        this.db.province.count({ where }),
        this.db.province.count(),
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
      return await this.db.province.findMany();
    } catch (error) {
      handlePrismaError(error);
    }
  }

  async findOne(id: number) {
    try {
      return await this.db.province.findFirst({ where: { id } });
    } catch (error) {
      handlePrismaError(error);
    }
  }

  async update(id: number, data: UpdateProvinceDto) {
    try {
      return await this.db.province.update({ data, where: { id } });
    } catch (error) {
      handlePrismaError(error);
    }
  }

  async remove(id: number) {
    try {
      return await this.db.province.delete({
        where: { id },
      });
    } catch (error) {
      handlePrismaError(error);
    }
  }

  async removeMany(id: number[]) {
    try {
      return await this.db.province.deleteMany({
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
