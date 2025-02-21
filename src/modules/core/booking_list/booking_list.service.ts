import { ConflictException, Injectable } from '@nestjs/common';
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

@Injectable()
export class BookingListService {
  constructor(
    private db: PrismaService,
    private date: DateService,
  ) {}

  async create(data: CreateBookingListDto) {
    // Normalize book_start and book_end to ignore seconds
    const bookStart = this.date.removeSeconds(data.book_start);
    const bookEnd = this.date.removeSeconds(data.book_end);

    const existingBookings = await this.db.booking_list.findMany({
      where: {
        room_id: data.room_id,
        status: 1,
        OR: [
          {
            book_start: { lte: bookEnd },
            book_end: { gte: bookStart },
          },
          {
            book_start: {
              gte: bookStart,
              lte: bookEnd,
            },
          },
          {
            book_start: { lte: bookStart },
            book_end: { gte: bookEnd },
          },
        ],
      },
    });

    if (existingBookings.length > 0) {
      throw new ConflictException(
        `มีการจองห้องในช่วงเวลา ${this.date.formatDate(bookStart, 'YYYY-MM-DD HH:mm:ss')} - ${this.date.formatDate(bookEnd, 'YYYY-MM-DD HH:mm:ss')} แล้ว`,
      );
    }

    try {
      return await this.db.booking_list.create({
        data: {
          ...data,
          book_start: bookStart,
          book_end: bookEnd,
          status: 1,
          booking_number: this.generateBookingNumber(),
        },
        include: {
          user: { select: { line_id: true } },
          room: { select: { name: true } },
        },
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
  
        const searchConditions = searchFields
          .map((field) => {
            if (field === 'id' || field === 'status') {
              const numValue = Number(textSearch);
              if (!isNaN(numValue)) {
                return {
                  [field]: numValue,
                };
              }
              return undefined;
            }
            return {
              [field]: {
                contains: textSearch,
              },
            };
          })
          .filter((condition) => condition !== undefined);
  
        if (searchConditions.length > 0) {
          andConditions.push({
            OR: searchConditions,
          });
        }
      }
  
      // Filter by `status`
      let statusCondition = {};
      if (status) {
        const statusValues = status
          .split(',')
          .map((value) => Number(value.trim()));
  
        statusCondition = {
          OR: statusValues.map((statusValue) => ({
            status: statusValue,
          })),
        };
        andConditions.push(statusCondition);
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
  
        const startDate = book_start
          ? this.date.startOf('day', book_start)
          : this.date.startOf('day');
  
        const endDate = book_end
          ? this.date.endOf('day', book_end)
          : this.date.endOf('day');
  
        dateRangeCondition.book_start = {
          gte: startDate,
          lte: endDate,
        };
  
        andConditions.push(dateRangeCondition);
      }
  
      // Combine all conditions in AND
      if (andConditions.length > 0) {
        where['AND'] = andConditions;
      }
  
      const skip = (Number(page) - 1) * Number(pageSize);
  
      // สร้าง baseWhereConditions - คัดลอก andConditions แต่ไม่รวมเงื่อนไข status
      const baseWhereConditions = andConditions.filter(condition => 
        condition !== statusCondition
      );
      
      const baseWhere: Prisma.booking_listWhereInput = {};
      if (baseWhereConditions.length > 0) {
        baseWhere['AND'] = baseWhereConditions;
      }
  
      // ดึงค่า status ทั้งหมดที่มีในระบบ
      const allStatuses = [1, 2, 3]; // แก้ไขตามสถานะที่มีในระบบของคุณ
  
      // สร้าง Promise สำหรับการนับแต่ละสถานะพร้อมกับดึงข้อมูลหลัก
      const [data, pageCount, total, ...statusCounts] = await Promise.all([
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
        ...allStatuses.map(statusValue => 
          this.db.booking_list.count({
            where: {
              ...baseWhere,
              status: statusValue
            }
          })
        )
      ]);
  
      // สร้าง object ที่เก็บจำนวนแต่ละสถานะ
      const statusCountsObj = allStatuses.reduce((acc, status, index) => {
        acc[`status_${status}`] = statusCounts[index];
        return acc;
      }, {} as Record<string, number>);
  
      return {
        data,
        pageCount,
        total,
        statusCounts: statusCountsObj
      };
    } catch (error) {
      handlePrismaError(error);
      return {
        data: [],
        pageCount: 0,
        total: 0,
        statusCounts: {}
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
      const { start, end } = this.date.getCurrentMonthRange();
      return await this.db.booking_list.findMany({
        where: {
          book_start: {
            gte: start, // การจองเริ่มต้นตั้งแต่ต้นเดือน
          },
          book_end: {
            lte: end, // การจองสิ้นสุดภายในเดือน
          },
        },
        include: {
          room: {
            select: {
              name: true,
            },
          },
        },
        orderBy: {
          id: 'desc',
        },
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
      return await this.db.booking_list.update({
        data,
        where: { id },
        include: {
          user: {
            select: {
              line_id: true,
            },
          },
          room: {
            select: {
              name: true,
            },
          },
        },
      });
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

  async findRoomBookedDates(room_id: number): Promise<Date[]> {
    const bookings = await this.db.booking_list.findMany({
      where: {
        room_id,
        status: 1,
      },
      select: {
        book_start: true,
        book_end: true,
      },
    });

    const bookedDates = bookings.flatMap((booking) => {
      const dates: Date[] = [];
      let currentDate = this.date.Date(booking.book_start);
      const endDate = this.date.Date(booking.book_end);

      while (!currentDate.isAfter(endDate, 'day')) {
        dates.push(currentDate.toDate());
        currentDate = currentDate.add(1, 'day');
      }

      return dates;
    });

    return bookedDates;
  }

  generateBookingNumber() {
    const fullUUID = uuidv4().replace(/-/g, '');
    return fullUUID.slice(0, 10).toUpperCase();
  }
}
