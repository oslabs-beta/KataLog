/// <reference types="react" />
import { NonNullablePickerChangeHandler } from '../internals/hooks/useViews';
import { YearPickerClasses } from './yearPickerClasses';
import { BaseDateValidationProps, YearValidationProps } from '../internals/hooks/validation/models';
export interface YearPickerProps<TDate> extends YearValidationProps<TDate>, BaseDateValidationProps<TDate> {
    autoFocus?: boolean;
    className?: string;
    classes?: Partial<YearPickerClasses>;
    date: TDate | null;
    disabled?: boolean;
    onChange: NonNullablePickerChangeHandler<TDate>;
    onFocusedDayChange?: (day: TDate) => void;
    readOnly?: boolean;
    /**
     * If `true`, today's date is rendering without highlighting with circle.
     * @default false
     */
    disableHighlightToday?: boolean;
    onYearFocus?: (year: number) => void;
    hasFocus?: boolean;
    onFocusedViewChange?: (newHasFocus: boolean) => void;
}
declare type YearPickerComponent = (<TDate>(props: YearPickerProps<TDate>) => JSX.Element) & {
    propTypes?: any;
};
export declare const YearPicker: YearPickerComponent;
export {};
