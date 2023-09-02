import * as React from 'react';
import { BaseTimePickerProps } from '../TimePicker/shared';
import { ClockPickerSlotsComponent, ClockPickerSlotsComponentsProps } from '../ClockPicker/ClockPicker';
import { PickersStaticWrapperSlotsComponent, PickersStaticWrapperSlotsComponentsProps } from '../internals/components/PickerStaticWrapper/PickerStaticWrapper';
import { StaticPickerProps } from '../internals/models/props/staticPickerProps';
import { DateInputSlotsComponent } from '../internals/components/PureDateInput';
export interface StaticTimePickerSlotsComponents extends PickersStaticWrapperSlotsComponent, ClockPickerSlotsComponent, DateInputSlotsComponent {
}
export interface StaticTimePickerSlotsComponentsProps extends PickersStaticWrapperSlotsComponentsProps, ClockPickerSlotsComponentsProps {
}
export interface StaticTimePickerProps<TInputDate, TDate> extends StaticPickerProps<BaseTimePickerProps<TInputDate, TDate>> {
    /**
     * Overrideable components.
     * @default {}
     */
    components?: Partial<StaticTimePickerSlotsComponents>;
    /**
     * The props used for each component slot.
     * @default {}
     */
    componentsProps?: Partial<StaticTimePickerSlotsComponentsProps>;
}
declare type StaticTimePickerComponent = (<TInputDate, TDate = TInputDate>(props: StaticTimePickerProps<TInputDate, TDate> & React.RefAttributes<HTMLDivElement>) => JSX.Element) & {
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
 * - [StaticTimePicker API](https://mui.com/x/api/date-pickers/static-time-picker/)
 */
export declare const StaticTimePicker: StaticTimePickerComponent;
export {};
