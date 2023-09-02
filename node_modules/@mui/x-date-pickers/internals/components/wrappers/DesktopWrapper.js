import _extends from "@babel/runtime/helpers/esm/extends";
import * as React from 'react';
import { useForkRef } from '@mui/material/utils';
import { WrapperVariantContext } from './WrapperVariantContext';
import { PickersPopper } from '../PickersPopper';
import { jsx as _jsx } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";
export function DesktopWrapper(props) {
  const {
    children,
    DateInputProps,
    KeyboardDateInputComponent,
    onClear,
    onDismiss,
    onCancel,
    onAccept,
    onSetToday,
    open,
    PopperProps,
    PaperProps,
    TransitionComponent,
    components,
    componentsProps
  } = props;
  const ownInputRef = React.useRef(null);
  const inputRef = useForkRef(DateInputProps.inputRef, ownInputRef);
  return /*#__PURE__*/_jsxs(WrapperVariantContext.Provider, {
    value: "desktop",
    children: [/*#__PURE__*/_jsx(KeyboardDateInputComponent, _extends({}, DateInputProps, {
      inputRef: inputRef
    })), /*#__PURE__*/_jsx(PickersPopper, {
      role: "dialog",
      open: open,
      anchorEl: ownInputRef.current,
      TransitionComponent: TransitionComponent,
      PopperProps: PopperProps,
      PaperProps: PaperProps,
      onClose: onDismiss,
      onCancel: onCancel,
      onClear: onClear,
      onAccept: onAccept,
      onSetToday: onSetToday,
      components: components,
      componentsProps: componentsProps,
      children: children
    })]
  });
}