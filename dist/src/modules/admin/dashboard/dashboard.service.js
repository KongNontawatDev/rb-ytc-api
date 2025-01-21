"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DashboardService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../../provider/prisma/prisma.service");
let DashboardService = class DashboardService {
    constructor(db) {
        this.db = db;
    }
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
        const [booking_list_count, room_count, user_count, accessory_count, monthly_bookings, booking_list,] = await Promise.all([
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
            this.db.$queryRaw `
        SELECT DATE_FORMAT(book_start, '%m') as month, 
               COUNT(*) as count
        FROM booking_list
        WHERE status IN (1, 2)
        GROUP BY DATE_FORMAT(book_start, '%m')
        ORDER BY month ASC
      `,
            this.db.booking_list.findMany({ where: { status: { in: [1, 2] } }, select: {
                    id: true,
                    title: true,
                    room: {
                        select: {
                            name: true
                        }
                    },
                    book_start: true,
                    book_end: true,
                } })
        ]);
        const bookings_by_month = Array.from({ length: 12 }, (_, i) => {
            const month = String(i + 1).padStart(2, '0');
            const found = monthly_bookings.find(b => b.month === month);
            return {
                month: i + 1,
                month_name: thaiMonths[i],
                count: found ? Number(found.count) : 0
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
};
exports.DashboardService = DashboardService;
exports.DashboardService = DashboardService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], DashboardService);
//# sourceMappingURL=dashboard.service.js.map