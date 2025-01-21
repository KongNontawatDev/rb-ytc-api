export declare class CompressionService {
    private readonly logger;
    compressImage(filePath: string): Promise<string>;
    compressFiles(files: Express.Multer.File | Express.Multer.File[] | Record<string, Express.Multer.File[]>): Promise<Record<string, string[]>>;
}
