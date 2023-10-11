export interface PickersMonthClasses {
    /** Styles applied to the root element. */
    root: string;
    /** Styles applied to a selected root element. */
    selected: string;
}
export declare type PickersMonthClassKey = keyof PickersMonthClasses;
export declare function getPickersMonthUtilityClass(slot: string): string;
export declare const pickersMonthClasses: Record<keyof PickersMonthClasses, string>;
