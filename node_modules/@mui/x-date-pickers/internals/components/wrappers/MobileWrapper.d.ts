import * as React from 'react';
import { ExportedPickerModalProps, PickersModalDialogSlotsComponent, PickersModalDialogSlotsComponentsProps } from '../PickersModalDialog';
import { DateInputPropsLike } from './WrapperProps';
import { PickerStateWrapperProps } from '../../hooks/usePickerState';
import { DateInputSlotsComponent } from '../PureDateInput';
export interface MobileWrapperProps extends ExportedPickerModalProps {
    children?: React.ReactNode;
}
export interface MobileWrapperSlotsComponent extends PickersModalDialogSlotsComponent, DateInputSlotsComponent {
}
export interface MobileWrapperSlotsComponentsProps extends PickersModalDialogSlotsComponentsProps {
}
export interface InternalMobileWrapperProps extends MobileWrapperProps, PickerStateWrapperProps {
    DateInputProps: DateInputPropsLike & {
        ref?: React.Ref<HTMLDivElement>;
    };
    PureDateInputComponent: React.JSXElementConstructor<DateInputPropsLike>;
    components?: Partial<MobileWrapperSlotsComponent>;
    componentsProps?: Partial<MobileWrapperSlotsComponentsProps>;
}
export declare function MobileWrapper(props: InternalMobileWrapperProps): JSX.Element;
