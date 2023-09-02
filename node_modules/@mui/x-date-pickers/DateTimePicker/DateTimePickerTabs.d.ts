import * as React from 'react';
import { CalendarOrClockPickerView } from '../internals/models';
import { DateTimePickerTabsClasses } from './dateTimePickerTabsClasses';
export interface DateTimePickerTabsProps {
    /**
     * Date tab icon.
     * @default DateRange
     */
    dateRangeIcon?: React.ReactNode;
    /**
     * Callback called when tab is clicked
     * @param {CalendarOrClockPickerView} view Picker view that was clicked
     */
    onChange: (view: CalendarOrClockPickerView) => void;
    /**
     * Time tab icon.
     * @default Time
     */
    timeIcon?: React.ReactNode;
    /**
     * Open picker view
     */
    view: CalendarOrClockPickerView;
    /**
     * Override or extend the styles applied to the component.
     */
    classes?: Partial<DateTimePickerTabsClasses>;
}
declare const DateTimePickerTabs: {
    (inProps: DateTimePickerTabsProps): JSX.Element;
    propTypes: any;
};
export { DateTimePickerTabs };
