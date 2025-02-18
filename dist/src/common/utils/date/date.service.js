"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DateService = void 0;
const common_1 = require("@nestjs/common");
const dayjs_1 = __importDefault(require("dayjs"));
const utc_1 = __importDefault(require("dayjs/plugin/utc"));
const timezone_1 = __importDefault(require("dayjs/plugin/timezone"));
const customParseFormat_1 = __importDefault(require("dayjs/plugin/customParseFormat"));
dayjs_1.default.extend(utc_1.default);
dayjs_1.default.extend(timezone_1.default);
dayjs_1.default.extend(customParseFormat_1.default);
let DateService = class DateService {
    Date(date) {
        return (0, dayjs_1.default)(date);
    }
    formatDate(date, format = 'DD-MM-YYYY HH:mm:ss') {
        return (0, dayjs_1.default)(date).tz('Asia/Bangkok').format(format);
    }
    toDateSql(date) {
        return (0, dayjs_1.default)(date).utc().toDate();
    }
    toUTC(date) {
        return (0, dayjs_1.default)(date).utc().toDate();
    }
    toTimezone(date, tz = 'UTC') {
        return (0, dayjs_1.default)(date).tz(tz).toDate();
    }
    parseDate(dateStr, format) {
        return (0, dayjs_1.default)(dateStr, format).toDate();
    }
    addTime(date, amount, unit) {
        return (0, dayjs_1.default)(date).add(amount, unit).toDate();
    }
    subtractTime(date, amount, unit) {
        return (0, dayjs_1.default)(date).subtract(amount, unit).toDate();
    }
    isValidDate(date) {
        return (0, dayjs_1.default)(date).isValid();
    }
    startOf(date, unit) {
        return (0, dayjs_1.default)(date).startOf(unit).toDate();
    }
    endOf(date, unit) {
        return (0, dayjs_1.default)(date).endOf(unit).toDate();
    }
};
exports.DateService = DateService;
exports.DateService = DateService = __decorate([
    (0, common_1.Injectable)()
], DateService);
//# sourceMappingURL=date.service.js.map