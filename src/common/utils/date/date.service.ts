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
  /**
   * dayjs Instant
   * @param date 
   */
  Date(date: dayjs.ConfigType):dayjs.Dayjs {
    return dayjs(date)
  }
  /**
   * Format date to specified format
   * @param date Date to format
   * @param format Format string (default: 'YYYY-MM-DD HH:mm:ss')
   */
  formatDate(date: Date | string | number, format = 'DD-MM-YYYY HH:mm:ss'): string {
    return dayjs(date).tz('Asia/Bangkok').format(format);
  }

    /**
   * Format date to specified format
   * @param date Date to format
   * @param format Format string (default: 'YYYY-MM-DD HH:mm:ss')
   */
  toDateSql(date: Date | string | number): Date {
    return dayjs(date).utc().toDate();
  }

  /**
   * Convert date to UTC
   * @param date Date to convert
   */
  toUTC(date: Date | string | number): Date {
    return dayjs(date).utc().toDate();
  }

  /**
   * Convert date to specific timezone
   * @param date Date to convert
   * @param tz Target timezone (default: 'UTC')
   */
  toTimezone(date: Date | string | number, tz = 'UTC'): Date {
    return dayjs(date).tz(tz).toDate();
  }

  /**
   * Parse string to date with custom format
   * @param dateStr Date string to parse
   * @param format Format of the date string
   */
  parseDate(dateStr: string, format: string): Date {
    return dayjs(dateStr, format).toDate();
  }

  /**
   * Add time to date
   * @param date Initial date
   * @param amount Amount to add
   * @param unit Unit of time ('day', 'month', 'year', etc.)
   */
  addTime(date: Date | string | number, amount: number, unit: dayjs.ManipulateType): Date {
    return dayjs(date).add(amount, unit).toDate();
  }

  /**
   * Subtract time from date
   * @param date Initial date
   * @param amount Amount to subtract
   * @param unit Unit of time ('day', 'month', 'year', etc.)
   */
  subtractTime(date: Date | string | number, amount: number, unit: dayjs.ManipulateType): Date {
    return dayjs(date).subtract(amount, unit).toDate();
  }

  /**
   * Check if date is valid
   * @param date Date to validate
   */
  isValidDate(date: Date | string | number): boolean {
    return dayjs(date).isValid();
  }

  /**
   * Get start of time unit
   * @param date Initial date
   * @param unit Unit of time ('day', 'month', 'year', etc.)
   */
  startOf(date: Date | string | number, unit: dayjs.OpUnitType): Date {
    return dayjs(date).startOf(unit).toDate();
  }

  /**
   * Get end of time unit
   * @param date Initial date
   * @param unit Unit of time ('day', 'month', 'year', etc.)
   */
  endOf(date: Date | string | number, unit: dayjs.OpUnitType): Date {
    return dayjs(date).endOf(unit).toDate();
  }
}