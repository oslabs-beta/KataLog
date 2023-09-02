import * as React from 'react';
import { BaseDatePickerProps } from '../DatePicker/shared';
import { MobileWrapperProps, MobileWrapperSlotsComponent, MobileWrapperSlotsComponentsProps } from '../internals/components/wrappers/MobileWrapper';
import { CalendarPickerSlotsComponent, CalendarPickerSlotsComponentsProps } from '../CalendarPicker/CalendarPicker';
export interface MobileDatePickerSlotsComponent extends MobileWrapperSlotsComponent, CalendarPickerSlotsComponent {
}
export interface MobileDatePickerSlotsComponentsProps extends MobileWrapperSlotsComponentsProps, CalendarPickerSlotsComponentsProps {
}
export interface MobileDatePickerProps<TInputDate, TDate> extends BaseDatePickerProps<TInputDate, TDate>, MobileWrapperProps {
    /**
     * Overrideable components.
     * @default {}
     */
    components?: Partial<MobileDatePickerSlotsComponent>;
    /**
     * The props used for each component slot.
     * @default {}
     */
    componentsProps?: Partial<MobileDatePickerSlotsComponentsProps>;
}
declare type MobileDatePickerComponent = (<TInputDate, TDate = TInputDate>(props: MobileDatePickerProps<TInputDate, TDate> & React.RefAttributes<HTMLDivElement>) => JSX.Element) & {
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
 * - [MobileDatePicker API](https://mui.com/x/api/date-pickers/mobile-date-picker/)
 */
export declare const MobileDatePicker: MobileDatePickerComponent;
export {};
