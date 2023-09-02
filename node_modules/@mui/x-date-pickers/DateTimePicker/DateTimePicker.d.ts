import * as React from 'react';
import { DesktopDateTimePickerProps, DesktopDateTimePickerSlotsComponent, DesktopDateTimePickerSlotsComponentsProps } from '../DesktopDateTimePicker';
import { MobileDateTimePickerProps, MobileDateTimePickerSlotsComponent, MobileDateTimePickerSlotsComponentsProps } from '../MobileDateTimePicker';
export interface DateTimePickerSlotsComponent extends MobileDateTimePickerSlotsComponent, DesktopDateTimePickerSlotsComponent {
}
export interface DateTimePickerSlotsComponentsProps extends MobileDateTimePickerSlotsComponentsProps, DesktopDateTimePickerSlotsComponentsProps {
}
export interface DateTimePickerProps<TInputDate, TDate> extends Omit<DesktopDateTimePickerProps<TInputDate, TDate>, 'components' | 'componentsProps'>, Omit<MobileDateTimePickerProps<TInputDate, TDate>, 'components' | 'componentsProps'> {
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
    components?: Partial<DateTimePickerSlotsComponent>;
    /**
     * The props used for each component slot.
     * @default {}
     */
    componentsProps?: Partial<DateTimePickerSlotsComponentsProps>;
}
declare type DateTimePickerComponent = (<TInputDate, TDate = TInputDate>(props: DateTimePickerProps<TInputDate, TDate> & React.RefAttributes<HTMLDivElement>) => JSX.Element) & {
    propTypes?: any;
};
/**
 *
 * Demos:
 *
 * - [Date Time Picker](https://mui.com/x/react-date-pickers/date-time-picker/)
 * - [Pickers](https://mui.com/x/react-date-pickers/)
 *
 * API:
 *
 * - [DateTimePicker API](https://mui.com/x/api/date-pickers/date-time-picker/)
 */
export declare const DateTimePicker: DateTimePickerComponent;
export {};
