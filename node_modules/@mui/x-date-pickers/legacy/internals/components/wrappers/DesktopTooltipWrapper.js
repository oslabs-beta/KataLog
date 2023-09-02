import _extends from "@babel/runtime/helpers/esm/extends";
import * as React from 'react';
import { useForkRef } from '@mui/material/utils';
import { WrapperVariantContext } from './WrapperVariantContext';
import { executeInTheNextEventLoopTick, getActiveElement } from '../../utils/utils';
import { PickersPopper } from '../PickersPopper';
import { jsx as _jsx } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";
export function DesktopTooltipWrapper(props) {
  var children = props.children,
      DateInputProps = props.DateInputProps,
      KeyboardDateInputComponent = props.KeyboardDateInputComponent,
      open = props.open,
      PopperProps = props.PopperProps,
      PaperProps = props.PaperProps,
      TransitionComponent = props.TransitionComponent,
      onClear = props.onClear,
      onDismiss = props.onDismiss,
      onCancel = props.onCancel,
      onAccept = props.onAccept,
      onSetToday = props.onSetToday,
      components = props.components,
      componentsProps = props.componentsProps;
  var inputContainerRef = React.useRef(null);
  var popperRef = React.useRef(null);

  var handleBlur = function handleBlur() {
    executeInTheNextEventLoopTick(function () {
      var _inputContainerRef$cu, _popperRef$current;

      if ((_inputContainerRef$cu = inputContainerRef.current) != null && _inputContainerRef$cu.contains(getActiveElement(document)) || (_popperRef$current = popperRef.current) != null && _popperRef$current.contains(getActiveElement(document))) {
        return;
      }

      onDismiss();
    });
  };

  var inputComponentRef = useForkRef(DateInputProps.ref, inputContainerRef);
  return /*#__PURE__*/_jsxs(WrapperVariantContext.Provider, {
    value: "desktop",
    children: [/*#__PURE__*/_jsx(KeyboardDateInputComponent, _extends({}, DateInputProps, {
      ref: inputComponentRef,
      onBlur: handleBlur
    })), /*#__PURE__*/_jsx(PickersPopper, {
      role: "tooltip",
      open: open,
      containerRef: popperRef,
      anchorEl: inputContainerRef.current,
      TransitionComponent: TransitionComponent,
      PopperProps: PopperProps,
      PaperProps: PaperProps,
      onBlur: handleBlur,
      onClose: onDismiss,
      onClear: onClear,
      onCancel: onCancel,
      onAccept: onAccept,
      onSetToday: onSetToday,
      components: components,
      componentsProps: componentsProps,
      children: children
    })]
  });
}