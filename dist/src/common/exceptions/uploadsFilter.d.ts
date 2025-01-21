import { FileService } from '@common/utils/file/file.service';
import { ExceptionFilter, ArgumentsHost, BadRequestException } from '@nestjs/common';
export declare class ValidationUploadExceptionFilter implements ExceptionFilter {
    private readonly fileService;
    constructor(fileService: FileService);
    catch(exception: BadRequestException, host: ArgumentsHost): Promise<void>;
}
