import * as React from 'react';
import { BaseDateTimePickerProps } from '../DateTimePicker/shared';
import { PickersStaticWrapperSlotsComponent, PickersStaticWrapperSlotsComponentsProps } from '../internals/components/PickerStaticWrapper/PickerStaticWrapper';
import { CalendarOrClockPickerSlotsComponent, CalendarOrClockPickerSlotsComponentsProps } from '../internals/components/CalendarOrClockPicker';
import { StaticPickerProps } from '../internals/models/props/staticPickerProps';
import { DateInputSlotsComponent } from '../internals/components/PureDateInput';
export interface StaticDateTimePickerSlotsComponent extends PickersStaticWrapperSlotsComponent, CalendarOrClockPickerSlotsComponent, DateInputSlotsComponent {
}
export interface StaticDateTimePickerSlotsComponentsProps extends PickersStaticWrapperSlotsComponentsProps, CalendarOrClockPickerSlotsComponentsProps {
}
export interface StaticDateTimePickerProps<TInputDate, TDate> extends StaticPickerProps<BaseDateTimePickerProps<TInputDate, TDate>> {
    /**
     * Overrideable components.
     * @default {}
     */
    components?: Partial<StaticDateTimePickerSlotsComponent>;
    /**
     * The props used for each component slot.
     * @default {}
     */
    componentsProps?: Partial<StaticDateTimePickerSlotsComponentsProps>;
}
declare type StaticDateTimePickerComponent = (<TInputDate, TDate = TInputDate>(props: StaticDateTimePickerProps<TInputDate, TDate> & React.RefAttributes<HTMLDivElement>) => JSX.Element) & {
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
 * - [StaticDateTimePicker API](https://mui.com/x/api/date-pickers/static-date-time-picker/)
 */
export declare const StaticDateTimePicker: StaticDateTimePickerComponent;
export {};
