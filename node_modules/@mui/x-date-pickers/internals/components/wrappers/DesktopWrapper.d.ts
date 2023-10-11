import * as React from 'react';
import { ExportedPickerPopperProps, ExportedPickerPaperProps, PickersPopperSlotsComponent, PickersPopperSlotsComponentsProps } from '../PickersPopper';
import { DateInputPropsLike } from './WrapperProps';
import { PickerStateWrapperProps } from '../../hooks/usePickerState';
import { DateInputSlotsComponent } from '../PureDateInput';
export interface DesktopWrapperProps extends ExportedPickerPopperProps, ExportedPickerPaperProps {
    children?: React.ReactNode;
}
export interface DesktopWrapperSlotsComponent extends PickersPopperSlotsComponent, DateInputSlotsComponent {
}
export interface DesktopWrapperSlotsComponentsProps extends PickersPopperSlotsComponentsProps {
}
export interface InternalDesktopWrapperProps extends DesktopWrapperProps, PickerStateWrapperProps {
    DateInputProps: DateInputPropsLike & {
        ref?: React.Ref<HTMLDivElement>;
    };
    KeyboardDateInputComponent: React.JSXElementConstructor<DateInputPropsLike & {
        ref?: React.Ref<HTMLDivElement>;
    }>;
    /**
     * Overrideable components.
     * @default {}
     */
    components?: Partial<DesktopWrapperSlotsComponent>;
    /**
     * The props used for each component slot.
     * @default {}
     */
    componentsProps?: Partial<DesktopWrapperSlotsComponentsProps>;
}
export declare function DesktopWrapper(props: InternalDesktopWrapperProps): JSX.Element;
