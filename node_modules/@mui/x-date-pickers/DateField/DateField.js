import _extends from "@babel/runtime/helpers/esm/extends";
import * as React from 'react';
import TextField from '@mui/material/TextField';
import { useDateField } from './useDateField';
import { jsx as _jsx } from "react/jsx-runtime";
export const DateField = /*#__PURE__*/React.forwardRef(function DateField(inProps, ref) {
  const {
    inputRef,
    inputProps
  } = useDateField(inProps);
  return /*#__PURE__*/_jsx(TextField, _extends({
    ref: ref,
    inputRef: inputRef
  }, inputProps));
});