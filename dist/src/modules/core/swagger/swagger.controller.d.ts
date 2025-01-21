import { Request, Response } from 'express';
import { SwaggerService } from './swagger.service';
export declare class SwaggerController {
    private readonly swaggerService;
    constructor(swaggerService: SwaggerService);
    getSwaggerJson(req: Request, res: Response): void;
}
