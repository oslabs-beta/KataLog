export interface DayPickerClasses {
    /** Styles applied to the header element. */
    header: string;
    /** Styles applied to the week day label element. */
    weekDayLabel: string;
    /** Styles applied to the loading container element. */
    loadingContainer: string;
    /** Styles applied to the slide transition element. */
    slideTransition: string;
    /** Styles applied to the month container element. */
    monthContainer: string;
    /** Styles applied to the week container element. */
    weekContainer: string;
}
export declare type DayPickerClassKey = keyof DayPickerClasses;
export declare const getDayPickerUtilityClass: (slot: string) => string;
export declare const dayPickerClasses: DayPickerClasses;
