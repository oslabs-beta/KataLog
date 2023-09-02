import * as React from 'react';
import { DesktopDatePickerProps, DesktopDatePickerSlotsComponent, DesktopDatePickerSlotsComponentsProps } from '../DesktopDatePicker';
import { MobileDatePickerProps, MobileDatePickerSlotsComponent, MobileDatePickerSlotsComponentsProps } from '../MobileDatePicker';
export interface DatePickerSlotsComponent extends MobileDatePickerSlotsComponent, DesktopDatePickerSlotsComponent {
}
export interface DatePickerSlotsComponentsProps extends MobileDatePickerSlotsComponentsProps, DesktopDatePickerSlotsComponentsProps {
}
export interface DatePickerProps<TInputDate, TDate> extends Omit<DesktopDatePickerProps<TInputDate, TDate>, 'components' | 'componentsProps'>, Omit<MobileDatePickerProps<TInputDate, TDate>, 'components' | 'componentsProps'> {
    /**
     * CSS media query when `Mobile` mode will be changed to `Desktop`.
     * @default '@media (pointer: fine)'
     * @example '@media (min-width: 720px)' or theme.breakpoints.up("sm")
     */
    desktopModeMediaQuery?: string;
    /**
     * Overrideable components.
     * @default {}
     */
    components?: Partial<DatePickerSlotsComponent>;
    /**
     * The props used for each component slot.
     * @default {}
     */
    componentsProps?: Partial<DatePickerSlotsComponentsProps>;
}
declare type DatePickerComponent = (<TInputDate, TDate = TInputDate>(props: DatePickerProps<TInputDate, TDate> & React.RefAttributes<HTMLDivElement>) => JSX.Element) & {
    propTypes?: any;
};
/**
 *
 * Demos:
 *
 * - [Date Picker](https://mui.com/x/react-date-pickers/date-picker/)
 * - [Pickers](https://mui.com/x/react-date-pickers/)
 *
 * API:
 *
 * - [DatePicker API](https://mui.com/x/api/date-pickers/date-picker/)
 */
export declare const DatePicker: DatePickerComponent;
export {};
