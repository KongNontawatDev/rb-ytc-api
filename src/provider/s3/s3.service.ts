import { Injectable, BadRequestException } from '@nestjs/common';
import * as multerS3 from 'multer-s3';
import { S3 } from 'aws-sdk';
import { extname } from 'path';
import { v4 as uuidv4 } from 'uuid';

export interface FileUploadOptions {
  bucketName: string;
  maxFileSize: number;
  mimeTypes: string | string[];
  fields: string[];
}

@Injectable()
export class S3FileUploadService {
  private readonly s3 = new S3({
    accessKeyId: 'your-access-key-id',
    secretAccessKey: 'your-secret-access-key',
    region: 'your-region', // เช่น 'us-east-1'
  });

  s3FileUploadOptions(options: FileUploadOptions) {
    const { bucketName, maxFileSize, mimeTypes, fields } = options;

    const storage = multerS3({
      s3: this.s3,
      bucket: bucketName,
      metadata: (req, file, cb) => {
        cb(null, { fieldName: file.fieldname });
      },
      key: (req, file, cb) => {
        try {
          const uniqueFileName = `${Date.now()}-${uuidv4()}${extname(file.originalname)}`;
          cb(null, uniqueFileName);
        } catch (error) {
          cb(new BadRequestException('Error generating unique filename'), error);
        }
      },
    });

    const fileFilter = (req, file, callback) => {
      const allowedMimeTypes = Array.isArray(mimeTypes) ? mimeTypes : [mimeTypes];
      if (!allowedMimeTypes.includes(file.mimetype)) {
        const errorMessage = `Unsupported file type: ${file.mimetype}. Allowed types: ${allowedMimeTypes.join(', ')}`;
        callback(new BadRequestException(errorMessage), false);
      } else {
        callback(null, true);
      }
    };

    const fieldsObject = fields.reduce((acc, field) => {
      acc[field] = { storage, limits: { fileSize: maxFileSize }, fileFilter };
      return acc;
    }, {});

    return fieldsObject;
  }
}
