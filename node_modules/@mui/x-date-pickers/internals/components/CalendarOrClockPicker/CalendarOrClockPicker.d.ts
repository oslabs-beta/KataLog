import * as React from 'react';
import { DateTimePickerTabsProps } from '../../../DateTimePicker';
import { ExportedClockPickerProps } from '../../../ClockPicker/ClockPicker';
import { CalendarPickerSlotsComponent, CalendarPickerSlotsComponentsProps, ExportedCalendarPickerProps } from '../../../CalendarPicker/CalendarPicker';
import { DateInputPropsLike } from '../wrappers/WrapperProps';
import { PickerStatePickerProps } from '../../hooks/usePickerState';
import { BasePickerProps } from '../../models/props/basePickerProps';
import { CalendarOrClockPickerView } from '../../models';
import { BaseToolbarProps } from '../../models/props/baseToolbarProps';
import { CalendarOrClockPickerClasses } from './calendarOrClockPickerClasses';
export interface CalendarOrClockPickerSlotsComponent extends CalendarPickerSlotsComponent {
    /**
     * Tabs enabling toggling between date and time pickers.
     * @default DateTimePickerTabs
     */
    Tabs: React.ElementType<DateTimePickerTabsProps>;
}
export interface CalendarOrClockPickerSlotsComponentsProps extends CalendarPickerSlotsComponentsProps {
    tabs: Omit<DateTimePickerTabsProps, 'onChange' | 'view'>;
}
export interface ExportedCalendarOrClockPickerProps<TDate, View extends CalendarOrClockPickerView> extends Omit<BasePickerProps<any, TDate | null>, 'value' | 'onChange'>, Omit<ExportedCalendarPickerProps<TDate>, 'onViewChange' | 'openTo' | 'view'>, ExportedClockPickerProps<TDate> {
    dateRangeIcon?: React.ReactNode;
    /**
     * Callback fired on view change.
     * @template View
     * @param {View} view The new view.
     */
    onViewChange?: (view: View) => void;
    /**
     * First view to show.
     */
    openTo: View;
    timeIcon?: React.ReactNode;
    /**
     * Array of views to show.
     */
    views: readonly View[];
    /**
     * Overrideable components.
     * @default {}
     */
    components?: Partial<CalendarOrClockPickerSlotsComponent>;
    /**
     * The props used for each component slot.
     * @default {}
     */
    componentsProps?: Partial<CalendarOrClockPickerSlotsComponentsProps>;
    toolbarFormat?: string;
    toolbarPlaceholder?: React.ReactNode;
    toolbarTitle?: React.ReactNode;
    hideTabs?: boolean;
}
export interface CalendarOrClockPickerProps<TDate, View extends CalendarOrClockPickerView> extends ExportedCalendarOrClockPickerProps<TDate, View>, PickerStatePickerProps<TDate | null> {
    autoFocus?: boolean;
    DateInputProps: DateInputPropsLike;
    ToolbarComponent?: React.JSXElementConstructor<BaseToolbarProps<TDate, TDate | null>>;
    classes?: Partial<CalendarOrClockPickerClasses>;
}
export declare const MobileKeyboardInputView: import("@emotion/styled").StyledComponent<import("@mui/system").MUIStyledCommonProps<import("@mui/material").Theme>, Pick<React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>, keyof React.ClassAttributes<HTMLDivElement> | keyof React.HTMLAttributes<HTMLDivElement>>, {}>;
export declare function CalendarOrClockPicker<TDate, View extends CalendarOrClockPickerView>(inProps: CalendarOrClockPickerProps<TDate, View>): JSX.Element;
