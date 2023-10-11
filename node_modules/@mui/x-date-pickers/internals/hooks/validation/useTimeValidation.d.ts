import { ValidationProps, Validator } from './useValidation';
import { ClockPickerView } from '../../models';
export interface ExportedTimeValidationProps<TDate> {
    /**
     * Min time acceptable time.
     * For input validation date part of passed object will be ignored if `disableIgnoringDatePartForTimeValidation` not specified.
     */
    minTime?: TDate;
    /**
     * Max time acceptable time.
     * For input validation date part of passed object will be ignored if `disableIgnoringDatePartForTimeValidation` not specified.
     */
    maxTime?: TDate;
    /**
     * Step over minutes.
     * @default 1
     */
    minutesStep?: number;
    /**
     * Dynamically check if time is disabled or not.
     * If returns `false` appropriate time point will ot be acceptable.
     * @param {number} timeValue The value to check.
     * @param {ClockPickerView} clockType The clock type of the timeValue.
     * @returns {boolean} Returns `true` if the time should be disabled
     */
    shouldDisableTime?: (timeValue: number, clockType: ClockPickerView) => boolean;
    /**
     * Do not ignore date part when validating min/max time.
     * @default false
     */
    disableIgnoringDatePartForTimeValidation?: boolean;
}
export interface TimeValidationProps<TInputDate, TDate> extends ExportedTimeValidationProps<TDate>, ValidationProps<TimeValidationError, TInputDate | null> {
}
export declare type TimeValidationError = 'invalidDate' | 'minutesStep' | 'minTime' | 'maxTime' | 'shouldDisableTime-hours' | 'shouldDisableTime-minutes' | 'shouldDisableTime-seconds' | null;
export declare const validateTime: Validator<any, TimeValidationProps<any, any>>;
export declare const useTimeValidation: <TInputDate, TDate>(props: TimeValidationProps<TInputDate, TDate>) => TimeValidationError;
