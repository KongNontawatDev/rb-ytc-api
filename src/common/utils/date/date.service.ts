import { Injectable } from '@nestjs/common';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';
import customParseFormat from 'dayjs/plugin/customParseFormat';


dayjs.extend(utc);
dayjs.extend(timezone);
dayjs.extend(customParseFormat);

@Injectable()
export class DateService {
  Date(date?: dayjs.ConfigType): any {
    return dayjs(date).utc();
  }

  formatDate(date: Date | string | number, format = "YYYY-MM-DD HH:mm:ss"): string {
    return dayjs(date).utc().format(format);
  }

  toDateSql(date: Date | string | number): Date {
    return dayjs(date).utc().toDate();
  }

  toUTC(date: Date | string | number): Date {
    return dayjs(date).utc().toDate();
  }

  toTimezone(date: Date | string | number, tz = "Asia/Bangkok"): Date {
    return dayjs(date).tz(tz).toDate();
  }

  parseDate(dateStr: string, format = "YYYY-MM-DD HH:mm:ss"): Date {
    return dayjs(dateStr, format).utc().toDate();
  }

  addTime(date: Date | string | number, amount: number, unit: any): Date {
    return dayjs(date).utc().add(amount, unit).toDate();
  }

  subtractTime(date: Date | string | number, amount: number, unit: any): Date {
    return dayjs(date).utc().subtract(amount, unit).toDate();
  }

  isValidDate(date: Date | string | number): boolean {
    return dayjs(date).isValid();
  }

  startOf(unit: dayjs.OpUnitType, date: Date | string | number = new Date()): Date {
    return dayjs(date).utc().startOf(unit).toDate();
  }

  endOf(unit: dayjs.OpUnitType, date: Date | string | number = new Date()): Date {
    return dayjs(date).utc().endOf(unit).toDate();
  }

  getCurrentMonthRange(): { start: Date; end: Date } {
    return {
      start: this.startOf("month"),
      end: this.endOf("month"),
    };
  }

  getMonthRange(year: number, month: number): { start: Date; end: Date } {
    return {
      start: dayjs().utc().year(year).month(month - 1).startOf("month").toDate(),
      end: dayjs().utc().year(year).month(month - 1).endOf("month").toDate(),
    };
  }

  removeSeconds(date: Date | string | number): Date {
    return dayjs(date).utc().startOf("minute").toDate();
  }

  isBefore(date1: Date | string | number, date2: Date | string | number): boolean {
    return dayjs(date1).utc().isBefore(dayjs(date2).utc());
  }

  isAfter(date1: Date | string | number, date2: Date | string | number): boolean {
    return dayjs(date1).utc().isAfter(dayjs(date2).utc());
  }

  getUTCNow(): Date {
    return dayjs().utc().toDate();
  }
}
