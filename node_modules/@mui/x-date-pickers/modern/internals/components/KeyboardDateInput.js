import _extends from "@babel/runtime/helpers/esm/extends";
import _objectWithoutPropertiesLoose from "@babel/runtime/helpers/esm/objectWithoutPropertiesLoose";
const _excluded = ["className", "components", "disableOpenPicker", "getOpenDialogAriaText", "InputAdornmentProps", "InputProps", "inputRef", "openPicker", "OpenPickerButtonProps", "renderInput"];
import * as React from 'react';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import { useLocaleText, useUtils } from '../hooks/useUtils';
import { Calendar } from './icons';
import { useMaskedInput } from '../hooks/useMaskedInput';
import { jsx as _jsx } from "react/jsx-runtime";
export const KeyboardDateInput = /*#__PURE__*/React.forwardRef(function KeyboardDateInput(props, ref) {
  const {
    className,
    components = {},
    disableOpenPicker,
    getOpenDialogAriaText: getOpenDialogAriaTextProp,
    InputAdornmentProps,
    InputProps,
    inputRef,
    openPicker,
    OpenPickerButtonProps,
    renderInput
  } = props,
        other = _objectWithoutPropertiesLoose(props, _excluded);

  const localeText = useLocaleText();
  const getOpenDialogAriaText = getOpenDialogAriaTextProp ?? localeText.openDatePickerDialogue;
  const utils = useUtils();
  const textFieldProps = useMaskedInput(other);
  const adornmentPosition = InputAdornmentProps?.position || 'end';
  const OpenPickerIcon = components.OpenPickerIcon || Calendar;
  return renderInput(_extends({
    ref,
    inputRef,
    className
  }, textFieldProps, {
    InputProps: _extends({}, InputProps, {
      [`${adornmentPosition}Adornment`]: disableOpenPicker ? undefined : /*#__PURE__*/_jsx(InputAdornment, _extends({
        position: adornmentPosition
      }, InputAdornmentProps, {
        children: /*#__PURE__*/_jsx(IconButton, _extends({
          edge: adornmentPosition,
          disabled: other.disabled || other.readOnly,
          "aria-label": getOpenDialogAriaText(other.rawValue, utils)
        }, OpenPickerButtonProps, {
          onClick: openPicker,
          children: /*#__PURE__*/_jsx(OpenPickerIcon, {})
        }))
      }))
    })
  }));
});