import { ValidationOption } from './validation.type';

export const formatValidationMessage = (
  message: string,
  options: ValidationOption = {}
): string => {
  let formattedMessage = message;
  
  if (options.property) {
    formattedMessage = formattedMessage.replace('{property}', options.property);
  }
  if (options.min !== undefined) {
    formattedMessage = formattedMessage.replace('{min}', options.min.toString());
  }
  if (options.max !== undefined) {
    formattedMessage = formattedMessage.replace('{max}', options.max.toString());
  }
  
  return formattedMessage;
};