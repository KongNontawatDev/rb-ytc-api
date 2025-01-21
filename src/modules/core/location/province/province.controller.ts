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
import { ProvinceService } from './province.service';
import { CreateProvinceDto } from './dto/create-province.dto';
import {
  DeleteManyProvinceDto,
  UpdateProvinceDto,
} from './dto/update-province.dto';
import { Public } from '@common/decorators/public.decorator';
import {
  FindOneProvinceParamDto,
  FindProvincesByConditionQueryDto,
} from './dto/params-province.dto';
import { ProvinceDocs } from './province.docs';
import { JwtAuthGuard } from '@provider/jwt/guards/jwt-auth.guard';

@Controller({
  path: 'core/province',
  version: ['1'],
})
@UseGuards(JwtAuthGuard)
export class ProvinceController {
  constructor(private readonly provinceService: ProvinceService) {}

  @Post()
  @ProvinceDocs.create()
  async create(@Body() body: CreateProvinceDto) {
    let { sub, ...bodyData } = body;
    const data = await this.provinceService.create(bodyData);
    return {
      message: 'เพิ่มข้อมูลจังหวัด',
      error: 0,
      data,
    };
  }

  @Get('/search')
  @ProvinceDocs.findByCondition()
  async findByCondition(@Query() query: FindProvincesByConditionQueryDto) {
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
      result = await this.provinceService.findByCondition(query);
    } else {
      const provinces = await this.provinceService.findAll();
      result = { data: provinces };
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
  @ProvinceDocs.findAll()
  async findAll() {
    return await this.provinceService.findAll();
  }

  @Get(':id')
  @ProvinceDocs.findOne()
  @UsePipes(new ValidationPipe({ transform: true }))
  async findOne(@Param() params: FindOneProvinceParamDto) {
    const data = await this.provinceService.findOne(+params.id);
    return {
      message: 'เรียกดูข้อมูลจังหวัดตามรหัส',
      error: 0,
      data,
    };
  }

  @Patch(':id')
  @ProvinceDocs.update()
  async update(
    @Param('id') id: string,
    @Body() updateProvinceDto: UpdateProvinceDto,
  ) {
    let { sub, ...body } = updateProvinceDto;
    const data = await this.provinceService.update(+id, body);

    return {
      message: 'แก้ไขข้อมูลจังหวัดตามรหัส',
      error: 0,
      data,
    };
  }

  @Delete(':id')
  @ProvinceDocs.remove()
  async remove(@Param('id') id: string) {
    const data = await this.provinceService.remove(+id);

    return {
      message: 'ลบข้อมูลจังหวัดตามรหัส',
      error: 0,
      data,
    };
  }

  @Post('delete-many')
  @ProvinceDocs.removeMany()
  async removeMany(@Body() body: DeleteManyProvinceDto) {
    const data = await this.provinceService.removeMany(body.id);

    return {
      message: 'ลบข้อมูลจังหวัดตามรหัสที่เลือก',
      error: 0,
      data,
    };
  }
}
