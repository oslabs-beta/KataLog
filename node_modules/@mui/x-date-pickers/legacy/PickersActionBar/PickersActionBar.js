import _extends from "@babel/runtime/helpers/esm/extends";
import _objectWithoutProperties from "@babel/runtime/helpers/esm/objectWithoutProperties";
var _excluded = ["onAccept", "onClear", "onCancel", "onSetToday", "actions"];
import * as React from 'react';
import Button from '@mui/material/Button';
import DialogActions from '@mui/material/DialogActions';
import { useLocaleText } from '../internals/hooks/useUtils';
import { WrapperVariantContext } from '../internals/components/wrappers/WrapperVariantContext';
import { jsx as _jsx } from "react/jsx-runtime";
export var PickersActionBar = function PickersActionBar(props) {
  var onAccept = props.onAccept,
      onClear = props.onClear,
      onCancel = props.onCancel,
      onSetToday = props.onSetToday,
      actions = props.actions,
      other = _objectWithoutProperties(props, _excluded);

  var wrapperVariant = React.useContext(WrapperVariantContext);
  var localeText = useLocaleText();
  var actionsArray = typeof actions === 'function' ? actions(wrapperVariant) : actions;

  if (actionsArray == null || actionsArray.length === 0) {
    return null;
  }

  var buttons = actionsArray == null ? void 0 : actionsArray.map(function (actionType) {
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