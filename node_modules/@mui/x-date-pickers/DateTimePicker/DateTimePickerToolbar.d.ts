/// <reference types="react" />
import { BaseToolbarProps } from '../internals/models/props/baseToolbarProps';
import { DateTimePickerToolbarClasses } from './dateTimePickerToolbarClasses';
export interface DateTimePickerToolbarProps<TDate> extends BaseToolbarProps<TDate, TDate | null> {
    classes?: Partial<DateTimePickerToolbarClasses>;
}
/**
 * @ignore - internal component.
 */
export declare function DateTimePickerToolbar<TDate extends unknown>(inProps: DateTimePickerToolbarProps<TDate>): JSX.Element;
