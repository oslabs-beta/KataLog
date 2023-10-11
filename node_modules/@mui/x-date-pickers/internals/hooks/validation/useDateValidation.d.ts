import { ValidationProps, Validator } from './useValidation';
import { BaseDateValidationProps, DayValidationProps } from './models';
export interface ExportedDateValidationProps<TDate> extends DayValidationProps<TDate>, BaseDateValidationProps<TDate> {
}
export interface DateValidationProps<TInputDate, TDate> extends ValidationProps<DateValidationError, TInputDate | null>, DayValidationProps<TDate>, Required<BaseDateValidationProps<TDate>> {
}
export declare type DateValidationError = 'invalidDate' | 'shouldDisableDate' | 'disableFuture' | 'disablePast' | 'minDate' | 'maxDate' | null;
export declare const validateDate: Validator<any, DateValidationProps<any, any>>;
export declare const useIsDayDisabled: <TDate>({ shouldDisableDate, minDate, maxDate, disableFuture, disablePast, }: DayValidationProps<TDate> & Required<BaseDateValidationProps<TDate>>) => (day: TDate | null) => boolean;
export declare const isSameDateError: (a: DateValidationError, b: DateValidationError) => boolean;
export declare const useDateValidation: <TInputDate, TDate>(props: DateValidationProps<TInputDate, TDate>) => DateValidationError;
