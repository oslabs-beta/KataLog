import _extends from "@babel/runtime/helpers/esm/extends";
import _objectWithoutPropertiesLoose from "@babel/runtime/helpers/esm/objectWithoutPropertiesLoose";
const _excluded = ["onAccept", "onClear", "onCancel", "onSetToday", "actions"];
import * as React from 'react';
import Button from '@mui/material/Button';
import DialogActions from '@mui/material/DialogActions';
import { useLocaleText } from '../internals/hooks/useUtils';
import { WrapperVariantContext } from '../internals/components/wrappers/WrapperVariantContext';
import { jsx as _jsx } from "react/jsx-runtime";
export const PickersActionBar = props => {
  const {
    onAccept,
    onClear,
    onCancel,
    onSetToday,
    actions
  } = props,
        other = _objectWithoutPropertiesLoose(props, _excluded);

  const wrapperVariant = React.useContext(WrapperVariantContext);
  const localeText = useLocaleText();
  const actionsArray = typeof actions === 'function' ? actions(wrapperVariant) : actions;

  if (actionsArray == null || actionsArray.length === 0) {
    return null;
  }

  const buttons = actionsArray?.map(actionType => {
    switch (actionType) {
      case 'clear':
        return /*#__PURE__*/_jsx(Button, {
          onClick: onClear,
          children: localeText.clearButtonLabel
        }, actionType);

      case 'cancel':
        return /*#__PURE__*/_jsx(Button, {
          onClick: onCancel,
          children: localeText.cancelButtonLabel
        }, actionType);

      case 'accept':
        return /*#__PURE__*/_jsx(Button, {
          onClick: onAccept,
          children: localeText.okButtonLabel
        }, actionType);

      case 'today':
        return /*#__PURE__*/_jsx(Button, {
          onClick: onSetToday,
          children: localeText.todayButtonLabel
        }, actionType);

      default:
        return null;
    }
  });
  return /*#__PURE__*/_jsx(DialogActions, _extends({}, other, {
    children: buttons
  }));
};