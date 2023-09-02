import { FieldSection, AvailableAdjustKeyCode } from './useField.interfaces';
import { MuiPickerFieldAdapter, MuiDateSectionName } from '../../models';
export declare const getDateSectionNameFromFormatToken: <TDate>(utils: MuiPickerFieldAdapter<TDate>, formatToken: string) => MuiDateSectionName;
export declare const adjustDateSectionValue: <TDate>(utils: MuiPickerFieldAdapter<TDate>, date: TDate, dateSectionName: MuiDateSectionName, keyCode: AvailableAdjustKeyCode) => TDate;
export declare const adjustInvalidDateSectionValue: <TDate, TSection extends FieldSection>(utils: MuiPickerFieldAdapter<TDate>, section: TSection, keyCode: AvailableAdjustKeyCode) => string;
export declare const getSectionVisibleValue: (section: Omit<FieldSection, 'start' | 'end'>) => string;
export declare const addPositionPropertiesToSections: <TSection extends FieldSection>(sections: Omit<TSection, "end" | "start">[]) => TSection[];
export declare const splitFormatIntoSections: <TDate>(utils: MuiPickerFieldAdapter<TDate>, format: string, date: TDate | null) => Omit<FieldSection, "end" | "start">[];
export declare const createDateStrFromSections: (sections: FieldSection[]) => string;
export declare const setSectionValue: <TSection extends FieldSection>(sections: TSection[], sectionIndex: number, sectionNewValue: string, sectionNewQuery?: string | null) => TSection[];
export declare const getMonthsMatchingQuery: <TDate>(utils: MuiPickerFieldAdapter<TDate>, format: string, query: string) => string[];
export declare const getSectionValueNumericBoundaries: <TDate>(utils: MuiPickerFieldAdapter<TDate>, date: TDate, dateSectionName: MuiDateSectionName) => {
    minimum: number;
    maximum: number;
};
export declare const cleanTrailingZeroInNumericSectionValue: (value: string, maximum: number) => string;
