import * as React from 'react';
import { BaseDatePickerProps } from '../DatePicker/shared';
import { DesktopWrapperProps, DesktopWrapperSlotsComponent, DesktopWrapperSlotsComponentsProps } from '../internals/components/wrappers/DesktopWrapper';
import { CalendarPickerSlotsComponent, CalendarPickerSlotsComponentsProps } from '../CalendarPicker';
export interface DesktopDatePickerSlotsComponent extends DesktopWrapperSlotsComponent, CalendarPickerSlotsComponent {
}
export interface DesktopDatePickerSlotsComponentsProps extends DesktopWrapperSlotsComponentsProps, CalendarPickerSlotsComponentsProps {
}
export interface DesktopDatePickerProps<TInputDate, TDate> extends Omit<BaseDatePickerProps<TInputDate, TDate>, 'components' | 'componentsProps'>, DesktopWrapperProps {
    /**
     * Overrideable components.
     * @default {}
     */
    components?: Partial<DesktopDatePickerSlotsComponent>;
    /**
     * The props used for each component slot.
     * @default {}
     */
    componentsProps?: Partial<DesktopDatePickerSlotsComponentsProps>;
}
declare type DesktopDatePickerComponent = (<TInputDate, TDate = TInputDate>(props: DesktopDatePickerProps<TInputDate, TDate> & React.RefAttributes<HTMLDivElement>) => JSX.Element) & {
    propTypes?: any;
};
/**
 *
 * Demos:
 *
 * - [Date Picker](https://mui.com/x/react-date-pickers/date-picker/)
 *
 * API:
 *
 * - [DesktopDatePicker API](https://mui.com/x/api/date-pickers/desktop-date-picker/)
 */
export declare const DesktopDatePicker: DesktopDatePickerComponent;
export {};
