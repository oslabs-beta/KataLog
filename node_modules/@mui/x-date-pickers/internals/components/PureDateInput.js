import _extends from "@babel/runtime/helpers/esm/extends";
import * as React from 'react';
import { useEventCallback } from '@mui/material/utils';
import { onSpaceOrEnter } from '../utils/utils';
import { useLocaleText, useUtils } from '../hooks/useUtils';
import { getDisplayDate } from '../utils/text-field-helper';
// TODO: why is this called "Pure*" when it's not memoized? Does "Pure" mean "readonly"?
export const PureDateInput = /*#__PURE__*/React.forwardRef(function PureDateInput(props, ref) {
  const {
    disabled,
    getOpenDialogAriaText: getOpenDialogAriaTextProp,
    inputFormat,
    InputProps,
    inputRef,
    label,
    openPicker: onOpen,
    rawValue,
    renderInput,
    TextFieldProps = {},
    validationError,
    className
  } = props;
  const localeText = useLocaleText(); // The prop can not be deprecated
  // Default is "Choose date, ...", but time pickers override it with "Choose time, ..."

  const getOpenDialogAriaText = getOpenDialogAriaTextProp != null ? getOpenDialogAriaTextProp : localeText.openDatePickerDialogue;
  const utils = useUtils();
  const PureDateInputProps = React.useMemo(() => _extends({}, InputProps, {
    readOnly: true
  }), [InputProps]);
  const inputValue = getDisplayDate(utils, rawValue, inputFormat);
  const handleOnClick = useEventCallback(event => {
    event.stopPropagation();
    onOpen();
  });
  return renderInput(_extends({
    label,
    disabled,
    ref,
    inputRef,
    error: validationError,
    InputProps: PureDateInputProps,
    className
  }, !props.readOnly && !props.disabled && {
    onClick: handleOnClick
  }, {
    inputProps: _extends({
      disabled,
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