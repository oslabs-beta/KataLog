import { PickerOnChangeFn } from './useViews';
interface MonthValidationOptions<TDate> {
    disablePast?: boolean;
    disableFuture?: boolean;
    minDate: TDate;
    maxDate: TDate;
}
export declare function useNextMonthDisabled<TDate>(month: TDate, { disableFuture, maxDate }: Pick<MonthValidationOptions<TDate>, 'disableFuture' | 'maxDate'>): boolean;
export declare function usePreviousMonthDisabled<TDate>(month: TDate, { disablePast, minDate }: Pick<MonthValidationOptions<TDate>, 'disablePast' | 'minDate'>): boolean;
export declare function useMeridiemMode<TDate>(date: TDate | null, ampm: boolean | undefined, onChange: PickerOnChangeFn<TDate>): {
    meridiemMode: "am" | "pm" | null;
    handleMeridiemChange: (mode: 'am' | 'pm') => void;
};
export {};
