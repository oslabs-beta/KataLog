export interface CalendarOrClockPickerClasses {
    /** Styles applied to the root element. */
    root: string;
    /** Styles applied to the mobile keyboard input view element. */
    mobileKeyboardInputView: string;
}
export declare type CalendarOrClockPickerClassKey = keyof CalendarOrClockPickerClasses;
export declare function getCalendarOrClockPickerUtilityClass(slot: string): string;
export declare const calendarOrClockPickerClasses: Record<"root" | "mobileKeyboardInputView", string>;
