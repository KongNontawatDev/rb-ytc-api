import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  UsePipes,
  ValidationPipe,
  Query,
} from '@nestjs/common';
import { Public } from '@common/decorators/public.decorator';
import { JwtAuthGuard } from '@provider/jwt/guards/jwt-auth.guard';
import { DepartmentService } from '@modules/core/department/department.service';
import { CreateDepartmentDto } from '@modules/core/department/dto/create-department.dto';
import {
  DeleteManyDepartmentDto,
  FindDepartmentsByConditionQueryDto,
  FindOneDepartmentParamDto,
  UpdateManyDepartmentDto,
  UpdateStatusDepartmentDto,
} from '@modules/core/department/dto/params-department.dto';
import { UpdateDepartmentDto } from '@modules/core/department/dto/update-department.dto';

@Controller({
  path: 'admin/department',
  version: ['1'],
})
@UseGuards(JwtAuthGuard)
export class DepartmentController {
  constructor(private readonly departmentService: DepartmentService) {}

  @Post()
  async create(@Body() body: CreateDepartmentDto) {
    const data = await this.departmentService.create(body);
    return {
      message: 'เพิ่มข้อมูลแผนก/ฝ่ายงาน',
      error: 0,
      data,
    };
  }

  @Get('/search')
  async findByCondition(@Query() query: FindDepartmentsByConditionQueryDto) {
    const hasQueryParams =
      query.textSearch ||
      query.searchField ||
      query.page ||
      query.pageSize ||
      query.sortField ||
      query.sortOrder;

    let result:
      | { data: any[] | undefined; pageCount?: number; total?: number }
      | undefined;

    if (hasQueryParams) {
      result = await this.departmentService.findByCondition(query);
    } else {
      const departments = await this.departmentService.findAll();
      result = { data: departments };
    }

    if (result) {
      return {
        message: 'เรียกดูข้อมูลผู้ใช้ทั้งหมด',
        ...(hasQueryParams && {
          meta: {
            page: Number(query.page) || 1,
            pageSize: Number(query.pageSize) || 10,
            pageCount: result.pageCount,
            total: result.total,
          },
        }),
        error: 0,
        data: result.data,
      };
    }
  }

  @Get()
  @Public()
  async findAll() {
    return await this.departmentService.findAll();
  }

  @Get(':id')
  @UsePipes(new ValidationPipe({ transform: true }))
  async findOne(@Param() params: FindOneDepartmentParamDto) {
    const data = await this.departmentService.findOne(+params.id);
    return {
      message: 'เรียกดูข้อมูลแผนก/ฝ่ายงานตามรหัส',
      error: 0,
      data,
    };
  }

  @Get('/list/dropdown')
  async findForDropdown() {
    const data = await this.departmentService.findForDropdown();
    return {
      message: 'เรียกดูข้อมูลแผนก/ฝ่ายงานแสดงที่ dropdown',
      error: 0,
      data,
    };
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() body: UpdateDepartmentDto) {
    const data = await this.departmentService.update(+id, body);

    return {
      message: 'แก้ไขข้อมูลแผนก/ฝ่ายงานตามรหัส',
      error: 0,
      data,
    };
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    const data = await this.departmentService.remove(+id);

    return {
      message: 'ลบข้อมูลแผนก/ฝ่ายงานตามรหัส',
      error: 0,
      data,
    };
  }

  @Post('delete-many')
  async removeMany(@Body() body: DeleteManyDepartmentDto) {
    const data = await this.departmentService.removeMany(body.id);

    return {
      message: 'ลบข้อมูลแผนก/ฝ่ายงานตามรหัสที่เลือก',
      error: 0,
      data,
    };
  }

  @Patch('update/status/:id')
  async updateStatusOne(@Param('id') id: string, @Body() body: UpdateStatusDepartmentDto) {
    const data = await this.departmentService.updateStatusOne(+id, body);

    return {
      message: 'แก้ไขสถานะแผนก/ฝ่ายงานตามรหัส',
      error: 0,
      data,
    };
  }

  @Post('update-status-many')
  async updateStatusMany(@Body() body: UpdateManyDepartmentDto) {
    const data = await this.departmentService.updateStatusMany(
      body.id,
      body.status,
    );

    return {
      message: 'เปลี่ยนสถานะแผนก/ฝ่ายงานหลายแถว',
      error: 0,
      data,
    };
  }
}
