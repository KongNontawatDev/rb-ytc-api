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
exports.RoomService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../../provider/prisma/prisma.service");
const prisma_error_handler_1 = require("../../../common/exceptions/prisma-error.handler");
const file_service_1 = require("../../../common/utils/file/file.service");
const path_1 = __importDefault(require("path"));
const compression_service_1 = require("../../../common/utils/compression/compression.service");
const date_service_1 = require("../../../common/utils/date/date.service");
let RoomService = class RoomService {
    constructor(db, fileService, compressionService, dateService) {
        this.db = db;
        this.fileService = fileService;
        this.compressionService = compressionService;
        this.dateService = dateService;
    }
    async create(data, files) {
        try {
            const { accessorys, ...roomData } = data;
            if (files?.length) {
                await Promise.all(files.map((file) => this.compressionService.compressFiles(file)));
            }
            const room = await this.db.room.create({
                data: {
                    name: roomData.name,
                    detail: roomData.detail,
                    location: roomData.location,
                    size: roomData.size,
                    capacity: roomData.capacity.toString(),
                    status: 1,
                    ...(files?.length > 0 && {
                        room_image: {
                            createMany: {
                                data: files.map((file) => ({
                                    image: file.filename,
                                })),
                            },
                        },
                    }),
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
        }
        catch (error) {
            if (files?.length) {
                await Promise.all(files.map((file) => this.fileService.deleteFiles(file.path)));
            }
            (0, prisma_error_handler_1.handlePrismaError)(error);
        }
    }
    async update(id, data, files) {
        try {
            const { accessorys, removeImages, ...roomData } = data;
            return await this.db.$transaction(async (prisma) => {
                if (removeImages?.length) {
                    const imagesToRemove = removeImages;
                    await Promise.all(imagesToRemove.map(async (imageName) => {
                        const filePath = path_1.default.join('public', 'room', imageName);
                        await this.fileService.deleteFiles(filePath);
                    }));
                    await prisma.room_image.deleteMany({
                        where: {
                            room_id: id,
                            image: {
                                in: imagesToRemove,
                            },
                        },
                    });
                }
                if (files?.length) {
                    await Promise.all(files.map((file) => this.compressionService.compressFiles(file)));
                    await prisma.room_image.createMany({
                        data: files.map((file) => ({
                            room_id: id,
                            image: file.filename,
                        })),
                    });
                }
                if (accessorys !== undefined) {
                    await prisma.room_accessory.deleteMany({
                        where: { room_id: id },
                    });
                    if (accessorys.split(',')?.length) {
                        await prisma.room_accessory.createMany({
                            data: accessorys.split(',').map((accessoryId) => ({
                                room_id: id,
                                accessory_id: Number(accessoryId),
                            })),
                        });
                    }
                }
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
        }
        catch (error) {
            if (files?.length) {
                await Promise.all(files.map((file) => this.fileService.deleteFiles(file.path)));
            }
            (0, prisma_error_handler_1.handlePrismaError)(error);
        }
    }
    async findByCondition(query) {
        const { textSearch, searchField, page, pageSize, sortField, sortOrder, status, } = query;
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
            const room = await this.db.room.findMany({
                include: {
                    room_image: true,
                },
            });
            return room;
        }
        catch (error) {
            (0, prisma_error_handler_1.handlePrismaError)(error);
        }
    }
    async findRoomEmpty() {
        try {
            const todayStart = this.dateService.startOf('day');
            const todayEnd = this.dateService.endOf("day");
            const room = await this.db.room.findMany({
                where: {
                    booking_list: {
                        none: {
                            OR: [
                                {
                                    book_start: {
                                        lte: todayEnd,
                                    },
                                    book_end: {
                                        gte: todayStart,
                                    },
                                },
                            ],
                        },
                    },
                },
                include: {
                    booking_list: true,
                    room_image: true,
                },
            });
            return room;
        }
        catch (error) {
            (0, prisma_error_handler_1.handlePrismaError)(error);
        }
    }
    async findOne(id) {
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
        }
        catch (error) {
            (0, prisma_error_handler_1.handlePrismaError)(error);
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
        }
        catch (error) {
            (0, prisma_error_handler_1.handlePrismaError)(error);
        }
    }
    async updateStatusMany(ids, status) {
        try {
            return await this.db.room.updateMany({
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
            return await this.db.room.update({ data, where: { id } });
        }
        catch (error) {
            (0, prisma_error_handler_1.handlePrismaError)(error);
        }
    }
    async remove(id) {
        try {
            const roomImages = await this.db.room_image.findMany({
                where: { room_id: id },
            });
            for (const image of roomImages) {
                const filePath = path_1.default.join('public', 'room', image.image);
                await this.fileService.deleteFiles(filePath);
            }
            await this.db.room_image.deleteMany({
                where: { room_id: id },
            });
            return await this.db.room.delete({
                where: { id },
            });
        }
        catch (error) {
            (0, prisma_error_handler_1.handlePrismaError)(error);
        }
    }
    async removeMany(ids) {
        try {
            const roomImages = await this.db.room_image.findMany({
                where: { room_id: { in: ids } },
            });
            for (const image of roomImages) {
                const filePath = path_1.default.join('public', 'room', image.image);
                await this.fileService.deleteFiles(filePath);
            }
            await this.db.room_image.deleteMany({
                where: { room_id: { in: ids } },
            });
            return await this.db.room.deleteMany({
                where: { id: { in: ids } },
            });
        }
        catch (error) {
            (0, prisma_error_handler_1.handlePrismaError)(error);
        }
    }
};
exports.RoomService = RoomService;
exports.RoomService = RoomService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        file_service_1.FileService,
        compression_service_1.CompressionService,
        date_service_1.DateService])
], RoomService);
//# sourceMappingURL=room.service.js.map