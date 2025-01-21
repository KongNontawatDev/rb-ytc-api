import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from '@provider/prisma/prisma.service';

@Injectable()
export class DashboardService {
  constructor(private db: PrismaService) {}

  async findAll() {
    const thaiMonths = [
      'ม.ค.',
      'ก.พ.',
      'มี.ค.',
      'เม.ย.',
      'พ.ค.',
      'มิ.ย.',
      'ก.ค.',
      'ส.ค.',
      'ก.ย.',
      'ต.ค.',
      'พ.ย.',
      'ธ.ค.',
    ];
    const [
      booking_list_count,
      room_count,
      user_count,
      accessory_count,
      monthly_bookings,
      booking_list,
    ] = await Promise.all([
      this.db.booking_list.count({
        where: {
          status: {
            in: [1, 2],
          },
        },
      }),
      this.db.room.count(),
      this.db.user.count(),
      this.db.accessory.count(),
      this.db.$queryRaw<Array<{ month: string; count: bigint }>>`
        SELECT DATE_FORMAT(book_start, '%m') as month, 
               COUNT(*) as count
        FROM booking_list
        WHERE status IN (1, 2)
        GROUP BY DATE_FORMAT(book_start, '%m')
        ORDER BY month ASC
      `,
      this.db.booking_list.findMany({where:{status:{in:[1,2]}},select:{
        id:true,
        title:true,
        room:{
          select:{
            name:true
          }
        },
        book_start:true,
        book_end:true,
      }})
    ]);

    const bookings_by_month = Array.from({ length: 12 }, (_, i) => {
      const month = String(i + 1).padStart(2, '0');
      const found = monthly_bookings.find(b => b.month === month);
      return {
        month: i + 1,
        month_name: thaiMonths[i],
        count: found ? Number(found.count) : 0  // แปลง BigInt เป็น Number
      };
    });

    return {
      booking_list_count,
      room_count,
      user_count,
      accessory_count,
      bookings_by_month,
      booking_list
    };
  }
}
