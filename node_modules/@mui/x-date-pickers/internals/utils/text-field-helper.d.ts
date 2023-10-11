import { MuiPickersAdapter } from '../models';
export declare const getDisplayDate: <TDate>(utils: MuiPickersAdapter<TDate>, rawValue: any, inputFormat: string) => string;
export declare function getMaskFromCurrentFormat(mask: string | undefined, format: string, acceptRegex: RegExp, utils: MuiPickersAdapter<any>): string;
export declare function checkMaskIsValidForCurrentFormat(mask: string, format: string, acceptRegex: RegExp, utils: MuiPickersAdapter<any>): boolean;
export declare const maskedDateFormatter: (mask: string, acceptRegexp: RegExp) => (value: string) => string;
