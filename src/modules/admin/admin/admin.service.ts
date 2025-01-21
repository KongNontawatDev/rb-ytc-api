import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateAdminDto } from './dto/create-admin.dto';
import { UpdateAdminDto, UpdateStatusAdminDto } from './dto/update-admin.dto';
import { PrismaService } from 'src/provider/prisma/prisma.service';
import { Prisma } from '@prisma/client';
import { handlePrismaError } from 'src/common/exceptions/prisma-error.handler';
import { FindAdminsByConditionQueryDto } from './dto/params-admin.dto';
import { FileService } from '@common/utils/file/file.service';
import path from 'path';
import { CompressionService } from '@common/utils/compression/compression.service';
import { AuthService } from '../auth/auth.service';
@Injectable()
export class AdminService {
  constructor(
    private db: PrismaService,
    private fileService: FileService,
    private readonly compressionService: CompressionService,
    private readonly authService: AuthService,
  ) {}

  async create(data: CreateAdminDto, file?: Express.Multer.File) {
    try {
      const adminExistsName = await this.db.admin.findFirst({
        where: { name: data.name },
      });
      if (adminExistsName) {
        throw new BadRequestException(
          `แอดมินชื่อ ${data.name} มีอยู่ในระบบแล้ว`,
        );
      }
      const adminExistsEmail = await this.db.admin.findUnique({
        where: { email: data.email },
      });

      if (adminExistsEmail) {
        throw new BadRequestException(`อีเมล ${data.email} มีอยู่ในระบบแล้ว`);
      }
      const imagePath = file ? file.filename : null;
      if (file) {
        await this.compressionService.compressFiles(file);
      }
      const hashedPassword = await this.authService.hashData(data.password);
      const admin = await this.db.admin.create({
        data: {
          email: data.email,
          name: data.name,
          image: imagePath,
          status: 1,
          role_id: data.role_id,
          password: hashedPassword,
        },
        select: {
          id: true,
          email: true,
          image: true,
          name: true,
          role_id: true,
          status: true,
          created_at: true,
          updated_at: true,
        },
      });

      return admin;
    } catch (error) {
      handlePrismaError(error);
    }
  }

  async findByCondition(query: FindAdminsByConditionQueryDto) {
    const {
      textSearch,
      searchField,
      page,
      pageSize,
      sortField,
      sortOrder,
      status,
      role_id
    } = query;

    try {
      const where: Prisma.adminWhereInput = {};

      const andConditions: Prisma.adminWhereInput[] = [];

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

      if (role_id) {
        const role_idValues = role_id
          .split(',')
          .map((value) => Number(value.trim()));

        andConditions.push({
          OR: role_idValues.map((role_idValue) => ({
            role_id: role_idValue,
          })),
        });
      }

      // Combine all conditions in AND
      if (andConditions.length > 0) {
        where['AND'] = andConditions;
      }

      const skip = (Number(page) - 1) * Number(pageSize);

      const [data, pageCount, total] = await Promise.all([
        this.db.admin.findMany({
          where,
          include:{
            role:{
              select:{
                id:true,
                name:true
              }
            }
          },
          skip: Number(skip),
          take: Number(pageSize),
          orderBy: sortField
            ? {
                [sortField]: sortOrder,
              }
            : undefined,
        }),
        this.db.admin.count({ where }),
        this.db.admin.count(),
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
      const admin = await this.db.admin.findMany();
      return admin;
    } catch (error) {
      handlePrismaError(error);
    }
  }

  async findOne(id: number) {
    try {
      const admin = await this.db.admin.findUnique({
        where: { id },
      });
      return admin;
    } catch (error) {
      handlePrismaError(error);
    }
  }

  async update(id: number, data: UpdateAdminDto, file?: Express.Multer.File) {
    const imagePath = file ? file.filename : (data.image as string);

    try {
      const adminExistsName = await this.db.admin.findFirst({
        where: { name: data.name,NOT:{id} },
      });
      if (adminExistsName) {
        throw new BadRequestException(
          `แอดมินชื่อ ${data.name} มีอยู่ในระบบแล้ว`,
        );
      }
      const adminExistsEmail = await this.db.admin.findUnique({
        where: { email: data.email,NOT:{id} },
      });

      if (adminExistsEmail) {
        throw new BadRequestException(`อีเมล ${data.email} มีอยู่ในระบบแล้ว`);
      }
      // ดึงข้อมูลแอดมินเดิมเพื่อหาชื่อไฟล์ของรูปเก่า
      const existingAdmin = await this.db.admin.findUnique({
        where: { id },
        select: { image: true }, // ดึงเฉพาะฟิลด์ image
      });

      // กรณีที่มีการอัปโหลดไฟล์ใหม่
      if (file) {
        if (existingAdmin?.image) {
          const oldFilePath = path.join('public', 'admin', existingAdmin.image);
          await this.fileService.deleteFiles(oldFilePath); // ลบรูปเก่า
        }
        await this.compressionService.compressFiles(file);
      }

      // กรณีที่ data.image เป็น null หรือค่าว่าง
      if (
        !file &&
        (!data.image ||
          (typeof data.image === 'string' && data.image.trim() === '')) &&
        existingAdmin?.image
      ) {
        const oldFilePath = path.join('public', 'admin', existingAdmin.image);
        await this.fileService.deleteFiles(oldFilePath); // ลบรูปเก่า

        // ตั้งค่า imagePath เป็น null ถ้าจะลบรูปออกจากฐานข้อมูล
        data.image = null;
      }

      // อัปเดตข้อมูลแอดมินในฐานข้อมูล
      return await this.db.admin.update({
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
      return await this.db.admin.updateMany({
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

    async updateStatusOne(id: number, data: UpdateStatusAdminDto) {
    try {
      return await this.db.admin.update({ data, where: { id } });
    } catch (error) {
      handlePrismaError(error);
    }
  }

  async remove(id: number) {
    try {
      // ดึงข้อมูลรูปภาพที่เกี่ยวข้อง
      const admin = await this.db.admin.findUnique({
        where: { id },
        select: { image: true },
      });

      // ลบไฟล์รูปภาพ
      if (admin?.image) {
        const filePath = path.join('public', 'admin', admin.image);
        await this.fileService.deleteFiles(filePath);
      }

      // ลบข้อมูลแอดมิน
      return await this.db.admin.delete({
        where: { id },
      });
    } catch (error) {
      handlePrismaError(error);
    }
  }

  async removeMany(id: number[]) {
    try {
      // ดึงข้อมูลรูปภาพที่เกี่ยวข้องกับแอดมินหลายคน
      const admins = await this.db.admin.findMany({
        where: { id: { in: id } },
        select: { image: true },
      });

      // ลบไฟล์รูปภาพ
      for (const admin of admins) {
        if (admin.image) {
          const filePath = path.join('public', 'admin', admin.image);
          await this.fileService.deleteFiles(filePath);
        }
      }

      // ลบข้อมูลแอดมิน
      return await this.db.admin.deleteMany({
        where: { id: { in: id } },
      });
    } catch (error) {
      handlePrismaError(error);
    }
  }
}
