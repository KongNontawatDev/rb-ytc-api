export interface S3FileUploadOptions {
    bucketName: string;
    maxFileSize: number;
    mimeTypes: string | string[];
}
