import * as React from 'react';
import { BaseDatePickerProps } from '../DatePicker/shared';
import { PickersStaticWrapperSlotsComponentsProps, PickersStaticWrapperSlotsComponent } from '../internals/components/PickerStaticWrapper/PickerStaticWrapper';
import { StaticPickerProps } from '../internals/models/props/staticPickerProps';
import { DateInputSlotsComponent } from '../internals/components/PureDateInput';
import { CalendarPickerSlotsComponent, CalendarPickerSlotsComponentsProps } from '../CalendarPicker';
export interface StaticDatePickerSlotsComponent extends PickersStaticWrapperSlotsComponent, CalendarPickerSlotsComponent, DateInputSlotsComponent {
}
export interface StaticDatePickerSlotsComponentsProps extends PickersStaticWrapperSlotsComponentsProps, CalendarPickerSlotsComponentsProps {
}
export interface StaticDatePickerProps<TInputDate, TDate> extends StaticPickerProps<BaseDatePickerProps<TInputDate, TDate>> {
    /**
     * Overrideable components.
     * @default {}
     */
    components?: Partial<StaticDatePickerSlotsComponent>;
    /**
     * The props used for each component slot.
     * @default {}
     */
    componentsProps?: Partial<StaticDatePickerSlotsComponentsProps>;
}
declare type StaticDatePickerComponent = (<TInputDate, TDate = TInputDate>(props: StaticDatePickerProps<TInputDate, TDate> & React.RefAttributes<HTMLDivElement>) => JSX.Element) & {
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
 * - [StaticDatePicker API](https://mui.com/x/api/date-pickers/static-date-picker/)
 */
export declare const StaticDatePicker: StaticDatePickerComponent;
export {};
