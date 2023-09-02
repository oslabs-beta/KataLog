import * as React from 'react';
import { DialogProps as MuiDialogProps } from '@mui/material/Dialog';
import { PickersActionBarProps } from '../../PickersActionBar';
import { PickerStateWrapperProps } from '../hooks/usePickerState';
import { PickersSlotsComponent } from './wrappers/WrapperProps';
export interface PickersModalDialogSlotsComponent extends Omit<PickersSlotsComponent, 'PaperContent'> {
}
export interface PickersModalDialogSlotsComponentsProps {
    actionBar: Omit<PickersActionBarProps, 'onAccept' | 'onClear' | 'onCancel' | 'onSetToday'>;
}
export interface ExportedPickerModalProps {
    /**
     * Props applied to the [`Dialog`](https://mui.com/material-ui/api/dialog/) element.
     */
    DialogProps?: Partial<MuiDialogProps>;
}
export interface PickersModalDialogProps extends ExportedPickerModalProps, PickerStateWrapperProps {
    /**
     * Overrideable components.
     * @default {}
     */
    components?: Partial<PickersModalDialogSlotsComponent>;
    /**
     * The props used for each component slot.
     * @default {}
     */
    componentsProps?: Partial<PickersModalDialogSlotsComponentsProps>;
}
export declare const PickersModalDialog: (props: React.PropsWithChildren<PickersModalDialogProps>) => JSX.Element;
