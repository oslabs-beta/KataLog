import _defineProperty from "@babel/runtime/helpers/esm/defineProperty";
import _extends from "@babel/runtime/helpers/esm/extends";
import _objectWithoutProperties from "@babel/runtime/helpers/esm/objectWithoutProperties";
var _excluded = ["className", "components", "disableOpenPicker", "getOpenDialogAriaText", "InputAdornmentProps", "InputProps", "inputRef", "openPicker", "OpenPickerButtonProps", "renderInput"];
import * as React from 'react';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import { useLocaleText, useUtils } from '../hooks/useUtils';
import { Calendar } from './icons';
import { useMaskedInput } from '../hooks/useMaskedInput';
import { jsx as _jsx } from "react/jsx-runtime";
export var KeyboardDateInput = /*#__PURE__*/React.forwardRef(function KeyboardDateInput(props, ref) {
  var className = props.className,
      _props$components = props.components,
      components = _props$components === void 0 ? {} : _props$components,
      disableOpenPicker = props.disableOpenPicker,
      getOpenDialogAriaTextProp = props.getOpenDialogAriaText,
      InputAdornmentProps = props.InputAdornmentProps,
      InputProps = props.InputProps,
      inputRef = props.inputRef,
      openPicker = props.openPicker,
      OpenPickerButtonProps = props.OpenPickerButtonProps,
      renderInput = props.renderInput,
      other = _objectWithoutProperties(props, _excluded);

  var localeText = useLocaleText();
  var getOpenDialogAriaText = getOpenDialogAriaTextProp != null ? getOpenDialogAriaTextProp : localeText.openDatePickerDialogue;
  var utils = useUtils();
  var textFieldProps = useMaskedInput(other);
  var adornmentPosition = (InputAdornmentProps == null ? void 0 : InputAdornmentProps.position) || 'end';
  var OpenPickerIcon = components.OpenPickerIcon || Calendar;
  return renderInput(_extends({
    ref: ref,
    inputRef: inputRef,
    className: className
  }, textFieldProps, {
    InputProps: _extends({}, InputProps, _defineProperty({}, "".concat(adornmentPosition, "Adornment"), disableOpenPicker ? undefined : /*#__PURE__*/_jsx(InputAdornment, _extends({
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
    }))))
  }));
});