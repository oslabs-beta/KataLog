import * as React from 'react';
import { DesktopTimePickerProps, DesktopTimePickerSlotsComponent, DesktopTimePickerSlotsComponentsProps } from '../DesktopTimePicker';
import { MobileTimePickerProps, MobileTimePickerSlotsComponent, MobileTimePickerSlotsComponentsProps } from '../MobileTimePicker';
export interface TimePickerSlotsComponent extends MobileTimePickerSlotsComponent, DesktopTimePickerSlotsComponent {
}
export interface TimePickerSlotsComponentsProps extends MobileTimePickerSlotsComponentsProps, DesktopTimePickerSlotsComponentsProps {
}
export interface TimePickerProps<TInputDate, TDate> extends Omit<DesktopTimePickerProps<TInputDate, TDate>, 'components' | 'componentsProps'>, Omit<MobileTimePickerProps<TInputDate, TDate>, 'components' | 'componentsProps'> {
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
    components?: Partial<TimePickerSlotsComponent>;
    /**
     * The props used for each component slot.
     * @default {}
     */
    componentsProps?: Partial<TimePickerSlotsComponentsProps>;
}
declare type TimePickerComponent = (<TInputDate, TDate = TInputDate>(props: TimePickerProps<TInputDate, TDate> & React.RefAttributes<HTMLDivElement>) => JSX.Element) & {
    propTypes?: any;
};
/**
 *
 * Demos:
 *
 * - [Pickers](https://mui.com/x/react-date-pickers/)
 * - [Time Picker](https://mui.com/x/react-date-pickers/time-picker/)
 *
 * API:
 *
 * - [TimePicker API](https://mui.com/x/api/date-pickers/time-picker/)
 */
export declare const TimePicker: TimePickerComponent;
export {};
