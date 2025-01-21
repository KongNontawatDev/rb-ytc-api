import { 
  IsEmail, 
  IsNotEmpty, 
  IsString, 
  MinLength, 
  MaxLength, 
  IsOptional, 
  IsInt, 
  IsDate, 
  IsArray, 
  IsBoolean, 
  IsDecimal, 
  IsEmpty, 
  IsPhoneNumber, 
  ValidationOptions, 
  IsStrongPassword,
  IsNumberString
} from 'class-validator';
import { formatValidationMessage } from './validation.util';
import { ValidationMessages } from './validation-messages';
import { Transform } from 'class-transformer';

// Utility for creating decorators with formatted messages
function createValidator(
  validator: (options: any) => PropertyDecorator,
  defaultMessage: string,
  extraArgs: Record<string, any> = {}
) {
  return function(property?: string, options: ValidationOptions = {}) {
    return function(target: any, propertyKey: string) {
      const fieldName = property || propertyKey;
      validator({
        ...extraArgs,
        message: formatValidationMessage(defaultMessage, { property: fieldName, ...extraArgs }),
        ...options,
      })(target, propertyKey);
    };
  };
}

// Decorators
export const IsRequiredField = createValidator(IsNotEmpty, ValidationMessages.required);

export const IsRequiredFile = function(property: string = 'ไฟล์', options: ValidationOptions = {}) {
  return function(target: any, propertyKey: string) {
    IsNotEmpty({ 
      message: formatValidationMessage(ValidationMessages.file, { property }),
      ...options,
    })(target, propertyKey);
  };
};

export const IsRequiredImage = function(property: string = 'รูปภาพ', options: ValidationOptions = {}) {
  return function(target: any, propertyKey: string) {
    IsNotEmpty({ 
      message: formatValidationMessage(ValidationMessages.image, { property }),
      ...options,
    })(target, propertyKey);
  };
};

export const IsValidString = createValidator(IsString, ValidationMessages.string);

export const IsValidEmail = function(property: string = 'email', options: ValidationOptions = {}) {
  return function(target: any, propertyKey: string) {
    IsEmail({}, { 
      message: formatValidationMessage(ValidationMessages.email, { property }),
      ...options,
    })(target, propertyKey);
    IsRequiredField(property, options)(target, propertyKey);
  };
};

export const HasMinLength = function(min: number, property?: string, options: ValidationOptions = {}) {
  return function(target: any, propertyKey: string) {
    const fieldName = property || propertyKey;
    MinLength(min, { 
      message: formatValidationMessage(ValidationMessages.minLength, { property: fieldName, min }),
      ...options,
    })(target, propertyKey);
  };
};

export const HasMaxLength = function(max: number, property?: string, options: ValidationOptions = {}) {
  return function(target: any, propertyKey: string) {
    const fieldName = property || propertyKey;
    MaxLength(max, { 
      message: formatValidationMessage(ValidationMessages.maxLength, { property: fieldName, max }),
      ...options,
    })(target, propertyKey);
  };
};

export const IsNumberStringField = function(property?: string, options: ValidationOptions = {}) {
  return function(target: any, propertyKey: string) {
    const fieldName = property || propertyKey;
    IsNumberString({}, {
      message: formatValidationMessage(ValidationMessages.numberString, { property: fieldName }),
      ...options,
    })(target, propertyKey);
  };
};

export const IsInteger = function(property?: string, options: ValidationOptions = {}) {
  return function(target: any, propertyKey: string) {
    const fieldName = property || propertyKey;

    Transform(({ value }) => (value ? Number(value) : value))(target, propertyKey);

    IsInt({
      message: formatValidationMessage(ValidationMessages.integer, { property: fieldName }),
      ...options,
    })(target, propertyKey);
  };
}


// export const IsInteger = createValidator(IsInt, ValidationMessages.integer);

export const IsDateField = function(property?: string, options: ValidationOptions = {}) {
  return function(target: any, propertyKey: string) {
    const fieldName = property || propertyKey;

    // Transform the value to a Date object if it's a valid ISO string
    Transform(({ value }) => {
      if (typeof value === 'string' && !isNaN(Date.parse(value))) {
        return new Date(value);
      }
      return value;
    })(target, propertyKey);

    // Validate that the value is a Date
    IsDate({
      message: formatValidationMessage(ValidationMessages.date, { property: fieldName }),
      ...options,
    })(target, propertyKey);
  };
};


export const IsArrayField = createValidator(IsArray, ValidationMessages.array);

export const IsBooleanField = createValidator(IsBoolean, ValidationMessages.boolean);

export const IsDecimalField = createValidator(IsDecimal, ValidationMessages.decimal);

export const IsOptionalField = createValidator(IsOptional, ValidationMessages.optional);

export const IsEmptyField = createValidator(IsEmpty, ValidationMessages.empty);

export const IsPhoneNumberField = function(property?: string, options: ValidationOptions = {}) {
  return function(target: any, propertyKey: string) {
    const fieldName = property || propertyKey;
    IsPhoneNumber('TH', {
      message: formatValidationMessage(ValidationMessages.phoneNumber, { property: fieldName }),
      ...options,
    })(target, propertyKey);
  };
};

export const IsPassword = function(
  minLength = 8, 
  maxLength = 32, 
  options: ValidationOptions = {}
) {
  return function(target: any, propertyKey: string) {
    const fieldName = propertyKey;

    // Strong password validation
    IsStrongPassword(
      {}, 
      { 
        message: formatValidationMessage(ValidationMessages.strongPassword, { property: fieldName }),
        ...options 
      }
    )(target, propertyKey);

    // Minimum length validation
    MinLength(
      minLength, 
      { 
        message: formatValidationMessage(ValidationMessages.minLength, { property: fieldName, min: minLength }),
        ...options 
      }
    )(target, propertyKey);

    // Maximum length validation
    MaxLength(
      maxLength, 
      { 
        message: formatValidationMessage(ValidationMessages.maxLength, { property: fieldName, max: maxLength }),
        ...options 
      }
    )(target, propertyKey);
  };
};