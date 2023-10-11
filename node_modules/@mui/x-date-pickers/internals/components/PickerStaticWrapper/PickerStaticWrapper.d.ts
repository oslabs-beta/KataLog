import * as React from 'react';
import { PickerStaticWrapperClasses } from './pickerStaticWrapperClasses';
import { PickersActionBarProps } from '../../../PickersActionBar';
import { PickerStateWrapperProps } from '../../hooks/usePickerState';
import { PickersSlotsComponent } from '../wrappers/WrapperProps';
export interface PickersStaticWrapperSlotsComponent extends PickersSlotsComponent {
}
export interface PickersStaticWrapperSlotsComponentsProps {
    actionBar: Omit<PickersActionBarProps, 'onAccept' | 'onClear' | 'onCancel' | 'onSetToday'>;
    paperContent: Record<string, any>;
}
export interface PickerStaticWrapperProps extends PickerStateWrapperProps {
    className?: string;
    children?: React.ReactNode;
    /**
     * Override or extend the styles applied to the component.
     */
    classes?: Partial<PickerStaticWrapperClasses>;
    /**
     * Force static wrapper inner components to be rendered in mobile or desktop mode.
     */
    displayStaticWrapperAs: 'desktop' | 'mobile';
    /**
     * Overrideable components.
     * @default {}
     */
    components?: Partial<PickersStaticWrapperSlotsComponent>;
    /**
     * The props used for each component slot.
     * @default {}
     */
    componentsProps?: Partial<PickersStaticWrapperSlotsComponentsProps>;
}
declare function PickerStaticWrapper(inProps: PickerStaticWrapperProps): JSX.Element;
declare namespace PickerStaticWrapper {
    var propTypes: any;
}
export { PickerStaticWrapper };
