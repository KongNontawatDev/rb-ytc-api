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
        return (0, dayjs_1.default)(date).utc();
    }
    formatDate(date, format = "YYYY-MM-DD HH:mm:ss") {
        return (0, dayjs_1.default)(date).utc().format(format);
    }
    toDateSql(date) {
        return (0, dayjs_1.default)(date).utc().toDate();
    }
    toUTC(date) {
        return (0, dayjs_1.default)(date).utc().toDate();
    }
    toTimezone(date, tz = "Asia/Bangkok") {
        return (0, dayjs_1.default)(date).tz(tz).toDate();
    }
    parseDate(dateStr, format = "YYYY-MM-DD HH:mm:ss") {
        return (0, dayjs_1.default)(dateStr, format).utc().toDate();
    }
    addTime(date, amount, unit) {
        return (0, dayjs_1.default)(date).utc().add(amount, unit).toDate();
    }
    subtractTime(date, amount, unit) {
        return (0, dayjs_1.default)(date).utc().subtract(amount, unit).toDate();
    }
    isValidDate(date) {
        return (0, dayjs_1.default)(date).isValid();
    }
    startOf(unit, date = new Date()) {
        return (0, dayjs_1.default)(date).utc().startOf(unit).toDate();
    }
    endOf(unit, date = new Date()) {
        return (0, dayjs_1.default)(date).utc().endOf(unit).toDate();
    }
    getCurrentMonthRange() {
        return {
            start: this.startOf("month"),
            end: this.endOf("month"),
        };
    }
    getMonthRange(year, month) {
        return {
            start: (0, dayjs_1.default)().utc().year(year).month(month - 1).startOf("month").toDate(),
            end: (0, dayjs_1.default)().utc().year(year).month(month - 1).endOf("month").toDate(),
        };
    }
    removeSeconds(date) {
        return (0, dayjs_1.default)(date).utc().startOf("minute").toDate();
    }
    isBefore(date1, date2) {
        return (0, dayjs_1.default)(date1).utc().isBefore((0, dayjs_1.default)(date2).utc());
    }
    isAfter(date1, date2) {
        return (0, dayjs_1.default)(date1).utc().isAfter((0, dayjs_1.default)(date2).utc());
    }
    getUTCNow() {
        return (0, dayjs_1.default)().utc().toDate();
    }
};
exports.DateService = DateService;
exports.DateService = DateService = __decorate([
    (0, common_1.Injectable)()
], DateService);
//# sourceMappingURL=date.service.js.map