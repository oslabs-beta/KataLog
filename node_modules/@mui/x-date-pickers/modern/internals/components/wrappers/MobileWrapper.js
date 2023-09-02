import _extends from "@babel/runtime/helpers/esm/extends";
import _objectWithoutPropertiesLoose from "@babel/runtime/helpers/esm/objectWithoutPropertiesLoose";
const _excluded = ["children", "DateInputProps", "DialogProps", "onAccept", "onClear", "onDismiss", "onCancel", "onSetToday", "open", "PureDateInputComponent", "components", "componentsProps"];
import * as React from 'react';
import { WrapperVariantContext } from './WrapperVariantContext';
import { PickersModalDialog } from '../PickersModalDialog';
import { jsx as _jsx } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";
export function MobileWrapper(props) {
  const {
    children,
    DateInputProps,
    DialogProps,
    onAccept,
    onClear,
    onDismiss,
    onCancel,
    onSetToday,
    open,
    PureDateInputComponent,
    components,
    componentsProps
  } = props,
        other = _objectWithoutPropertiesLoose(props, _excluded);

  return /*#__PURE__*/_jsxs(WrapperVariantContext.Provider, {
    value: "mobile",
    children: [/*#__PURE__*/_jsx(PureDateInputComponent, _extends({
      components: components
    }, other, DateInputProps)), /*#__PURE__*/_jsx(PickersModalDialog, {
      DialogProps: DialogProps,
      onAccept: onAccept,
      onClear: onClear,
      onDismiss: onDismiss,
      onCancel: onCancel,
      onSetToday: onSetToday,
      open: open,
      components: components,
      componentsProps: componentsProps,
      children: children
    })]
  });
}