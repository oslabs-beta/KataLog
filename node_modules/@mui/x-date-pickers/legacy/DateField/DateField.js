import _extends from "@babel/runtime/helpers/esm/extends";
import * as React from 'react';
import TextField from '@mui/material/TextField';
import { useDateField } from './useDateField';
import { jsx as _jsx } from "react/jsx-runtime";
export var DateField = /*#__PURE__*/React.forwardRef(function DateField(inProps, ref) {
  var _useDateField = useDateField(inProps),
      inputRef = _useDateField.inputRef,
      inputProps = _useDateField.inputProps;

  return /*#__PURE__*/_jsx(TextField, _extends({
    ref: ref,
    inputRef: inputRef
  }, inputProps));
});