import * as React from 'react';
import { PickersArrowSwitcherClasses } from './pickersArrowSwitcherClasses';
export interface PickersArrowSwitcherSlotsComponent {
    /**
     * Button allowing to switch to the left view.
     * @default IconButton
     */
    LeftArrowButton: React.ElementType;
    /**
     * Icon displayed in the left view switch button.
     * @default ArrowLeft
     */
    LeftArrowIcon: React.ElementType;
    /**
     * Button allowing to switch to the right view.
     * @default IconButton
     */
    RightArrowButton: React.ElementType;
    /**
     * Icon displayed in the right view switch button.
     * @default ArrowRight
     */
    RightArrowIcon: React.ElementType;
}
export interface PickersArrowSwitcherSlotsComponentsProps {
    leftArrowButton: Record<string, any>;
    rightArrowButton: Record<string, any>;
}
export interface ExportedArrowSwitcherProps {
    /**
     * Overrideable components.
     * @default {}
     */
    components?: Partial<PickersArrowSwitcherSlotsComponent>;
    /**
     * The props used for each component slot.
     * @default {}
     */
    componentsProps?: Partial<PickersArrowSwitcherSlotsComponentsProps>;
    /**
     * Left arrow icon aria-label text.
     * @deprecated
     */
    leftArrowButtonText?: string;
    /**
     * Right arrow icon aria-label text.
     * @deprecated
     */
    rightArrowButtonText?: string;
    classes?: Partial<PickersArrowSwitcherClasses>;
}
interface ArrowSwitcherProps extends ExportedArrowSwitcherProps, Omit<React.HTMLProps<HTMLDivElement>, 'ref'> {
    children?: React.ReactNode;
    isLeftDisabled: boolean;
    isLeftHidden?: boolean;
    isRightDisabled: boolean;
    isRightHidden?: boolean;
    onLeftClick: () => void;
    onRightClick: () => void;
}
export declare const PickersArrowSwitcher: React.ForwardRefExoticComponent<Omit<ArrowSwitcherProps, "as"> & React.RefAttributes<HTMLDivElement>>;
export {};
