import { WrapperVariant } from '../components/wrappers/WrapperVariantContext';
import { MuiPickersAdapter } from '../models';
export interface PickerStateValueManager<TInputValue, TValue, TDate> {
    /**
     * Determines if two values are equal.
     * @template TDate, TValue
     * @param {MuiPickersAdapter<TDate>} utils The adapter.
     * @param {TValue} valueLeft The first value to compare.
     * @param {TValue} valueRight The second value to compare.
     * @returns {boolean} A boolean indicating if the two values are equal.
     */
    areValuesEqual: (utils: MuiPickersAdapter<TDate>, valueLeft: TValue, valueRight: TValue) => boolean;
    /**
     * Value to set when clicking the "Clear" button.
     */
    emptyValue: TValue;
    /**
     * Method returning the value to set when clicking the "Today" button
     * @template TDate, TValue
     * @param {MuiPickersAdapter<TDate>} utils The adapter.
     * @returns {TValue} The value to set when clicking the "Today" button.
     */
    getTodayValue: (utils: MuiPickersAdapter<TDate>) => TValue;
    /**
     * Method parsing the input value.
     * @template TDate, TInputValue, TValue
     * @param {MuiPickersAdapter<TDate>} utils The adapter.
     * @param {TInputValue} value The raw value to parse.
     * @returns {TValue} The parsed value.
     */
    parseInput: (utils: MuiPickersAdapter<TDate>, value: TInputValue) => TValue;
    /**
     * Generates the new value, given the previous value and the new proposed value.
     * @template TDate, TValue
     * @param {MuiPickersAdapter<TDate>} utils The adapter.
     * @param {TValue} lastValidDateValue The last valid value.
     * @param {TValue} value The proposed value.
     * @returns {TValue} The new value.
     */
    valueReducer?: (utils: MuiPickersAdapter<TDate>, lastValidDateValue: TValue, value: TValue) => TValue;
}
export declare type PickerSelectionState = 'partial' | 'shallow' | 'finish';
export interface PickerStateProps<TInputValue, TValue> {
    /**
     * If `true` the popup or dialog will immediately close after submitting full date.
     * @default `true` for Desktop, `false` for Mobile (based on the chosen wrapper and `desktopModeMediaQuery` prop).
     */
    closeOnSelect?: boolean;
    /**
     * Control the popup or dialog open state.
     */
    open?: boolean;
    /**
     * Callback fired when date is accepted @DateIOType.
     * @template TValue
     * @param {TValue} value The value that was just accepted.
     */
    onAccept?: (value: TValue) => void;
    /**
     * Callback fired when the value (the selected date) changes @DateIOType.
     * @template TValue
     * @param {TValue} value The new parsed value.
     * @param {string} keyboardInputValue The current value of the keyboard input.
     */
    onChange: (value: TValue, keyboardInputValue?: string) => void;
    /**
     * Callback fired when the popup requests to be closed.
     * Use in controlled mode (see open).
     */
    onClose?: () => void;
    /**
     * Callback fired when the popup requests to be opened.
     * Use in controlled mode (see open).
     */
    onOpen?: () => void;
    /**
     * The value of the picker.
     */
    value: TInputValue;
}
interface PickerStateInputProps<TInputValue, TValue> {
    onChange: (value: TValue, keyboardInputValue?: string) => void;
    open: boolean;
    rawValue: TInputValue;
    openPicker: () => void;
}
export interface PickerStatePickerProps<TValue> {
    parsedValue: TValue;
    isMobileKeyboardViewOpen: boolean;
    toggleMobileKeyboardView: () => void;
    onDateChange: (newDate: TValue, wrapperVariant: WrapperVariant, selectionState?: PickerSelectionState) => void;
}
export interface PickerStateWrapperProps {
    onAccept: () => void;
    onClear: () => void;
    onDismiss: () => void;
    onCancel: () => void;
    onSetToday: () => void;
    open: boolean;
}
interface PickerState<TInputValue, TValue> {
    inputProps: PickerStateInputProps<TInputValue, TValue>;
    pickerProps: PickerStatePickerProps<TValue>;
    wrapperProps: PickerStateWrapperProps;
}
export declare const usePickerState: <TInputValue, TValue, TDate>(props: PickerStateProps<TInputValue, TValue>, valueManager: PickerStateValueManager<TInputValue, TValue, TDate>) => PickerState<TInputValue, TValue>;
export {};
