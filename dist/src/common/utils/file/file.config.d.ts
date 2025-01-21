export interface FileUploadOptions {
    destination: string;
    maxFileSize: number;
    mimeTypes: string | string[];
}
export declare const fileUploadOptions: ({ destination, maxFileSize, mimeTypes, }: FileUploadOptions) => {
    storage: import("multer").StorageEngine;
    limits: {
        fileSize: number;
    };
    fileFilter: (req: any, file: any, callback: any) => void;
};
