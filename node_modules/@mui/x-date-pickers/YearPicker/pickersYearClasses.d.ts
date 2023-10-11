export interface PickersYearClasses {
    /** Styles applied to the root element. */
    root: string;
    /** Styles applied to the root element in desktop mode. */
    modeDesktop: string;
    /** Styles applied to the root element in mobile mode. */
    modeMobile: string;
    /** Styles applied to the year button element. */
    yearButton: string;
    /** Styles applied to a selected year button element. */
    selected: string;
    /** Styles applied to a disabled year button element. */
    disabled: string;
}
export declare type PickersYearClassKey = keyof PickersYearClasses;
export declare function getPickersYearUtilityClass(slot: string): string;
export declare const pickersYearClasses: Record<"root" | "selected" | "disabled" | "modeDesktop" | "modeMobile" | "yearButton", string>;
