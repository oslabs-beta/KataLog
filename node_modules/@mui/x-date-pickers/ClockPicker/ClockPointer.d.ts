import * as React from 'react';
import { ClockPickerView } from '../internals/models';
import { ClockPointerClasses } from './clockPointerClasses';
export interface ClockPointerProps extends React.HTMLAttributes<HTMLDivElement> {
    hasSelected: boolean;
    isInner: boolean;
    type: ClockPickerView;
    value: number;
    classes?: Partial<ClockPointerClasses>;
}
/**
 * @ignore - internal component.
 */
export declare function ClockPointer(inProps: ClockPointerProps): JSX.Element;
