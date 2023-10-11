import { ValidationProps, Validator } from './useValidation';
import { DateValidationError } from './useDateValidation';
import { TimeValidationError, ExportedTimeValidationProps } from './useTimeValidation';
import { BaseDateValidationProps, DayValidationProps } from './models';
interface DateTimeValidationProps<TInputDate, TDate> extends DayValidationProps<TDate>, Required<BaseDateValidationProps<TDate>>, ExportedTimeValidationProps<TDate>, ValidationProps<DateTimeValidationError, TInputDate | null> {
}
export declare const validateDateTime: Validator<any, DateTimeValidationProps<any, any>>;
export declare type DateTimeValidationError = DateValidationError | TimeValidationError;
export declare function useDateTimeValidation<TInputDate, TDate>(props: DateTimeValidationProps<TInputDate, TDate>): DateTimeValidationError;
export {};
