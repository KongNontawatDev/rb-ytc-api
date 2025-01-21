import { HealthCheckService, MemoryHealthIndicator, HealthIndicatorResult, PrismaHealthIndicator } from '@nestjs/terminus';
import { PrismaService } from 'src/provider/prisma/prisma.service';
export declare class HealthController {
    private health;
    private memoryHealthIndicator;
    private prismaHealthIndicator;
    private prismaService;
    constructor(health: HealthCheckService, memoryHealthIndicator: MemoryHealthIndicator, prismaHealthIndicator: PrismaHealthIndicator, prismaService: PrismaService);
    checkHealth(): Promise<HealthIndicatorResult[]>;
}
