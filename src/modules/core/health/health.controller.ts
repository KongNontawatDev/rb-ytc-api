import { Controller, Get } from '@nestjs/common';
import { HealthCheckService, HealthCheck, MemoryHealthIndicator, HealthIndicatorResult, PrismaHealthIndicator } from '@nestjs/terminus';
import { PrismaService } from 'src/provider/prisma/prisma.service';

@Controller({
  path:'core/health',
  version:'1'
})
export class HealthController {
  constructor(
    private health: HealthCheckService,
    private memoryHealthIndicator: MemoryHealthIndicator,
    private prismaHealthIndicator: PrismaHealthIndicator,
    private prismaService: PrismaService
  ) {}

  @Get()
  @HealthCheck()
  async checkHealth(): Promise<HealthIndicatorResult[]> {
    return this.health.check([
      // Memory Health
      async () => this.memoryHealthIndicator.checkHeap('memory', 1000000000),  // 1GB threshold
      // Prisma Health
      async () => this.prismaHealthIndicator.pingCheck('database',this.prismaService), // Call the Prisma health indicator
    ]) as any;
  }
}
