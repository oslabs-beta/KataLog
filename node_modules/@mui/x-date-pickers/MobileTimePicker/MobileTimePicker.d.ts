import * as React from 'react';
import { BaseTimePickerProps } from '../TimePicker/shared';
import { MobileWrapperProps, MobileWrapperSlotsComponent, MobileWrapperSlotsComponentsProps } from '../internals/components/wrappers/MobileWrapper';
import { DateInputSlotsComponent } from '../internals/components/PureDateInput';
import { ClockPickerSlotsComponent, ClockPickerSlotsComponentsProps } from '../ClockPicker/ClockPicker';
export interface MobileTimePickerSlotsComponent extends MobileWrapperSlotsComponent, ClockPickerSlotsComponent, DateInputSlotsComponent {
}
export interface MobileTimePickerSlotsComponentsProps extends MobileWrapperSlotsComponentsProps, ClockPickerSlotsComponentsProps {
}
export interface MobileTimePickerProps<TInputDate, TDate> extends BaseTimePickerProps<TInputDate, TDate>, MobileWrapperProps {
    /**
     * Overrideable components.
     * @default {}
     */
    components?: Partial<MobileTimePickerSlotsComponent>;
    /**
     * The props used for each component slot.
     * @default {}
     */
    componentsProps?: Partial<MobileTimePickerSlotsComponentsProps>;
}
declare type MobileTimePickerComponent = (<TInputDate, TDate = TInputDate>(props: MobileTimePickerProps<TInputDate, TDate> & React.RefAttributes<HTMLDivElement>) => JSX.Element) & {
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
 * - [MobileTimePicker API](https://mui.com/x/api/date-pickers/mobile-time-picker/)
 */
export declare const MobileTimePicker: MobileTimePickerComponent;
export {};
