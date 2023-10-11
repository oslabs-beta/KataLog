import _extends from "@babel/runtime/helpers/esm/extends";
import * as React from 'react';
import { useForkRef } from '@mui/material/utils';
import { WrapperVariantContext } from './WrapperVariantContext';
import { PickersPopper } from '../PickersPopper';
import { jsx as _jsx } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";
export function DesktopWrapper(props) {
  var children = props.children,
      DateInputProps = props.DateInputProps,
      KeyboardDateInputComponent = props.KeyboardDateInputComponent,
      onClear = props.onClear,
      onDismiss = props.onDismiss,
      onCancel = props.onCancel,
      onAccept = props.onAccept,
      onSetToday = props.onSetToday,
      open = props.open,
      PopperProps = props.PopperProps,
      PaperProps = props.PaperProps,
      TransitionComponent = props.TransitionComponent,
      components = props.components,
      componentsProps = props.componentsProps;
  var ownInputRef = React.useRef(null);
  var inputRef = useForkRef(DateInputProps.inputRef, ownInputRef);
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