import * as React from 'react';
import { BaseDateTimePickerProps } from '../DateTimePicker/shared';
import { DesktopWrapperProps, DesktopWrapperSlotsComponent, DesktopWrapperSlotsComponentsProps } from '../internals/components/wrappers/DesktopWrapper';
import { CalendarOrClockPickerSlotsComponent, CalendarOrClockPickerSlotsComponentsProps } from '../internals/components/CalendarOrClockPicker';
import { DateInputSlotsComponent } from '../internals/components/PureDateInput';
export interface DesktopDateTimePickerSlotsComponent extends DesktopWrapperSlotsComponent, CalendarOrClockPickerSlotsComponent, DateInputSlotsComponent {
}
export interface DesktopDateTimePickerSlotsComponentsProps extends DesktopWrapperSlotsComponentsProps, CalendarOrClockPickerSlotsComponentsProps {
}
export interface DesktopDateTimePickerProps<TInputDate, TDate> extends BaseDateTimePickerProps<TInputDate, TDate>, DesktopWrapperProps {
    /**
     * Overrideable components.
     * @default {}
     */
    components?: Partial<DesktopDateTimePickerSlotsComponent>;
    /**
     * The props used for each component slot.
     * @default {}
     */
    componentsProps?: Partial<DesktopDateTimePickerSlotsComponentsProps>;
}
declare type DesktopDateTimePickerComponent = (<TInputDate, TDate = TInputDate>(props: DesktopDateTimePickerProps<TInputDate, TDate> & React.RefAttributes<HTMLDivElement>) => JSX.Element) & {
    propTypes?: any;
};
/**
 *
 * Demos:
 *
 * - [Date Time Picker](https://mui.com/x/react-date-pickers/date-time-picker/)
 *
 * API:
 *
 * - [DesktopDateTimePicker API](https://mui.com/x/api/date-pickers/desktop-date-time-picker/)
 */
export declare const DesktopDateTimePicker: DesktopDateTimePickerComponent;
export {};
