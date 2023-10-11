export interface PickersArrowSwitcherClasses {
    /** Styles applied to the root element. */
    root: string;
    /** Styles applied to the spacer element. */
    spacer: string;
    /** Styles applied to the button element. */
    button: string;
}
export declare type PickersArrowSwitcherClassKey = keyof PickersArrowSwitcherClasses;
export declare function getPickersArrowSwitcherUtilityClass(slot: string): string;
export declare const pickersArrowSwitcherClasses: Record<"root" | "button" | "spacer", string>;
