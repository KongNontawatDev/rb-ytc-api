import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { role, role_permission } from '@prisma/client';
import { PrismaService } from 'src/provider/prisma/prisma.service';
import { CreateRoleDto, RolePermissionDto, UpdateRoleDto } from './dto/role.dto';

@Injectable()
export class RoleService {
  constructor(private prisma: PrismaService) {}

  /**
   * สร้าง Role ใหม่พร้อมกำหนดสิทธิ์
   */
  async create(data: CreateRoleDto): Promise<role> {
    const existingRole = await this.prisma.role.findUnique({
      where: { name: data.name },
    });

    if (existingRole) {
      throw new ConflictException(`Role with name ${data.name} already exists`);
    }

    return this.prisma.$transaction(async (tx) => {
      // สร้าง role
      const role = await tx.role.create({
        data: {
          name: data.name,
          description: data.description,
        },
      });

      // ถ้ามีการกำหนดสิทธิ์มาด้วย
      if (data.permissions?.length) {
        await this.assignPermissions(tx, role.id, data.permissions);
      }

      return role;
    });
  }

  /**
   * ดึงข้อมูล Role ทั้งหมด
   */
  async findAll() {
    return this.prisma.role.findMany({
      include: {
        permissions: {
          include: {
            resource: true,
            action: true,
          },
        },
      },
    });
  }

  /**
   * ค้นหา Role ตามเงื่อนไข
   */
  async findByCondition(
    search: string,
    page: number = 1,
    pageSize: number = 20,
    sortField: string = 'id',
    sortOrder: 'asc' | 'desc' = 'desc',
  ) {
    const skip = (page - 1) * pageSize;

    const [total, roles] = await Promise.all([
      // Count total records
      this.prisma.role.count({
        where: {
          OR: [
            { name: { contains: search } },
            { description: { contains: search } },
          ],
        },
      }),
      // Get paginated records
      this.prisma.role.findMany({
        where: {
          OR: [
            { name: { contains: search } },
            { description: { contains: search } },
          ],
        },
        include: {
          permissions: {
            include: {
              resource: true,
              action: true,
            },
          },
        },
        skip,
        take: pageSize,
        orderBy: {
          [sortField]: sortOrder,
        },
      }),
    ]);

    const pageCount = Math.ceil(total / pageSize);

    return {
      data: roles,
      pageCount,
      total,
    };
  }

  /**
   * ดึงข้อมูล Role ตาม ID
   */
  async findOne(id: number): Promise<role> {
    const role = await this.prisma.role.findUnique({
      where: { id },
      include: {
        permissions: {
          include: {
            resource: true,
            action: true,
          },
        },
      },
    });

    if (!role) {
      throw new NotFoundException(`Role with ID ${id} not found`);
    }

    return role;
  }

  /**
   * อัพเดท Role
   */
  async update(id: number, data: UpdateRoleDto): Promise<role> {
    // ตรวจสอบว่า role มีอยู่จริง
    await this.findOne(id);

    // ถ้ามีการเปลี่ยนชื่อ ตรวจสอบว่าชื่อซ้ำหรือไม่
    if (data.name) {
      const existingRole = await this.prisma.role.findFirst({
        where: {
          name: data.name,
          id: { not: id },
        },
      });

      if (existingRole) {
        throw new ConflictException(`Role with name ${data.name} already exists`);
      }
    }

    return this.prisma.$transaction(async (tx) => {
      // อัพเดทข้อมูล role
      const role = await tx.role.update({
        where: { id },
        data: {
          name: data.name,
          description: data.description,
        },
      });

      // ถ้ามีการอัพเดทสิทธิ์
      if (data.permissions) {
        // ลบสิทธิ์เดิมทั้งหมด
        await tx.role_permission.deleteMany({
          where: { role_id: id },
        });

        // เพิ่มสิทธิ์ใหม่
        await this.assignPermissions(tx, id, data.permissions);
      }

      return role;
    });
  }

  /**
   * ลบ Role
   */
  async remove(id: number): Promise<role> {
    // ตรวจสอบว่า role มีอยู่จริง
    await this.findOne(id);

    return this.prisma.role.delete({
      where: { id },
    });
  }

  /**
   * เพิ่มสิทธิ์ให้กับ Role
   */
  async grantPermission(role_id: number, { resource, action }: RolePermissionDto): Promise<role_permission> {
    // ตรวจสอบว่า role มีอยู่จริง
    await this.findOne(role_id);

    // หา resource และ action
    const [resourceRecord, actionRecord] = await Promise.all([
      this.prisma.resource.findUnique({ where: { name: resource } }),
      this.prisma.action.findUnique({ where: { name: action } }),
    ]);

    if (!resourceRecord || !actionRecord) {
      throw new NotFoundException('Resource or action not found');
    }

    // สร้างหรืออัพเดทสิทธิ์
    return this.prisma.role_permission.upsert({
      where: {
        role_id_resource_id_action_id: {
          role_id,
          resource_id: resourceRecord.id,
          action_id: actionRecord.id,
        },
      },
      update: {
        granted: true,
      },
      create: {
        role_id,
        resource_id: resourceRecord.id,
        action_id: actionRecord.id,
        granted: true,
      },
    });
  }

  /**
   * ยกเลิกสิทธิ์ของ Role
   */
  async revokePermission(role_id: number, { resource, action }: RolePermissionDto): Promise<role_permission> {
    // ตรวจสอบว่า role มีอยู่จริง
    await this.findOne(role_id);

    // หา resource และ action
    const [resourceRecord, actionRecord] = await Promise.all([
      this.prisma.resource.findUnique({ where: { name: resource } }),
      this.prisma.action.findUnique({ where: { name: action } }),
    ]);

    if (!resourceRecord || !actionRecord) {
      throw new NotFoundException('Resource or action not found');
    }

    // อัพเดทสิทธิ์เป็น false
    return this.prisma.role_permission.update({
      where: {
        role_id_resource_id_action_id: {
          role_id,
          resource_id: resourceRecord.id,
          action_id: actionRecord.id,
        },
      },
      data: {
        granted: false,
      },
    });
  }

  /**
   * ตรวจสอบสิทธิ์ของ Role
   */
  async checkPermission(
    role_id: number,
    { resource, action }: RolePermissionDto,
  ): Promise<boolean> {
    const permission = await this.prisma.role_permission.findFirst({
      where: {
        role_id,
        resource: {
          name: resource,
        },
        action: {
          name: action,
        },
        granted: true,
      },
    });

    return !!permission;
  }

  /**
   * Helper method สำหรับกำหนดสิทธิ์ให้กับ Role
   */
  private async assignPermissions(
    tx: any,
    role_id: number,
    permissions: Array<{ resource: string; actions: string[] }>,
  ) {
    for (const perm of permissions) {
      const resource = await tx.resource.findUnique({
        where: { name: perm.resource },
      });

      if (!resource) {
        throw new NotFoundException(`Resource ${perm.resource} not found`);
      }

      const actions = await tx.action.findMany({
        where: { name: { in: perm.actions } },
      });

      if (actions.length !== perm.actions.length) {
        throw new NotFoundException('Some actions not found');
      }

      await tx.rolePermission.createMany({
        data: actions.map((action) => ({
          role_id,
          resource_id: resource.id,
          action_id: action.id,
          granted: true,
        })),
      });
    }
  }
}