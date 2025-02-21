import { Injectable } from '@nestjs/common';
import { CreateRoomDto } from './dto/create-room.dto';
import { UpdateRoomDto, UpdateStatusRoomDto } from './dto/update-room.dto';
import { PrismaService } from 'src/provider/prisma/prisma.service';
import { Prisma } from '@prisma/client';
import { handlePrismaError } from 'src/common/exceptions/prisma-error.handler';
import { FindRoomsByConditionQueryDto } from './dto/params-room.dto';
import { FileService } from '@common/utils/file/file.service';
import path from 'path';
import { CompressionService } from '@common/utils/compression/compression.service';
import { DateService } from '@common/utils/date/date.service';
@Injectable()
export class RoomService {
  constructor(
    private db: PrismaService,
    private fileService: FileService,
    private readonly compressionService: CompressionService,
    private readonly dateService: DateService,
  ) {}

  async create(data: CreateRoomDto, files: Express.Multer.File[]) {
    try {
      const { accessorys, ...roomData } = data;

      // Compress uploaded files if any
      if (files?.length) {
        await Promise.all(
          files.map((file) => this.compressionService.compressFiles(file)),
        );
      }

      // Create room with nested writes
      const room = await this.db.room.create({
        data: {
          name: roomData.name,
          detail: roomData.detail,
          location: roomData.location,
          size: roomData.size,
          // Convert capacity to string as per schema requirement
          capacity: roomData.capacity.toString(),
          status: 1,
          // Handle room images if any
          ...(files?.length > 0 && {
            room_image: {
              createMany: {
                data: files.map((file) => ({
                  image: file.filename,
                })),
              },
            },
          }),
          // Handle accessorys if any
          ...(accessorys.split(',')?.length > 0 && {
            room_accessory: {
              createMany: {
                data: accessorys.split(',').map((accessoryId) => ({
                  accessory_id: Number(accessoryId),
                })),
              },
            },
          }),
        },
        include: {
          room_image: true,
          room_accessory: {
            include: {
              accessory: true,
            },
          },
        },
      });

      return room;
    } catch (error) {
      // Cleanup uploaded files if there's an error
      if (files?.length) {
        await Promise.all(
          files.map((file) => this.fileService.deleteFiles(file.path)),
        );
      }
      handlePrismaError(error);
    }
  }

  async update(id: number, data: UpdateRoomDto, files: Express.Multer.File[]) {
    try {
      const { accessorys, removeImages, ...roomData } = data;

      // Begin transaction
      return await this.db.$transaction(async (prisma) => {
        // Handle image removals if specified
        if (removeImages?.length) {
          const imagesToRemove = removeImages;

          // Delete files physically
          await Promise.all(
            imagesToRemove.map(async (imageName) => {
              const filePath = path.join('public', 'room', imageName);
              await this.fileService.deleteFiles(filePath);
            }),
          );

          // Remove from database
          await prisma.room_image.deleteMany({
            where: {
              room_id: id,
              image: {
                in: imagesToRemove,
              },
            },
          });
        }

        // Handle new uploads if any
        if (files?.length) {
          // Compress new files
          await Promise.all(
            files.map((file) => this.compressionService.compressFiles(file)),
          );

          // Add new images to database
          await prisma.room_image.createMany({
            data: files.map((file) => ({
              room_id: id,
              image: file.filename,
            })),
          });
        }

        // Update accessorys if provided
        if (accessorys !== undefined) {
          // Remove existing accessorys
          await prisma.room_accessory.deleteMany({
            where: { room_id: id },
          });

          // Add new accessorys if any
          if (accessorys.split(',')?.length) {
            await prisma.room_accessory.createMany({
              data: accessorys.split(',').map((accessoryId) => ({
                room_id: id,
                accessory_id: Number(accessoryId),
              })),
            });
          }
        }

        // Update room data
        const updatedRoom = await prisma.room.update({
          where: { id },
          data: {
            ...(roomData.name && { name: roomData.name }),
            ...(roomData.detail && { detail: roomData.detail }),
            ...(roomData.location && { location: roomData.location }),
            ...(roomData.size && { size: roomData.size }),
            ...(roomData.capacity && {
              capacity: roomData.capacity.toString(),
            }),
            ...(roomData.status !== undefined && { status: roomData.status }),
          },
          include: {
            room_image: true,
            room_accessory: {
              include: {
                accessory: true,
              },
            },
          },
        });

        return updatedRoom;
      });
    } catch (error) {
      // Cleanup uploaded files if there's an error
      if (files?.length) {
        await Promise.all(
          files.map((file) => this.fileService.deleteFiles(file.path)),
        );
      }
      handlePrismaError(error);
    }
  }

  async findByCondition(query: FindRoomsByConditionQueryDto) {
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
      const where: Prisma.roomWhereInput = {};

      const andConditions: Prisma.roomWhereInput[] = [];

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

      console.log('where', where);

      const skip = (Number(page) - 1) * Number(pageSize);

      const [data, pageCount, total] = await Promise.all([
        this.db.room.findMany({
          where,
          include: {
            room_image: true,
            room_accessory: {
              select: {
                id: true,
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
        this.db.room.count({ where }),
        this.db.room.count(),
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
      const room = await this.db.room.findMany({
        include: {
          room_image: true,
        },
      });
      return room;
    } catch (error) {
      handlePrismaError(error);
    }
  }

  async findRoomEmpty() {
    try {
      const todayStart = this.dateService.startOf('day')
      const todayEnd = this.dateService.endOf("day")

      const room = await this.db.room.findMany({
        where: {
          booking_list: {
            none: {
              OR: [
                {
                  book_start: {
                    lte: todayEnd, // การจองเริ่มต้นก่อนหรือในวันนี้
                  },
                  book_end: {
                    gte: todayStart, // การจบการจองหลังหรือในวันนี้
                  },
                },
              ],
            },
          },
        },
        include: {
          booking_list: true, // หากต้องการดึงข้อมูลการจองด้วย
          room_image: true,
        },
      });

      return room;
    } catch (error) {
      handlePrismaError(error);
    }
  }

  async findOne(id: number) {
    const oneMonthAgo = this.dateService.subtractTime(new Date(), 1, "month");
    const oneMonthAhead = this.dateService.addTime(new Date(), 1, "month");
    try {
      const room = await this.db.room.findFirst({
        where: { id },
        include: {
          room_accessory: {
            include: {
              accessory: {
                select: {
                  id: true,
                  name: true,
                  image: true,
                },
              },
            },
          },
          room_image: true,
          booking_list: {
            select: {
              id: true,
              user_id: true,
              department_id: true,
              user_name: true,
              book_start: true,
              book_end: true,
              title: true,
            },
            where: {
              created_at: {
                gte: oneMonthAgo,
                lte: oneMonthAhead,
              },
            },
            orderBy: {
              book_start: 'desc',
            },
          },
        },
      });
      return room;
    } catch (error) {
      handlePrismaError(error);
    }
  }

  async findForDropdown() {
    try {
      const room = await this.db.room.findMany({
        select: {
          id: true,
          name: true,
        },
      });
      return room;
    } catch (error) {
      handlePrismaError(error);
    }
  }

  async updateStatusMany(ids: number[], status: number) {
    try {
      return await this.db.room.updateMany({
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

  async updateStatusOne(id: number, data: UpdateStatusRoomDto) {
    try {
      return await this.db.room.update({ data, where: { id } });
    } catch (error) {
      handlePrismaError(error);
    }
  }

  async remove(id: number) {
    try {
      // ดึงข้อมูลรูปภาพที่เกี่ยวข้อง
      const roomImages = await this.db.room_image.findMany({
        where: { room_id: id },
      });

      // ลบไฟล์รูปภาพ
      for (const image of roomImages) {
        const filePath = path.join('public', 'room', image.image);
        await this.fileService.deleteFiles(filePath);
      }

      // ลบข้อมูลรูปภาพจากฐานข้อมูล
      await this.db.room_image.deleteMany({
        where: { room_id: id },
      });

      // ลบข้อมูลห้อง
      return await this.db.room.delete({
        where: { id },
      });
    } catch (error) {
      handlePrismaError(error);
    }
  }

  async removeMany(ids: number[]) {
    try {
      // ดึงข้อมูลรูปภาพที่เกี่ยวข้องกับห้องหลายห้อง
      const roomImages = await this.db.room_image.findMany({
        where: { room_id: { in: ids } },
      });

      // ลบไฟล์รูปภาพ
      for (const image of roomImages) {
        const filePath = path.join('public', 'room', image.image);
        await this.fileService.deleteFiles(filePath);
      }

      // ลบข้อมูลรูปภาพจากฐานข้อมูล
      await this.db.room_image.deleteMany({
        where: { room_id: { in: ids } },
      });

      // ลบข้อมูลห้อง
      return await this.db.room.deleteMany({
        where: { id: { in: ids } },
      });
    } catch (error) {
      handlePrismaError(error);
    }
  }
}
