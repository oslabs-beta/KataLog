import * as React from 'react';
import { PickersMonthClasses } from './pickersMonthClasses';
export interface MonthProps {
    children: React.ReactNode;
    disabled?: boolean;
    onSelect: (value: number) => void;
    selected?: boolean;
    value: number;
    hasFocus: boolean;
    onBlur: (event: React.FocusEvent, month: number) => void;
    onFocus: (event: React.FocusEvent, month: number) => void;
    tabIndex: number;
    classes?: Partial<PickersMonthClasses>;
}
/**
 * @ignore - do not document.
 */
export declare const PickersMonth: React.FC<MonthProps>;
