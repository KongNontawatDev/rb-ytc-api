import { Injectable } from '@nestjs/common';
import { CreateBookingListDto } from './dto/create-booking_list.dto';
import {
  UpdateBookingListDto,
  UpdateStatusBookingListDto,
} from './dto/update-booking_list.dto';
import { PrismaService } from '@provider/prisma/prisma.service';
import { v4 as uuidv4 } from 'uuid';
import { handlePrismaError } from '@common/exceptions/prisma-error.handler';
import { FindBookingListsByConditionQueryDto } from './dto/params-booking_list.dto';
import { Prisma } from '@prisma/client';
import { DateService } from '@common/utils/date/date.service';
import dayjs from 'dayjs';

@Injectable()
export class BookingListService {
  constructor(
    private db: PrismaService,
    private date: DateService,
  ) {}
  async create(data: CreateBookingListDto) {
    try {
      return await this.db.booking_list.create({
        data: {
          ...data,
          status: 1,
          booking_number: this.generateBookingNumber(),
        },
        include:{
          user:{
            select:{
              line_id:true
            }
          },
          room:{
            select:{
              name:true
            }
          }
        }
      });
    } catch (error) {
      handlePrismaError(error);
    }
  }

  async findByCondition(query: FindBookingListsByConditionQueryDto) {
    const {
      textSearch,
      searchField,
      page,
      pageSize,
      sortField,
      sortOrder,
      room_id,
      user_id,
      status,
      book_start,
      book_end,
    } = query;

    try {
      const where: Prisma.booking_listWhereInput = {};

      const andConditions: Prisma.booking_listWhereInput[] = [];

      // Search by text and fields
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

      // Filter by `status`
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

      // Filter by `user_id`
      if (user_id) {
        const userIdValues = user_id
          .split(',')
          .map((value) => Number(value.trim()));

        andConditions.push({
          OR: userIdValues.map((userIdValue) => ({
            user_id: userIdValue,
          })),
        });
      }

      // Filter by `room_id`
      if (room_id) {
        const roomIdValues = room_id
          .split(',')
          .map((value) => Number(value.trim()));

        andConditions.push({
          OR: roomIdValues.map((roomIdValue) => ({
            room_id: roomIdValue,
          })),
        });
      }

      // Filter by `book_start` and `book_end`
      if (book_start || book_end) {
        const dateRangeCondition: Prisma.booking_listWhereInput = {};

        if (book_start && book_end) {
          dateRangeCondition.book_start = {
            gte: this.date.toDateSql(book_start),
            lte: this.date.toDateSql(book_end),
          };
        } else if (book_start) {
          dateRangeCondition.book_start = {
            gte: this.date.toDateSql(book_start),
          };
        } else if (book_end) {
          dateRangeCondition.book_start = {
            lte: this.date.toDateSql(book_end),
          };
        }

        andConditions.push(dateRangeCondition);
      }

      // Combine all conditions in AND
      if (andConditions.length > 0) {
        where['AND'] = andConditions;
      }

      const skip = (Number(page) - 1) * Number(pageSize);

      const [data, pageCount, total] = await Promise.all([
        this.db.booking_list.findMany({
          where,
          include: {
            room: {
              select: {
                id: true,
                name: true,
                location: true,
              },
            },
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
        this.db.booking_list.count({ where }),
        this.db.booking_list.count(),
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
      return await this.db.booking_list.findMany();
    } catch (error) {
      handlePrismaError(error);
    }
  }

  async findCount() {
    try {
      return await this.db.booking_list.count({ where: { status: 1 } });
    } catch (error) {
      handlePrismaError(error);
    }
  }

  async findOne(id: number) {
    try {
      return await this.db.booking_list.findFirst({
        where: { id },
        include: {
          department: true,
          room: {
            include: {
              room_image: true,
            },
          },
        },
      });
    } catch (error) {
      handlePrismaError(error);
    }
  }

    async findManyByUser(user_id: number) {
    try {
      return await this.db.booking_list.findMany({
        where: { user_id },
        include: {
          department: true,
          room: {
            include: {
              room_image: true,
            },
          },
        },
      });
    } catch (error) {
      handlePrismaError(error);
    }
  }

  async findAllCurrentMonth() {
    try {
      const startOfMonth = dayjs().startOf('month').toDate(); // วันที่เริ่มต้นของเดือน
      const endOfMonth = dayjs().endOf('month').toDate(); // วันที่สิ้นสุดของเดือน
      return await this.db.booking_list.findMany({
        where: {
          book_start: {
            gte: startOfMonth, // การจองเริ่มต้นตั้งแต่ต้นเดือน
          },
          book_end: {
            lte: endOfMonth, // การจองสิ้นสุดภายในเดือน
          },
        },
        orderBy:{
          id:"desc"
        }
      });
    } catch (error) {
      handlePrismaError(error);
    }
  }

  async findManyByRoomForCalendarAndTimeline(room_id: number) {
    try {
      return await this.db.booking_list.findMany({
        where: { room_id },
        select: {
          id: true,
          title: true,
          user_name: true,
          book_start: true,
          book_end: true,
          booking_number: true,
        },
        orderBy: { book_start: 'desc' },
      });
    } catch (error) {
      handlePrismaError(error);
    }
  }

  async findManyByUserForCalendarAndTimeline(user_id: number) {
    try {
      return await this.db.booking_list.findMany({
        where: { user_id },
        select: {
          id: true,
          title: true,
          user_name: true,
          book_start: true,
          book_end: true,
          booking_number: true,
        },
        orderBy: { book_start: 'desc' },
      });
    } catch (error) {
      handlePrismaError(error);
    }
  }

  async update(id: number, data: UpdateBookingListDto) {
    try {
      return await this.db.booking_list.update({ data, where: { id } });
    } catch (error) {
      handlePrismaError(error);
    }
  }

  async updateStatusMany(ids: number[], status: number) {
    try {
      return await this.db.booking_list.updateMany({
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

  async updateStatusOne(id: number, data: UpdateStatusBookingListDto) {
    try {
      return await this.db.booking_list.update({ data, where: { id }, include:{
          user:{
            select:{
              line_id:true
            }
          },
          room:{
            select:{
              name:true
            }
          }
        } });
    } catch (error) {
      handlePrismaError(error);
    }
  }

  async remove(id: number) {
    try {
      return await this.db.booking_list.delete({
        where: { id },
      });
    } catch (error) {
      handlePrismaError(error);
    }
  }

  async removeMany(id: number[]) {
    try {
      return await this.db.booking_list.deleteMany({
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

  generateBookingNumber() {
    const fullUUID = uuidv4().replace(/-/g, '');
    return fullUUID.slice(0, 10).toUpperCase();
  }
}
