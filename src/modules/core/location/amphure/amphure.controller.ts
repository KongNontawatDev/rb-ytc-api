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
import { AmphureService } from './amphure.service';
import { CreateAmphureDto } from './dto/create-amphure.dto';
import {
  DeleteManyAmphureDto,
  UpdateAmphureDto,
} from './dto/update-amphure.dto';
import { Public } from '@common/decorators/public.decorator';
import {
  FindOneAmphureParamDto,
  FindAmphuresByConditionQueryDto,
} from './dto/params-amphure.dto';
import { AmphureDocs } from './amphure.docs';
import { JwtAuthGuard } from '@provider/jwt/guards/jwt-auth.guard';

@Controller({
  path: 'core/amphure',
  version: ['1'],
})
@UseGuards(JwtAuthGuard)
export class AmphureController {
  constructor(private readonly amphureService: AmphureService) {}

  @Post()
  @AmphureDocs.create()
  async create(@Body() body: CreateAmphureDto) {
    let { sub, ...bodyData } = body;
    const data = await this.amphureService.create(bodyData);
    return {
      message: 'เพิ่มข้อมูลอำเภอ',
      error: 0,
      data,
    };
  }

  @Get('/search')
  @AmphureDocs.findByCondition()
  async findByCondition(@Query() query: FindAmphuresByConditionQueryDto) {
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
      result = await this.amphureService.findByCondition(query);
    } else {
      const amphures = await this.amphureService.findAll();
      result = { data: amphures };
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
  @AmphureDocs.findAll()
  async findAll() {
    return await this.amphureService.findAll();
  }

  @Get(':id')
  @AmphureDocs.findOne()
  @UsePipes(new ValidationPipe({ transform: true }))
  async findOne(@Param() params: FindOneAmphureParamDto) {
    const data = await this.amphureService.findOne(+params.id);
    return {
      message: 'เรียกดูข้อมูลอำเภอตามรหัส',
      error: 0,
      data,
    };
  }

  @Patch(':id')
  @AmphureDocs.update()
  async update(
    @Param('id') id: string,
    @Body() updateAmphureDto: UpdateAmphureDto,
  ) {
    const data = await this.amphureService.update(+id, updateAmphureDto);

    return {
      message: 'แก้ไขข้อมูลอำเภอตามรหัส',
      error: 0,
      data,
    };
  }

  @Delete(':id')
  @AmphureDocs.remove()
  async remove(@Param('id') id: string) {
    const data = await this.amphureService.remove(+id);

    return {
      message: 'ลบข้อมูลอำเภอตามรหัส',
      error: 0,
      data,
    };
  }

  @Post('delete-many')
  @AmphureDocs.removeMany()
  async removeMany(@Body() body: DeleteManyAmphureDto) {
    const data = await this.amphureService.removeMany(body.id);

    return {
      message: 'ลบข้อมูลอำเภอตามรหัสที่เลือก',
      error: 0,
      data,
    };
  }
}
