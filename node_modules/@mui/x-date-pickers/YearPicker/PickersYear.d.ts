import * as React from 'react';
import { PickersYearClasses } from './pickersYearClasses';
export interface PickersYearProps {
    autoFocus?: boolean;
    children: React.ReactNode;
    classes?: Partial<PickersYearClasses>;
    className?: string;
    disabled?: boolean;
    onClick: (event: React.MouseEvent, value: number) => void;
    onKeyDown: (event: React.KeyboardEvent, value: number) => void;
    selected: boolean;
    value: number;
    tabIndex: number;
    onFocus: (event: React.FocusEvent, year: number) => void;
    onBlur: (event: React.FocusEvent, year: number) => void;
}
/**
 * @ignore - internal component.
 */
export declare const PickersYear: React.ForwardRefExoticComponent<PickersYearProps & React.RefAttributes<HTMLButtonElement>>;
