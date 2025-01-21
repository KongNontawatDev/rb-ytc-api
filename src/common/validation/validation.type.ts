export interface ValidationOption {
  property?: string;
  min?: number;
  max?: number;
  pattern?: RegExp;
}

export interface FileValidationConfig {
  allowedTypes: string[];
  maxSize: number;
  fileCategory: string; // เช่น 'IMAGE', 'DOCUMENT', 'SPREADSHEET'
}