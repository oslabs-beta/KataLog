import * as React from 'react';
import { BaseToolbarProps } from '../models/props/baseToolbarProps';
import { PickersToolbarClasses } from './pickersToolbarClasses';
export interface PickersToolbarProps<TDate, TValue> extends Pick<BaseToolbarProps<TDate, TValue>, 'getMobileKeyboardInputViewButtonText' | 'isMobileKeyboardViewOpen' | 'toggleMobileKeyboardView'> {
    className?: string;
    viewType?: 'calendar' | 'clock';
    isLandscape: boolean;
    landscapeDirection?: 'row' | 'column';
    toolbarTitle: React.ReactNode;
    classes?: Partial<PickersToolbarClasses>;
}
declare type PickersToolbarComponent = (<TDate, TValue>(props: React.PropsWithChildren<PickersToolbarProps<TDate, TValue>> & React.RefAttributes<HTMLDivElement>) => JSX.Element) & {
    propTypes?: any;
};
export declare const PickersToolbar: PickersToolbarComponent;
export {};
