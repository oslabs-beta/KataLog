import * as React from 'react';
import { ExportedClockPickerProps } from '../ClockPicker/ClockPicker';
import { ExportedCalendarPickerProps } from '../CalendarPicker/CalendarPicker';
import { DateTimeValidationError } from '../internals/hooks/validation/useDateTimeValidation';
import { ValidationProps } from '../internals/hooks/validation/useValidation';
import { BasePickerProps } from '../internals/models/props/basePickerProps';
import { ExportedDateInputProps } from '../internals/components/PureDateInput';
import { CalendarOrClockPickerView } from '../internals/models';
import { PickerStateValueManager } from '../internals/hooks/usePickerState';
import { BaseToolbarProps } from '../internals/models/props/baseToolbarProps';
import { DefaultizedProps } from '../internals/models/helpers';
import { BaseDateValidationProps } from '../internals/hooks/validation/models';
export interface BaseDateTimePickerProps<TInputDate, TDate> extends ExportedClockPickerProps<TDate>, ExportedCalendarPickerProps<TDate>, BasePickerProps<TInputDate | null, TDate | null>, ValidationProps<DateTimeValidationError, TInputDate | null>, ExportedDateInputProps<TInputDate, TDate> {
    /**
     * 12h/24h view for hour selection clock.
     * @default `utils.is12HourCycleInCurrentLocale()`
     */
    ampm?: boolean;
    /**
     * Toggles visibility of date time switching tabs
     * @default false for mobile, true for desktop
     */
    hideTabs?: boolean;
    /**
     * Date tab icon.
     */
    dateRangeIcon?: React.ReactNode;
    /**
     * Time tab icon.
     */
    timeIcon?: React.ReactNode;
    /**
     * Minimal selectable moment of time with binding to date, to set min time in each day use `minTime`.
     */
    minDateTime?: TDate;
    /**
     * Maximal selectable moment of time with binding to date, to set max time in each day use `maxTime`.
     */
    maxDateTime?: TDate;
    /**
     * Callback fired on view change.
     * @param {CalendarOrClockPickerView} view The new view.
     */
    onViewChange?: (view: CalendarOrClockPickerView) => void;
    /**
     * First view to show.
     * Must be a valid option from `views` list
     * @default 'day'
     */
    openTo?: CalendarOrClockPickerView;
    /**
     * Component that will replace default toolbar renderer.
     * @default DateTimePickerToolbar
     */
    ToolbarComponent?: React.JSXElementConstructor<BaseToolbarProps<TDate, TDate | null>>;
    /**
     * Mobile picker title, displaying in the toolbar.
     * @default 'Select date & time'
     */
    toolbarTitle?: React.ReactNode;
    /**
     * Date format, that is displaying in toolbar.
     */
    toolbarFormat?: string;
    /**
     * Mobile picker date value placeholder, displaying if `value` === `null`.
     * @default '–'
     */
    toolbarPlaceholder?: React.ReactNode;
    /**
     * Array of views to show.
     * @default ['year', 'day', 'hours', 'minutes']
     */
    views?: readonly CalendarOrClockPickerView[];
}
export declare function useDateTimePickerDefaultizedProps<TInputDate, TDate, Props extends BaseDateTimePickerProps<TInputDate, TDate>>(props: Props, name: string): DefaultizedProps<Props, 'openTo' | 'views' | keyof BaseDateValidationProps<TDate>, {
    inputFormat: string;
}>;
export declare const dateTimePickerValueManager: PickerStateValueManager<any, any, any>;
