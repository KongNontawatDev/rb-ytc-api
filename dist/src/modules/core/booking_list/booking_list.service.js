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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BookingListService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../../provider/prisma/prisma.service");
const uuid_1 = require("uuid");
const prisma_error_handler_1 = require("../../../common/exceptions/prisma-error.handler");
const date_service_1 = require("../../../common/utils/date/date.service");
const dayjs_1 = __importDefault(require("dayjs"));
let BookingListService = class BookingListService {
    constructor(db, date) {
        this.db = db;
        this.date = date;
    }
    async create(data) {
        try {
            return await this.db.booking_list.create({
                data: {
                    ...data,
                    status: 1,
                    booking_number: this.generateBookingNumber(),
                },
                include: {
                    user: {
                        select: {
                            line_id: true
                        }
                    },
                    room: {
                        select: {
                            name: true
                        }
                    }
                }
            });
        }
        catch (error) {
            (0, prisma_error_handler_1.handlePrismaError)(error);
        }
    }
    async findByCondition(query) {
        const { textSearch, searchField, page, pageSize, sortField, sortOrder, room_id, user_id, status, book_start, book_end, } = query;
        try {
            const where = {};
            const andConditions = [];
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
            if (book_start || book_end) {
                const dateRangeCondition = {};
                if (book_start && book_end) {
                    dateRangeCondition.book_start = {
                        gte: this.date.toDateSql(book_start),
                        lte: this.date.toDateSql(book_end),
                    };
                }
                else if (book_start) {
                    dateRangeCondition.book_start = {
                        gte: this.date.toDateSql(book_start),
                    };
                }
                else if (book_end) {
                    dateRangeCondition.book_start = {
                        lte: this.date.toDateSql(book_end),
                    };
                }
                andConditions.push(dateRangeCondition);
            }
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
        }
        catch (error) {
            (0, prisma_error_handler_1.handlePrismaError)(error);
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
        }
        catch (error) {
            (0, prisma_error_handler_1.handlePrismaError)(error);
        }
    }
    async findCount() {
        try {
            return await this.db.booking_list.count({ where: { status: 1 } });
        }
        catch (error) {
            (0, prisma_error_handler_1.handlePrismaError)(error);
        }
    }
    async findOne(id) {
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
        }
        catch (error) {
            (0, prisma_error_handler_1.handlePrismaError)(error);
        }
    }
    async findManyByUser(user_id) {
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
        }
        catch (error) {
            (0, prisma_error_handler_1.handlePrismaError)(error);
        }
    }
    async findAllCurrentMonth() {
        try {
            const startOfMonth = (0, dayjs_1.default)().startOf('month').toDate();
            const endOfMonth = (0, dayjs_1.default)().endOf('month').toDate();
            return await this.db.booking_list.findMany({
                where: {
                    book_start: {
                        gte: startOfMonth,
                    },
                    book_end: {
                        lte: endOfMonth,
                    },
                },
                orderBy: {
                    id: "desc"
                }
            });
        }
        catch (error) {
            (0, prisma_error_handler_1.handlePrismaError)(error);
        }
    }
    async findManyByRoomForCalendarAndTimeline(room_id) {
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
        }
        catch (error) {
            (0, prisma_error_handler_1.handlePrismaError)(error);
        }
    }
    async findManyByUserForCalendarAndTimeline(user_id) {
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
        }
        catch (error) {
            (0, prisma_error_handler_1.handlePrismaError)(error);
        }
    }
    async update(id, data) {
        try {
            return await this.db.booking_list.update({ data, where: { id } });
        }
        catch (error) {
            (0, prisma_error_handler_1.handlePrismaError)(error);
        }
    }
    async updateStatusMany(ids, status) {
        try {
            return await this.db.booking_list.updateMany({
                where: {
                    id: {
                        in: ids,
                    },
                },
                data: {
                    status: Number(status),
                },
            });
        }
        catch (error) {
            (0, prisma_error_handler_1.handlePrismaError)(error);
        }
    }
    async updateStatusOne(id, data) {
        try {
            return await this.db.booking_list.update({ data, where: { id }, include: {
                    user: {
                        select: {
                            line_id: true
                        }
                    },
                    room: {
                        select: {
                            name: true
                        }
                    }
                } });
        }
        catch (error) {
            (0, prisma_error_handler_1.handlePrismaError)(error);
        }
    }
    async remove(id) {
        try {
            return await this.db.booking_list.delete({
                where: { id },
            });
        }
        catch (error) {
            (0, prisma_error_handler_1.handlePrismaError)(error);
        }
    }
    async removeMany(id) {
        try {
            return await this.db.booking_list.deleteMany({
                where: {
                    id: {
                        in: id,
                    },
                },
            });
        }
        catch (error) {
            (0, prisma_error_handler_1.handlePrismaError)(error);
        }
    }
    generateBookingNumber() {
        const fullUUID = (0, uuid_1.v4)().replace(/-/g, '');
        return fullUUID.slice(0, 10).toUpperCase();
    }
};
exports.BookingListService = BookingListService;
exports.BookingListService = BookingListService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        date_service_1.DateService])
], BookingListService);
//# sourceMappingURL=booking_list.service.js.map