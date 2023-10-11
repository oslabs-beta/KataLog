import { CalendarPickerView } from '../../models/views';
interface FocusStateInput {
    autoFocus?: boolean;
    openView: any;
}
export declare const useFocusManagement: ({ autoFocus, openView }: FocusStateInput) => {
    focusedView: CalendarPickerView | null;
    setFocusedView: (view: CalendarPickerView) => (newHasFocus: boolean) => void;
};
export {};
