export interface PickersToolbarClasses {
    /** Styles applied to the root element. */
    root: string;
    /** Styles applied to the content element. */
    content: string;
    /** Styles applied to the pen icon button element. */
    penIconButton: string;
    /** Styles applied to the pen icon button element in landscape mode. */
    penIconButtonLandscape: string;
}
export declare type PickersToolbarClassKey = keyof PickersToolbarClasses;
export declare function getPickersToolbarUtilityClass(slot: string): string;
export declare const pickersToolbarClasses: Record<"root" | "content" | "penIconButton" | "penIconButtonLandscape", string>;
