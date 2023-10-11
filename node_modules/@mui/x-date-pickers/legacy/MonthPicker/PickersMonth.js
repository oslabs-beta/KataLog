import _objectWithoutProperties from "@babel/runtime/helpers/esm/objectWithoutProperties";
import _extends from "@babel/runtime/helpers/esm/extends";
import _defineProperty from "@babel/runtime/helpers/esm/defineProperty";
var _excluded = ["disabled", "onSelect", "selected", "value", "tabIndex", "hasFocus", "onFocus", "onBlur"];
import * as React from 'react';
import Typography from '@mui/material/Typography';
import { styled, alpha } from '@mui/material/styles';
import { unstable_composeClasses as composeClasses } from '@mui/material';
import { unstable_useEnhancedEffect as useEnhancedEffect } from '@mui/material/utils';
import { onSpaceOrEnter } from '../internals/utils/utils';
import { getPickersMonthUtilityClass, pickersMonthClasses } from './pickersMonthClasses';
import { jsx as _jsx } from "react/jsx-runtime";

var useUtilityClasses = function useUtilityClasses(ownerState) {
  var classes = ownerState.classes,
      selected = ownerState.selected;
  var slots = {
    root: ['root', selected && 'selected']
  };
  return composeClasses(slots, getPickersMonthUtilityClass, classes);
};

var PickersMonthRoot = styled(Typography, {
  name: 'PrivatePickersMonth',
  slot: 'Root',
  overridesResolver: function overridesResolver(_, styles) {
    return [styles.root, _defineProperty({}, "&.".concat(pickersMonthClasses.selected), styles.selected)];
  }
})(function (_ref2) {
  var theme = _ref2.theme;
  return _extends({
    flex: '1 0 33.33%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: 'unset',
    backgroundColor: 'transparent',
    border: 0,
    outline: 0
  }, theme.typography.subtitle1, _defineProperty({
    margin: '8px 0',
    height: 36,
    borderRadius: 18,
    cursor: 'pointer',
    '&:focus, &:hover': {
      backgroundColor: alpha(theme.palette.action.active, theme.palette.action.hoverOpacity)
    },
    '&:disabled': {
      pointerEvents: 'none',
      color: theme.palette.text.secondary
    }
  }, "&.".concat(pickersMonthClasses.selected), {
    color: theme.palette.primary.contrastText,
    backgroundColor: theme.palette.primary.main,
    '&:focus, &:hover': {
      backgroundColor: theme.palette.primary.dark
    }
  }));
});

var noop = function noop() {};
/**
 * @ignore - do not document.
 */


export var PickersMonth = function PickersMonth(props) {
  // TODO v6 add 'useThemeProps' once the component class names are aligned
  var disabled = props.disabled,
      onSelect = props.onSelect,
      selected = props.selected,
      value = props.value,
      tabIndex = props.tabIndex,
      hasFocus = props.hasFocus,
      _props$onFocus = props.onFocus,
      _onFocus = _props$onFocus === void 0 ? noop : _props$onFocus,
      _props$onBlur = props.onBlur,
      _onBlur = _props$onBlur === void 0 ? noop : _props$onBlur,
      other = _objectWithoutProperties(props, _excluded);

  var classes = useUtilityClasses(props);

  var handleSelection = function handleSelection() {
    onSelect(value);
  };

  var ref = React.useRef(null);
  useEnhancedEffect(function () {
    if (hasFocus) {
      var _ref$current;

      (_ref$current = ref.current) == null ? void 0 : _ref$current.focus();
    }
  }, [hasFocus]);
  return /*#__PURE__*/_jsx(PickersMonthRoot, _extends({
    ref: ref,
    component: "button",
    type: "button",
    className: classes.root,
    tabIndex: tabIndex,
    onClick: handleSelection,
    onKeyDown: onSpaceOrEnter(handleSelection),
    color: selected ? 'primary' : undefined,
    variant: selected ? 'h5' : 'subtitle1',
    disabled: disabled,
    onFocus: function onFocus(event) {
      return _onFocus(event, value);
    },
    onBlur: function onBlur(event) {
      return _onBlur(event, value);
    }
  }, other));
};