import * as React from 'react';
import { BaseTimePickerProps } from '../TimePicker/shared';
import { DesktopWrapperProps, DesktopWrapperSlotsComponent, DesktopWrapperSlotsComponentsProps } from '../internals/components/wrappers/DesktopWrapper';
import { ClockPickerSlotsComponent, ClockPickerSlotsComponentsProps } from '../ClockPicker/ClockPicker';
import { DateInputSlotsComponent } from '../internals/components/PureDateInput';
export interface DesktopTimePickerSlotsComponent extends DesktopWrapperSlotsComponent, ClockPickerSlotsComponent, DateInputSlotsComponent {
}
export interface DesktopTimePickerSlotsComponentsProps extends DesktopWrapperSlotsComponentsProps, ClockPickerSlotsComponentsProps {
}
export interface DesktopTimePickerProps<TInputDate, TDate> extends BaseTimePickerProps<TInputDate, TDate>, DesktopWrapperProps {
    /**
     * Overrideable components.
     * @default {}
     */
    components?: Partial<DesktopTimePickerSlotsComponent>;
    /**
     * The props used for each component slot.
     * @default {}
     */
    componentsProps?: Partial<DesktopTimePickerSlotsComponentsProps>;
}
declare type DesktopTimePickerComponent = (<TInputDate, TDate = TInputDate>(props: DesktopTimePickerProps<TInputDate, TDate> & React.RefAttributes<HTMLDivElement>) => JSX.Element) & {
    propTypes?: any;
};
/**
 *
 * Demos:
 *
 * - [Time Picker](https://mui.com/x/react-date-pickers/time-picker/)
 *
 * API:
 *
 * - [DesktopTimePicker API](https://mui.com/x/api/date-pickers/desktop-time-picker/)
 */
export declare const DesktopTimePicker: DesktopTimePickerComponent;
export {};
