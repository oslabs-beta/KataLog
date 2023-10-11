export interface DateTimePickerToolbarClasses {
    /** Styles applied to the root element. */
    root: string;
    /** Styles applied to the date container element. */
    dateContainer: string;
    /** Styles applied to the time container element. */
    timeContainer: string;
    /** Styles applied to the separator element. */
    separator: string;
}
export declare type DateTimePickerToolbarClassKey = keyof DateTimePickerToolbarClasses;
export declare function getDateTimePickerToolbarUtilityClass(slot: string): string;
export declare const dateTimePickerToolbarClasses: DateTimePickerToolbarClasses;
