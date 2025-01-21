export interface FileUploadOptions {
    bucketName: string;
    maxFileSize: number;
    mimeTypes: string | string[];
    fields: string[];
}
export declare class S3FileUploadService {
    private readonly s3;
    s3FileUploadOptions(options: FileUploadOptions): {};
}
