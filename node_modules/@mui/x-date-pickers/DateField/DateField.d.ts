import * as React from 'react';
import { DateFieldProps } from './DateField.interfaces';
declare type DateFieldComponent = (<TInputDate, TDate = TInputDate>(props: DateFieldProps<TInputDate, TDate> & React.RefAttributes<HTMLInputElement>) => JSX.Element) & {
    propTypes?: any;
};
export declare const DateField: DateFieldComponent;
export {};
