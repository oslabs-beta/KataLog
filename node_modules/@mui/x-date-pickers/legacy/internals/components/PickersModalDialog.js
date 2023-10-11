import _extends from "@babel/runtime/helpers/esm/extends";
import _defineProperty from "@babel/runtime/helpers/esm/defineProperty";

var _styled;

import * as React from 'react';
import DialogContent from '@mui/material/DialogContent';
import Dialog, { dialogClasses } from '@mui/material/Dialog';
import { styled } from '@mui/material/styles';
import { DIALOG_WIDTH } from '../constants/dimensions';
import { PickersActionBar } from '../../PickersActionBar';
import { jsx as _jsx } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";
var PickersModalDialogRoot = styled(Dialog)((_styled = {}, _defineProperty(_styled, "& .".concat(dialogClasses.container), {
  outline: 0
}), _defineProperty(_styled, "& .".concat(dialogClasses.paper), {
  outline: 0,
  minWidth: DIALOG_WIDTH
}), _styled));
var PickersModalDialogContent = styled(DialogContent)({
  '&:first-of-type': {
    padding: 0
  }
});
export var PickersModalDialog = function PickersModalDialog(props) {
  var _components$ActionBar;

  var children = props.children,
      _props$DialogProps = props.DialogProps,
      DialogProps = _props$DialogProps === void 0 ? {} : _props$DialogProps,
      onAccept = props.onAccept,
      onClear = props.onClear,
      onDismiss = props.onDismiss,
      onCancel = props.onCancel,
      onSetToday = props.onSetToday,
      open = props.open,
      components = props.components,
      componentsProps = props.componentsProps;
  var ActionBar = (_components$ActionBar = components == null ? void 0 : components.ActionBar) != null ? _components$ActionBar : PickersActionBar;
  return /*#__PURE__*/_jsxs(PickersModalDialogRoot, _extends({
    open: open,
    onClose: onDismiss
  }, DialogProps, {
    children: [/*#__PURE__*/_jsx(PickersModalDialogContent, {
      children: children
    }), /*#__PURE__*/_jsx(ActionBar, _extends({
      onAccept: onAccept,
      onClear: onClear,
      onCancel: onCancel,
      onSetToday: onSetToday,
      actions: ['cancel', 'accept']
    }, componentsProps == null ? void 0 : componentsProps.actionBar))]
  }));
};