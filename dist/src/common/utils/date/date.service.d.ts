import dayjs from 'dayjs';
export declare class DateService {
    Date(date?: dayjs.ConfigType): any;
    formatDate(date: Date | string | number, format?: string): string;
    toDateSql(date: Date | string | number): Date;
    toUTC(date: Date | string | number): Date;
    toTimezone(date: Date | string | number, tz?: string): Date;
    parseDate(dateStr: string, format?: string): Date;
    addTime(date: Date | string | number, amount: number, unit: any): Date;
    subtractTime(date: Date | string | number, amount: number, unit: any): Date;
    isValidDate(date: Date | string | number): boolean;
    startOf(unit: dayjs.OpUnitType, date?: Date | string | number): Date;
    endOf(unit: dayjs.OpUnitType, date?: Date | string | number): Date;
    getCurrentMonthRange(): {
        start: Date;
        end: Date;
    };
    getMonthRange(year: number, month: number): {
        start: Date;
        end: Date;
    };
    removeSeconds(date: Date | string | number): Date;
    isBefore(date1: Date | string | number, date2: Date | string | number): boolean;
    isAfter(date1: Date | string | number, date2: Date | string | number): boolean;
    getUTCNow(): Date;
}
