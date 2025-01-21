import {
  Controller,
  Get,

} from '@nestjs/common';
import { DepartmentService } from '@modules/core/department/department.service';


@Controller({
  path: 'app/department',
  version: ['1'],
})
export class DepartmentController {
  constructor(private readonly departmentService: DepartmentService) {}


  @Get('/list/dropdown')
  async findForDropdown() {
    const data = await this.departmentService.findForDropdown();
    return {
      message: 'เรียกดูข้อมูลแผนก/ฝ่ายงานแสดงที่ dropdown',
      error: 0,
      data,
    };
  }


}
