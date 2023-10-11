import * as React from 'react';
import { CalendarPickerView } from '../internals/models';
import { ExportedCalendarPickerProps } from '../CalendarPicker/CalendarPicker';
import { DateValidationError } from '../internals/hooks/validation/useDateValidation';
import { ValidationProps } from '../internals/hooks/validation/useValidation';
import { ExportedDateInputProps } from '../internals/components/PureDateInput';
import { BasePickerProps } from '../internals/models/props/basePickerProps';
import { PickerStateValueManager } from '../internals/hooks/usePickerState';
import { BaseToolbarProps } from '../internals/models/props/baseToolbarProps';
import { DefaultizedProps } from '../internals/models/helpers';
import { BaseDateValidationProps } from '../internals/hooks/validation/models';
export interface BaseDatePickerProps<TInputDate, TDate> extends ExportedCalendarPickerProps<TDate>, BasePickerProps<TInputDate | null, TDate | null>, ValidationProps<DateValidationError, TInputDate | null>, ExportedDateInputProps<TInputDate, TDate> {
    /**
     * Callback fired on view change.
     * @param {CalendarPickerView} view The new view.
     */
    onViewChange?: (view: CalendarPickerView) => void;
    /**
     * First view to show.
     * Must be a valid option from `views` list
     * @default 'day'
     */
    openTo?: CalendarPickerView;
    /**
     * Component that will replace default toolbar renderer.
     * @default DatePickerToolbar
     */
    ToolbarComponent?: React.JSXElementConstructor<BaseToolbarProps<TDate, TDate | null>>;
    /**
     * Mobile picker date value placeholder, displaying if `value` === `null`.
     * @default '–'
     */
    toolbarPlaceholder?: React.ReactNode;
    /**
     * Date format, that is displaying in toolbar.
     */
    toolbarFormat?: string;
    /**
     * Mobile picker title, displaying in the toolbar.
     * @default 'Select date'
     */
    toolbarTitle?: React.ReactNode;
    /**
     * Array of views to show.
     * @default ['year', 'day']
     */
    views?: readonly CalendarPickerView[];
}
export declare const isYearOnlyView: (views: readonly CalendarPickerView[]) => views is readonly "year"[];
export declare const isYearAndMonthViews: (views: readonly CalendarPickerView[]) => views is readonly ("month" | "year")[];
export declare function useDatePickerDefaultizedProps<TInputDate, TDate, Props extends BaseDatePickerProps<TInputDate, TDate>>(props: Props, name: string): DefaultizedProps<Props, 'openTo' | 'views' | keyof BaseDateValidationProps<TDate>, {
    inputFormat: string;
}>;
export declare const datePickerValueManager: PickerStateValueManager<any, any, any>;
