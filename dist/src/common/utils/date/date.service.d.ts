import dayjs from 'dayjs';
export declare class DateService {
    formatDate(date: Date | string | number, format?: string): string;
    toDateSql(date: Date | string | number): Date;
    toUTC(date: Date | string | number): Date;
    toTimezone(date: Date | string | number, tz?: string): Date;
    parseDate(dateStr: string, format: string): Date;
    addTime(date: Date | string | number, amount: number, unit: dayjs.ManipulateType): Date;
    subtractTime(date: Date | string | number, amount: number, unit: dayjs.ManipulateType): Date;
    isValidDate(date: Date | string | number): boolean;
    startOf(date: Date | string | number, unit: dayjs.OpUnitType): Date;
    endOf(date: Date | string | number, unit: dayjs.OpUnitType): Date;
}
