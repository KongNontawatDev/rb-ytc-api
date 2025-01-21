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
import { DistrictService } from './district.service';
import { CreateDistrictDto } from './dto/create-district.dto';
import {
  DeleteManyDistrictDto,
  UpdateDistrictDto,
} from './dto/update-district.dto';
import { Public } from '@common/decorators/public.decorator';
import {
  FindOneDistrictParamDto,
  FindDistrictsByConditionQueryDto,
} from './dto/params-district.dto';
import { DistrictDocs } from './district.docs';
import { JwtAuthGuard } from '@provider/jwt/guards/jwt-auth.guard';

@Controller({
  path: 'core/district',
  version: ['1'],
})
@UseGuards(JwtAuthGuard)
export class DistrictController {
  constructor(private readonly districtService: DistrictService) {}

  @Post()
  @DistrictDocs.create()
  async create(@Body() body: CreateDistrictDto) {
    let { sub, ...bodyData } = body;
    const data = await this.districtService.create(bodyData);
    return {
      message: 'เพิ่มข้อมูลตำบล',
      error: 0,
      data,
    };
  }

  @Get('/search')
  @DistrictDocs.findByCondition()
  async findByCondition(@Query() query: FindDistrictsByConditionQueryDto) {
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
      result = await this.districtService.findByCondition(query);
    } else {
      const districts = await this.districtService.findAll();
      result = { data: districts };
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
  @DistrictDocs.findAll()
  async findAll() {
    return await this.districtService.findAll();
  }

  @Get(':id')
  @DistrictDocs.findOne()
  @UsePipes(new ValidationPipe({ transform: true }))
  async findOne(@Param() params: FindOneDistrictParamDto) {
    const data = await this.districtService.findOne(+params.id);
    return {
      message: 'เรียกดูข้อมูลตำบลตามรหัส',
      error: 0,
      data,
    };
  }

  @Patch(':id')
  @DistrictDocs.update()
  async update(
    @Param('id') id: string,
    @Body() updateDistrictDto: UpdateDistrictDto,
  ) {
    const data = await this.districtService.update(+id, updateDistrictDto);

    return {
      message: 'แก้ไขข้อมูลตำบลตามรหัส',
      error: 0,
      data,
    };
  }

  @Delete(':id')
  @DistrictDocs.remove()
  async remove(@Param('id') id: string) {
    const data = await this.districtService.remove(+id);

    return {
      message: 'ลบข้อมูลตำบลตามรหัส',
      error: 0,
      data,
    };
  }

  @Post('delete-many')
  @DistrictDocs.removeMany()
  async removeMany(@Body() body: DeleteManyDistrictDto) {
    const data = await this.districtService.removeMany(body.id);

    return {
      message: 'ลบข้อมูลตำบลตามรหัสที่เลือก',
      error: 0,
      data,
    };
  }
}
