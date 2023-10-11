import _extends from "@babel/runtime/helpers/esm/extends";
import * as React from 'react';
import DialogContent from '@mui/material/DialogContent';
import Dialog, { dialogClasses } from '@mui/material/Dialog';
import { styled } from '@mui/material/styles';
import { DIALOG_WIDTH } from '../constants/dimensions';
import { PickersActionBar } from '../../PickersActionBar';
import { jsx as _jsx } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";
const PickersModalDialogRoot = styled(Dialog)({
  [`& .${dialogClasses.container}`]: {
    outline: 0
  },
  [`& .${dialogClasses.paper}`]: {
    outline: 0,
    minWidth: DIALOG_WIDTH
  }
});
const PickersModalDialogContent = styled(DialogContent)({
  '&:first-of-type': {
    padding: 0
  }
});
export const PickersModalDialog = props => {
  const {
    children,
    DialogProps = {},
    onAccept,
    onClear,
    onDismiss,
    onCancel,
    onSetToday,
    open,
    components,
    componentsProps
  } = props;
  const ActionBar = components?.ActionBar ?? PickersActionBar;
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
    }, componentsProps?.actionBar))]
  }));
};