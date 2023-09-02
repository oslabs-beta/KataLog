import * as React from 'react';
import { DateInputProps, MuiTextFieldProps } from '../components/PureDateInput';
declare type MaskedInputProps<TInputDate, TDate> = Omit<DateInputProps<TInputDate, TDate>, 'adornmentPosition' | 'disableOpenPicker' | 'getOpenDialogAriaText' | 'InputAdornmentProps' | 'InputProps' | 'open' | 'openPicker' | 'OpenPickerButtonProps' | 'renderInput'> & {
    inputProps?: Partial<React.HTMLProps<HTMLInputElement>>;
};
export declare const useMaskedInput: <TInputDate, TDate>({ acceptRegex, disabled, disableMaskedInput, ignoreInvalidInputs, inputFormat, inputProps, label, mask, onChange, rawValue, readOnly, rifmFormatter, TextFieldProps, validationError, }: MaskedInputProps<TInputDate, TDate>) => MuiTextFieldProps;
export {};
