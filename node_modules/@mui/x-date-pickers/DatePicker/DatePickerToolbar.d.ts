import * as React from 'react';
import { BaseToolbarProps } from '../internals/models/props/baseToolbarProps';
import { DatePickerToolbarClasses } from './datePickerToolbarClasses';
export interface DatePickerToolbarProps<TDate> extends BaseToolbarProps<TDate, TDate | null> {
    classes?: Partial<DatePickerToolbarClasses>;
}
declare type DatePickerToolbarComponent = (<TDate>(props: DatePickerToolbarProps<TDate> & React.RefAttributes<HTMLDivElement>) => JSX.Element) & {
    propTypes?: any;
};
/**
 * @ignore - internal component.
 */
export declare const DatePickerToolbar: DatePickerToolbarComponent;
export {};
