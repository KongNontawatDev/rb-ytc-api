import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateStatusUserDto, UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from 'src/provider/prisma/prisma.service';
import { Prisma } from '@prisma/client';
import { handlePrismaError } from 'src/common/exceptions/prisma-error.handler';
import { FindUsersByConditionQueryDto } from './dto/params-user.dto';
import { FileService } from '@common/utils/file/file.service';
import path from 'path';
import { CompressionService } from '@common/utils/compression/compression.service';
@Injectable()
export class UserService {
  constructor(
    private db: PrismaService,
    private fileService: FileService,
    private readonly compressionService: CompressionService,
  ) {}

  async create(data: CreateUserDto, file?: Express.Multer.File) {
    const imagePath = file ? file.filename : data.image;
    if (file) {
      await this.compressionService.compressFiles(file);
    }
    try {
      return await this.db.user.create({
        data: {
          ...data,
          department_id: Number(data.department_id),
          image: String(imagePath),
        },
      });
    } catch (error) {
      handlePrismaError(error);
    }
  }

  async findByCondition(query: FindUsersByConditionQueryDto) {
    const {
      textSearch,
      searchField,
      page,
      pageSize,
      sortField,
      sortOrder,
      status,
      department_id,
    } = query;

    try {
      const where: Prisma.userWhereInput = {};

      const andConditions: Prisma.userWhereInput[] = [];

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

      if (department_id) {
        const Values = department_id
          .split(',')
          .map((value) => Number(value.trim()));

        andConditions.push({
          OR: Values.map((statusValue) => ({
            department_id: statusValue,
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
        this.db.user.findMany({
          where,
          include: {
            department: {
              select: {
                id: true,
                name: true,
              },
            },
          },
          skip: Number(skip),
          take: Number(pageSize),
          orderBy: sortField
            ? {
                [sortField]: sortOrder,
              }
            : undefined,
        }),
        this.db.user.count({ where }),
        this.db.user.count(),
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
      const user = await this.db.user.findMany();
      return user;
    } catch (error) {
      handlePrismaError(error);
    }
  }

  async findForDropdown() {
    try {
      const user = await this.db.user.findMany({
        select: {
          id: true,
          full_name: true,
          department_id:true,
          tel:true
        },
      });
      return user;
    } catch (error) {
      handlePrismaError(error);
    }
  }

  async findOne(id: number) {
    try {
      const user = await this.db.user.findUnique({
        where: { id },
        include:{
          booking_list:{
            select:{
              title:true,
              book_start:true,
              book_end:true,
              room:{
                select:{
                  name:true,
                }
              }
            },
            orderBy:{
              book_start:"desc"
            }
          }
        }
      });
      return user;
    } catch (error) {
      handlePrismaError(error);
    }
  }

  async update(id: number, data: UpdateUserDto, file?: Express.Multer.File) {
    const imagePath = file ? file.filename : (data.image as string);

    try {
      // ดึงข้อมูลผู้ใช้เดิมเพื่อหาชื่อไฟล์ของรูปเก่า
      const existingUser = await this.db.user.findUnique({
        where: { id },
        select: { image: true }, // ดึงเฉพาะฟิลด์ image
      });

      // กรณีที่มีการอัปโหลดไฟล์ใหม่
      if (file) {
        if (existingUser?.image) {
          const oldFilePath = path.join('public', 'user', existingUser.image);
          await this.fileService.deleteFiles(oldFilePath); // ลบรูปเก่า
        }
        await this.compressionService.compressFiles(file);
      }

      // กรณีที่ data.image เป็น null หรือค่าว่าง
      if (
        !file &&
        (!data.image ||
          (typeof data.image === 'string' && data.image.trim() === '')) &&
        existingUser?.image
      ) {
        const oldFilePath = path.join('public', 'user', existingUser.image);
        await this.fileService.deleteFiles(oldFilePath); // ลบรูปเก่า

        // ตั้งค่า imagePath เป็น null ถ้าจะลบรูปออกจากฐานข้อมูล
        data.image = null;
      }

      // อัปเดตข้อมูลผู้ใช้ในฐานข้อมูล
      return await this.db.user.update({
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

  async updateStatusMany(ids: number[], status: number) {
    try {
      return await this.db.user.updateMany({
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

  async updateStatusOne(id: number, data: UpdateStatusUserDto) {
    try {
      return await this.db.user.update({ data, where: { id } });
    } catch (error) {
      handlePrismaError(error);
    }
  }

  async remove(id: number) {
    try {
      // ดึงข้อมูลรูปภาพที่เกี่ยวข้อง
      const user = await this.db.user.findUnique({
        where: { id },
        select: { image: true },
      });

      // ลบไฟล์รูปภาพ
      if (user?.image) {
        const filePath = path.join('public', 'user', user.image);
        await this.fileService.deleteFiles(filePath);
      }

      // ลบข้อมูลแอดมิน
      return await this.db.user.delete({
        where: { id },
      });
    } catch (error) {
      handlePrismaError(error);
    }
  }

  async removeMany(id: number[]) {
    try {
      // ดึงข้อมูลรูปภาพที่เกี่ยวข้องกับแอดมินหลายคน
      const admins = await this.db.user.findMany({
        where: { id: { in: id } },
        select: { image: true },
      });

      // ลบไฟล์รูปภาพ
      for (const user of admins) {
        if (user.image) {
          const filePath = path.join('public', 'user', user.image);
          await this.fileService.deleteFiles(filePath);
        }
      }

      // ลบข้อมูลแอดมิน
      return await this.db.user.deleteMany({
        where: { id: { in: id } },
      });
    } catch (error) {
      handlePrismaError(error);
    }
  }
}
