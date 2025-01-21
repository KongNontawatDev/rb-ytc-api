export declare class FileService {
    private readonly logger;
    deleteFiles(files: string | string[] | Record<string, string[]>): Promise<void>;
    checkTransparency(filePath: string): Promise<boolean>;
    coverToTransparency(file: Express.Multer.File): Promise<void>;
}
