"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.formatValidationMessage = void 0;
const formatValidationMessage = (message, options = {}) => {
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
exports.formatValidationMessage = formatValidationMessage;
//# sourceMappingURL=validation.util.js.map