import { Injectable } from '@nestjs/common';
import { CreateDistrictDto } from './dto/create-district.dto';
import { UpdateDistrictDto } from './dto/update-district.dto';
import { PrismaService } from '@provider/prisma/prisma.service';
import { handlePrismaError } from '@common/exceptions/prisma-error.handler';
import { Prisma } from '@prisma/client';
import { FindDistrictsByConditionQueryDto } from './dto/params-district.dto';

@Injectable()
export class DistrictService {
  constructor(private db: PrismaService) {}

  async create(data: CreateDistrictDto) {
    try {
      return await this.db.district.create({ data });
    } catch (error) {
      handlePrismaError(error);
    }
  }

  async findByCondition(query: FindDistrictsByConditionQueryDto) {
    const {
      textSearch,
      searchField,
      page,
      pageSize,
      sortField,
      sortOrder,
      amphure_id,
    } = query;

    try {
      const where: Prisma.districtWhereInput = {};
      const whereCount: Prisma.districtWhereInput = {};

      const andConditions: Prisma.districtWhereInput[] = [];

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

      if (amphure_id) {
        where['AND'] = {
          amphure_id: Number(amphure_id),
        };
        whereCount.amphure_id = Number(amphure_id)
      }

      console.log('where', where);

      const skip = (Number(page) - 1) * Number(pageSize);

      const [data, pageCount, total] = await Promise.all([
        this.db.district.findMany({
          where,
          skip: Number(skip),
          take: Number(pageSize),
          orderBy: sortField
            ? {
                [sortField]: sortOrder,
              }
            : undefined,
        }),
        this.db.district.count({ where }),
        this.db.district.count({where:whereCount}),
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
      return await this.db.district.findMany();
    } catch (error) {
      handlePrismaError(error);
    }
  }

  async findOne(id: number) {
    try {
      return await this.db.district.findFirst({ where: { id } });
    } catch (error) {
      handlePrismaError(error);
    }
  }

  async update(id: number, data: UpdateDistrictDto) {
    try {
      return await this.db.district.update({ data, where: { id } });
    } catch (error) {
      handlePrismaError(error);
    }
  }

  async remove(id: number) {
    try {
      return await this.db.district.delete({
        where: { id },
      });
    } catch (error) {
      handlePrismaError(error);
    }
  }

  async removeMany(id: number[]) {
    try {
      return await this.db.district.deleteMany({
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
