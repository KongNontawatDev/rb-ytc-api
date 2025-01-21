import { Controller, Get, UseGuards  } from '@nestjs/common';
import { DashboardService } from './dashboard.service';
import { JwtAuthGuard } from '@provider/jwt/guards/jwt-auth.guard';

@Controller({
  path: 'admin/dashboard',
  version: ['1'],
})
@UseGuards(JwtAuthGuard)
export class DashboardController {
  constructor(private readonly dashboardService: DashboardService) {}

  @Get()
  async findAll() {
    const data = await this.dashboardService.findAll();
    return {
      message:'เรียกดูแดชบอร์ด',
      error:0,
      data
    }
  }

}
