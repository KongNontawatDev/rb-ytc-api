import { Controller, Get, Version, VERSION_NEUTRAL, Req, Res, UseGuards } from '@nestjs/common';
import { Request, Response } from 'express';
import { join } from 'path';
import { readFileSync } from 'fs';
import { SwaggerService } from './swagger.service';

@Controller({
  path:'core/swagger'
})
export class SwaggerController {
  constructor(private readonly swaggerService: SwaggerService) {}

  @Get()
  @Version(VERSION_NEUTRAL)
  getSwaggerJson(@Req() req: Request,@Res() res: Response) {
    const filePath = join(__dirname, '../../../../../swagger-spec.json');
    const swaggerData = readFileSync(filePath, 'utf8');
    res.type('application/json').send(swaggerData);
  }
}
