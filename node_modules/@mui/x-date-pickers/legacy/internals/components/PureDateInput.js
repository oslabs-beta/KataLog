import _extends from "@babel/runtime/helpers/esm/extends";
import * as React from 'react';
import { useEventCallback } from '@mui/material/utils';
import { onSpaceOrEnter } from '../utils/utils';
import { useLocaleText, useUtils } from '../hooks/useUtils';
import { getDisplayDate } from '../utils/text-field-helper';
// TODO: why is this called "Pure*" when it's not memoized? Does "Pure" mean "readonly"?
export var PureDateInput = /*#__PURE__*/React.forwardRef(function PureDateInput(props, ref) {
  var disabled = props.disabled,
      getOpenDialogAriaTextProp = props.getOpenDialogAriaText,
      inputFormat = props.inputFormat,
      InputProps = props.InputProps,
      inputRef = props.inputRef,
      label = props.label,
      onOpen = props.openPicker,
      rawValue = props.rawValue,
      renderInput = props.renderInput,
      _props$TextFieldProps = props.TextFieldProps,
      TextFieldProps = _props$TextFieldProps === void 0 ? {} : _props$TextFieldProps,
      validationError = props.validationError,
      className = props.className;
  var localeText = useLocaleText(); // The prop can not be deprecated
  // Default is "Choose date, ...", but time pickers override it with "Choose time, ..."

  var getOpenDialogAriaText = getOpenDialogAriaTextProp != null ? getOpenDialogAriaTextProp : localeText.openDatePickerDialogue;
  var utils = useUtils();
  var PureDateInputProps = React.useMemo(function () {
    return _extends({}, InputProps, {
      readOnly: true
    });
  }, [InputProps]);
  var inputValue = getDisplayDate(utils, rawValue, inputFormat);
  var handleOnClick = useEventCallback(function (event) {
    event.stopPropagation();
    onOpen();
  });
  return renderInput(_extends({
    label: label,
    disabled: disabled,
    ref: ref,
    inputRef: inputRef,
    error: validationError,
    InputProps: PureDateInputProps,
    className: className
  }, !props.readOnly && !props.disabled && {
    onClick: handleOnClick
  }, {
    inputProps: _extends({
      disabled: disabled,
      readOnly: true,
      'aria-readonly': true,
      'aria-label': getOpenDialogAriaText(rawValue, utils),
      value: inputValue
    }, !props.readOnly && {
      onClick: handleOnClick
    }, {
      onKeyDown: onSpaceOrEnter(onOpen)
    })
  }, TextFieldProps));
});