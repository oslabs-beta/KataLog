import * as React from 'react';
import { BaseDateTimePickerProps } from '../DateTimePicker/shared';
import { MobileWrapperProps, MobileWrapperSlotsComponent, MobileWrapperSlotsComponentsProps } from '../internals/components/wrappers/MobileWrapper';
import { CalendarOrClockPickerSlotsComponent, CalendarOrClockPickerSlotsComponentsProps } from '../internals/components/CalendarOrClockPicker';
import { DateInputSlotsComponent } from '../internals/components/PureDateInput';
export interface MobileDateTimePickerSlotsComponent extends MobileWrapperSlotsComponent, CalendarOrClockPickerSlotsComponent, DateInputSlotsComponent {
}
export interface MobileDateTimePickerSlotsComponentsProps extends MobileWrapperSlotsComponentsProps, CalendarOrClockPickerSlotsComponentsProps {
}
export interface MobileDateTimePickerProps<TInputDate, TDate> extends BaseDateTimePickerProps<TInputDate, TDate>, MobileWrapperProps {
    /**
     * Overrideable components.
     * @default {}
     */
    components?: Partial<MobileDateTimePickerSlotsComponent>;
    /**
     * The props used for each component slot.
     * @default {}
     */
    componentsProps?: Partial<MobileDateTimePickerSlotsComponentsProps>;
}
declare type MobileDateTimePickerComponent = (<TInputDate, TDate = TInputDate>(props: MobileDateTimePickerProps<TInputDate, TDate> & React.RefAttributes<HTMLDivElement>) => JSX.Element) & {
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
 * - [MobileDateTimePicker API](https://mui.com/x/api/date-pickers/mobile-date-time-picker/)
 */
export declare const MobileDateTimePicker: MobileDateTimePickerComponent;
export {};
