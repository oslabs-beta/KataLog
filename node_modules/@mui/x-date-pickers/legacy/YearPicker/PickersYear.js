import _objectWithoutProperties from "@babel/runtime/helpers/esm/objectWithoutProperties";
import _extends from "@babel/runtime/helpers/esm/extends";
import _defineProperty from "@babel/runtime/helpers/esm/defineProperty";
var _excluded = ["autoFocus", "className", "children", "disabled", "onClick", "onKeyDown", "value", "tabIndex", "onFocus", "onBlur"];
import * as React from 'react';
import clsx from 'clsx';
import { useForkRef, capitalize } from '@mui/material/utils';
import { alpha, styled } from '@mui/material/styles';
import { unstable_composeClasses as composeClasses } from '@mui/material';
import { WrapperVariantContext } from '../internals/components/wrappers/WrapperVariantContext';
import { getPickersYearUtilityClass, pickersYearClasses } from './pickersYearClasses';
import { jsx as _jsx } from "react/jsx-runtime";

var useUtilityClasses = function useUtilityClasses(ownerState) {
  var wrapperVariant = ownerState.wrapperVariant,
      disabled = ownerState.disabled,
      selected = ownerState.selected,
      classes = ownerState.classes;
  var slots = {
    root: ['root', wrapperVariant && "mode".concat(capitalize(wrapperVariant))],
    yearButton: ['yearButton', disabled && 'disabled', selected && 'selected']
  };
  return composeClasses(slots, getPickersYearUtilityClass, classes);
};

var PickersYearRoot = styled('div', {
  name: 'PrivatePickersYear',
  slot: 'Root',
  overridesResolver: function overridesResolver(_, styles) {
    return [styles.root, _defineProperty({}, "&.".concat(pickersYearClasses.modeDesktop), styles.modeDesktop), _defineProperty({}, "&.".concat(pickersYearClasses.modeMobile), styles.modeMobile)];
  }
})(function (_ref3) {
  var ownerState = _ref3.ownerState;
  return _extends({
    flexBasis: '33.3%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  }, (ownerState == null ? void 0 : ownerState.wrapperVariant) === 'desktop' && {
    flexBasis: '25%'
  });
});
var PickersYearButton = styled('button', {
  name: 'PrivatePickersYear',
  slot: 'Button',
  overridesResolver: function overridesResolver(_, styles) {
    return [styles.button, _defineProperty({}, "&.".concat(pickersYearClasses.disabled), styles.disabled), _defineProperty({}, "&.".concat(pickersYearClasses.selected), styles.selected)];
  }
})(function (_ref6) {
  var _extends2;

  var theme = _ref6.theme;
  return _extends({
    color: 'unset',
    backgroundColor: 'transparent',
    border: 0,
    outline: 0
  }, theme.typography.subtitle1, (_extends2 = {
    margin: '8px 0',
    height: 36,
    width: 72,
    borderRadius: 18,
    cursor: 'pointer',
    '&:focus, &:hover': {
      backgroundColor: alpha(theme.palette.action.active, theme.palette.action.hoverOpacity)
    }
  }, _defineProperty(_extends2, "&.".concat(pickersYearClasses.disabled), {
    color: theme.palette.text.secondary
  }), _defineProperty(_extends2, "&.".concat(pickersYearClasses.selected), {
    color: theme.palette.primary.contrastText,
    backgroundColor: theme.palette.primary.main,
    '&:focus, &:hover': {
      backgroundColor: theme.palette.primary.dark
    }
  }), _extends2));
});

var noop = function noop() {};
/**
 * @ignore - internal component.
 */


export var PickersYear = /*#__PURE__*/React.forwardRef(function PickersYear(props, forwardedRef) {
  // TODO v6: add 'useThemeProps' once the component class names are aligned
  var autoFocus = props.autoFocus,
      className = props.className,
      children = props.children,
      disabled = props.disabled,
      _onClick = props.onClick,
      _onKeyDown = props.onKeyDown,
      value = props.value,
      tabIndex = props.tabIndex,
      _props$onFocus = props.onFocus,
      _onFocus = _props$onFocus === void 0 ? noop : _props$onFocus,
      _props$onBlur = props.onBlur,
      _onBlur = _props$onBlur === void 0 ? noop : _props$onBlur,
      other = _objectWithoutProperties(props, _excluded);

  var ref = React.useRef(null);
  var refHandle = useForkRef(ref, forwardedRef);
  var wrapperVariant = React.useContext(WrapperVariantContext);

  var ownerState = _extends({}, props, {
    wrapperVariant: wrapperVariant
  });

  var classes = useUtilityClasses(ownerState); // We can't forward the `autoFocus` to the button because it is a native button, not a MUI Button

  React.useEffect(function () {
    if (autoFocus) {
      // `ref.current` being `null` would be a bug in MUI.
      ref.current.focus();
    }
  }, [autoFocus]);
  return /*#__PURE__*/_jsx(PickersYearRoot, {
    className: clsx(classes.root, className),
    ownerState: ownerState,
    children: /*#__PURE__*/_jsx(PickersYearButton, _extends({
      ref: refHandle,
      disabled: disabled,
      type: "button",
      tabIndex: disabled ? -1 : tabIndex,
      onClick: function onClick(event) {
        return _onClick(event, value);
      },
      onKeyDown: function onKeyDown(event) {
        return _onKeyDown(event, value);
      },
      onFocus: function onFocus(event) {
        return _onFocus(event, value);
      },
      onBlur: function onBlur(event) {
        return _onBlur(event, value);
      },
      className: classes.yearButton,
      ownerState: ownerState
    }, other, {
      children: children
    }))
  });
});