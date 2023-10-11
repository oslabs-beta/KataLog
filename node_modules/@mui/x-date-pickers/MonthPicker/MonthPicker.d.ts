import * as React from 'react';
import { SxProps } from '@mui/system';
import { Theme } from '@mui/material/styles';
import { NonNullablePickerChangeHandler } from '../internals/hooks/useViews';
import { MonthPickerClasses } from './monthPickerClasses';
import { BaseDateValidationProps, MonthValidationProps } from '../internals/hooks/validation/models';
import { DefaultizedProps } from '../internals/models/helpers';
export interface MonthPickerProps<TDate> extends MonthValidationProps<TDate>, BaseDateValidationProps<TDate> {
    /**
     * className applied to the root element.
     */
    className?: string;
    /**
     * Override or extend the styles applied to the component.
     */
    classes?: Partial<MonthPickerClasses>;
    /** Date value for the MonthPicker */
    date: TDate | null;
    /** If `true` picker is disabled */
    disabled?: boolean;
    /** Callback fired on date change. */
    onChange: NonNullablePickerChangeHandler<TDate>;
    /** If `true` picker is readonly */
    readOnly?: boolean;
    /**
     * The system prop that allows defining system overrides as well as additional CSS styles.
     */
    sx?: SxProps<Theme>;
    /**
     * If `true`, today's date is rendering without highlighting with circle.
     * @default false
     */
    disableHighlightToday?: boolean;
    autoFocus?: boolean;
    onMonthFocus?: (month: number) => void;
    hasFocus?: boolean;
    onFocusedViewChange?: (newHasFocus: boolean) => void;
}
export declare function useMonthPickerDefaultizedProps<TDate>(props: MonthPickerProps<TDate>, name: string): DefaultizedProps<MonthPickerProps<TDate>, 'minDate' | 'maxDate' | 'disableFuture' | 'disablePast'>;
declare type MonthPickerComponent = (<TDate>(props: MonthPickerProps<TDate> & React.RefAttributes<HTMLDivElement>) => JSX.Element) & {
    propTypes?: any;
};
export declare const MonthPicker: MonthPickerComponent;
export {};
