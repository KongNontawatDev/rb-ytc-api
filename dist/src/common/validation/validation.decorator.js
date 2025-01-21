"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.IsPassword = exports.IsPhoneNumberField = exports.IsEmptyField = exports.IsOptionalField = exports.IsDecimalField = exports.IsBooleanField = exports.IsArrayField = exports.IsDateField = exports.IsInteger = exports.IsNumberStringField = exports.HasMaxLength = exports.HasMinLength = exports.IsValidEmail = exports.IsValidString = exports.IsRequiredImage = exports.IsRequiredFile = exports.IsRequiredField = void 0;
const class_validator_1 = require("class-validator");
const validation_util_1 = require("./validation.util");
const validation_messages_1 = require("./validation-messages");
const class_transformer_1 = require("class-transformer");
function createValidator(validator, defaultMessage, extraArgs = {}) {
    return function (property, options = {}) {
        return function (target, propertyKey) {
            const fieldName = property || propertyKey;
            validator({
                ...extraArgs,
                message: (0, validation_util_1.formatValidationMessage)(defaultMessage, { property: fieldName, ...extraArgs }),
                ...options,
            })(target, propertyKey);
        };
    };
}
exports.IsRequiredField = createValidator(class_validator_1.IsNotEmpty, validation_messages_1.ValidationMessages.required);
const IsRequiredFile = function (property = 'ไฟล์', options = {}) {
    return function (target, propertyKey) {
        (0, class_validator_1.IsNotEmpty)({
            message: (0, validation_util_1.formatValidationMessage)(validation_messages_1.ValidationMessages.file, { property }),
            ...options,
        })(target, propertyKey);
    };
};
exports.IsRequiredFile = IsRequiredFile;
const IsRequiredImage = function (property = 'รูปภาพ', options = {}) {
    return function (target, propertyKey) {
        (0, class_validator_1.IsNotEmpty)({
            message: (0, validation_util_1.formatValidationMessage)(validation_messages_1.ValidationMessages.image, { property }),
            ...options,
        })(target, propertyKey);
    };
};
exports.IsRequiredImage = IsRequiredImage;
exports.IsValidString = createValidator(class_validator_1.IsString, validation_messages_1.ValidationMessages.string);
const IsValidEmail = function (property = 'email', options = {}) {
    return function (target, propertyKey) {
        (0, class_validator_1.IsEmail)({}, {
            message: (0, validation_util_1.formatValidationMessage)(validation_messages_1.ValidationMessages.email, { property }),
            ...options,
        })(target, propertyKey);
        (0, exports.IsRequiredField)(property, options)(target, propertyKey);
    };
};
exports.IsValidEmail = IsValidEmail;
const HasMinLength = function (min, property, options = {}) {
    return function (target, propertyKey) {
        const fieldName = property || propertyKey;
        (0, class_validator_1.MinLength)(min, {
            message: (0, validation_util_1.formatValidationMessage)(validation_messages_1.ValidationMessages.minLength, { property: fieldName, min }),
            ...options,
        })(target, propertyKey);
    };
};
exports.HasMinLength = HasMinLength;
const HasMaxLength = function (max, property, options = {}) {
    return function (target, propertyKey) {
        const fieldName = property || propertyKey;
        (0, class_validator_1.MaxLength)(max, {
            message: (0, validation_util_1.formatValidationMessage)(validation_messages_1.ValidationMessages.maxLength, { property: fieldName, max }),
            ...options,
        })(target, propertyKey);
    };
};
exports.HasMaxLength = HasMaxLength;
const IsNumberStringField = function (property, options = {}) {
    return function (target, propertyKey) {
        const fieldName = property || propertyKey;
        (0, class_validator_1.IsNumberString)({}, {
            message: (0, validation_util_1.formatValidationMessage)(validation_messages_1.ValidationMessages.numberString, { property: fieldName }),
            ...options,
        })(target, propertyKey);
    };
};
exports.IsNumberStringField = IsNumberStringField;
const IsInteger = function (property, options = {}) {
    return function (target, propertyKey) {
        const fieldName = property || propertyKey;
        (0, class_transformer_1.Transform)(({ value }) => (value ? Number(value) : value))(target, propertyKey);
        (0, class_validator_1.IsInt)({
            message: (0, validation_util_1.formatValidationMessage)(validation_messages_1.ValidationMessages.integer, { property: fieldName }),
            ...options,
        })(target, propertyKey);
    };
};
exports.IsInteger = IsInteger;
const IsDateField = function (property, options = {}) {
    return function (target, propertyKey) {
        const fieldName = property || propertyKey;
        (0, class_transformer_1.Transform)(({ value }) => {
            if (typeof value === 'string' && !isNaN(Date.parse(value))) {
                return new Date(value);
            }
            return value;
        })(target, propertyKey);
        (0, class_validator_1.IsDate)({
            message: (0, validation_util_1.formatValidationMessage)(validation_messages_1.ValidationMessages.date, { property: fieldName }),
            ...options,
        })(target, propertyKey);
    };
};
exports.IsDateField = IsDateField;
exports.IsArrayField = createValidator(class_validator_1.IsArray, validation_messages_1.ValidationMessages.array);
exports.IsBooleanField = createValidator(class_validator_1.IsBoolean, validation_messages_1.ValidationMessages.boolean);
exports.IsDecimalField = createValidator(class_validator_1.IsDecimal, validation_messages_1.ValidationMessages.decimal);
exports.IsOptionalField = createValidator(class_validator_1.IsOptional, validation_messages_1.ValidationMessages.optional);
exports.IsEmptyField = createValidator(class_validator_1.IsEmpty, validation_messages_1.ValidationMessages.empty);
const IsPhoneNumberField = function (property, options = {}) {
    return function (target, propertyKey) {
        const fieldName = property || propertyKey;
        (0, class_validator_1.IsPhoneNumber)('TH', {
            message: (0, validation_util_1.formatValidationMessage)(validation_messages_1.ValidationMessages.phoneNumber, { property: fieldName }),
            ...options,
        })(target, propertyKey);
    };
};
exports.IsPhoneNumberField = IsPhoneNumberField;
const IsPassword = function (minLength = 8, maxLength = 32, options = {}) {
    return function (target, propertyKey) {
        const fieldName = propertyKey;
        (0, class_validator_1.IsStrongPassword)({}, {
            message: (0, validation_util_1.formatValidationMessage)(validation_messages_1.ValidationMessages.strongPassword, { property: fieldName }),
            ...options
        })(target, propertyKey);
        (0, class_validator_1.MinLength)(minLength, {
            message: (0, validation_util_1.formatValidationMessage)(validation_messages_1.ValidationMessages.minLength, { property: fieldName, min: minLength }),
            ...options
        })(target, propertyKey);
        (0, class_validator_1.MaxLength)(maxLength, {
            message: (0, validation_util_1.formatValidationMessage)(validation_messages_1.ValidationMessages.maxLength, { property: fieldName, max: maxLength }),
            ...options
        })(target, propertyKey);
    };
};
exports.IsPassword = IsPassword;
//# sourceMappingURL=validation.decorator.js.map