import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateAccessoryDto } from './dto/create-accessory.dto';
import { UpdateAccessoryDto, UpdateStatusAccessoryDto } from './dto/update-accessory.dto';
import { Prisma } from '@prisma/client';
import { handlePrismaError } from '@common/exceptions/prisma-error.handler';
import { FindAccessorysByConditionQueryDto } from './dto/params-accessory.dto';
import { FileService } from '@common/utils/file/file.service';
import path from 'path';
import { PrismaService } from '@provider/prisma/prisma.service';
import { CompressionService } from '@common/utils/compression/compression.service';
@Injectable()
export class AccessoryService {
  constructor(
    private db: PrismaService,
    private fileService: FileService,
    private readonly compressionService: CompressionService,
  ) {}

  async create(data: CreateAccessoryDto, file?: Express.Multer.File) {
    const imagePath = file ? file.filename : null;
    try {
      const accessory = await this.db.accessory.findFirst({where:{name:data.name}})
      if(accessory) {
        throw new BadRequestException(`อุปกรณ์ ${data.name} มีอยู่ในระบบแล้ว`)
      }
      return await this.db.accessory.create({
        data: {
          ...data,
          image: imagePath || 'default.png',
        },
      });
    } catch (error) {
      handlePrismaError(error);
    }
  }

  async findByCondition(query: FindAccessorysByConditionQueryDto) {
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
      const where: Prisma.accessoryWhereInput = {};

      const andConditions: Prisma.accessoryWhereInput[] = [];

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
        this.db.accessory.findMany({
          where,
          skip: Number(skip),
          take: Number(pageSize),
          orderBy: sortField
            ? {
                [sortField]: sortOrder,
              }
            : undefined,
        }),
        this.db.accessory.count({ where }),
        this.db.accessory.count(),
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
      const accessory = await this.db.accessory.findMany();
      return accessory;
    } catch (error) {
      handlePrismaError(error);
    }
  }

  async findOne(id: number) {
    try {
      const accessory = await this.db.accessory.findUnique({
        where: { id },
      });
      return accessory;
    } catch (error) {
      handlePrismaError(error);
    }
  }

  async findForDropdown() {
    try {
      const accessory = await this.db.accessory.findMany({
        select: {
          id: true,
          name: true,
          image:true
        },
      });
      return accessory;
    } catch (error) {
      handlePrismaError(error);
    }
  }

  async update(
    id: number,
    data: UpdateAccessoryDto,
    file?: Express.Multer.File,
  ) {
    const imagePath = file ? file.filename : (data.image as string);

    try {
      const accessory = await this.db.accessory.findFirst({where:{name:data.name,NOT:{id}}})
      if(accessory) {
        throw new BadRequestException(`อุปกรณ์ ${data.name} มีอยู่ในระบบแล้ว`)
      }
      // ดึงข้อมูลอุปกรณ์เดิมเพื่อหาชื่อไฟล์ของรูปเก่า
      const existingAccessory = await this.db.accessory.findUnique({
        where: { id },
        select: { image: true }, // ดึงเฉพาะฟิลด์ image
      });

      // กรณีที่มีการอัปโหลดไฟล์ใหม่
      if (file) {
         await this.compressionService.compressFiles(file);
        if (existingAccessory?.image) {
          const oldFilePath = path.join(
            'public',
            'accessory',
            existingAccessory.image,
          );
          await this.fileService.deleteFiles(oldFilePath); // ลบรูปเก่า
        }
      }

      // กรณีที่ data.image เป็น null หรือค่าว่าง
      if (
        !file &&
        (!data.image ||
          (typeof data.image === 'string' && data.image.trim() === '')) &&
        existingAccessory?.image
      ) {
        const oldFilePath = path.join(
          'public',
          'accessory',
          existingAccessory.image,
        );
        await this.fileService.deleteFiles(oldFilePath); // ลบรูปเก่า

        // ตั้งค่า imagePath เป็น null ถ้าจะลบรูปออกจากฐานข้อมูล
        data.image = null;
      }

      // อัปเดตข้อมูลอุปกรณ์ในฐานข้อมูล
      return await this.db.accessory.update({
        where: { id },
        data: {
          ...data,
          id: Number(data.id),
          image: imagePath,
        },
      });
    } catch (error) {
      handlePrismaError(error);
    }
  }

    async updateStatusOne(id: number, data: UpdateStatusAccessoryDto) {
    try {
      return await this.db.accessory.update({ data, where: { id } });
    } catch (error) {
      handlePrismaError(error);
    }
  }

  async updateStatusMany(id: number[], status: number):Promise<{count:number}|undefined> {
    try {
      return await this.db.accessory.updateMany({
        where: {
          id: {
            in: id, // กำหนดให้ค้นหา id ที่อยู่ใน array ids
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
      // ดึงข้อมูลรูปภาพที่เกี่ยวข้อง
      const accessory = await this.db.accessory.findUnique({
        where: { id },
        select: { image: true },
      });

      // ลบไฟล์รูปภาพ
      if (accessory?.image) {
        const filePath = path.join('public', 'accessory', accessory.image);
        await this.fileService.deleteFiles(filePath);
      }

      // ลบข้อมูลแอดมิน
      return await this.db.accessory.delete({
        where: { id },
      });
    } catch (error) {
      handlePrismaError(error);
    }
  }

  async removeMany(id: number[]):Promise<{count:number}|undefined> {
    try {
      // ดึงข้อมูลรูปภาพที่เกี่ยวข้องกับแอดมินหลายคน
      const admins = await this.db.accessory.findMany({
        where: { id: { in: id } },
        select: { image: true },
      });

      // ลบไฟล์รูปภาพ
      for (const accessory of admins) {
        if (accessory.image) {
          const filePath = path.join('public', 'accessory', accessory.image);
          await this.fileService.deleteFiles(filePath);
        }
      }

      // ลบข้อมูลแอดมิน
      return await this.db.accessory.deleteMany({
        where: { id: { in: id } },
      });
    } catch (error) {
      handlePrismaError(error);
    }
  }
}
