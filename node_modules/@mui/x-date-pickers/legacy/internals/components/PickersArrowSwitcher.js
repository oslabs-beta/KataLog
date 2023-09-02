import _objectWithoutProperties from "@babel/runtime/helpers/esm/objectWithoutProperties";
import _extends from "@babel/runtime/helpers/esm/extends";
var _excluded = ["children", "className", "components", "componentsProps", "isLeftDisabled", "isLeftHidden", "isRightDisabled", "isRightHidden", "leftArrowButtonText", "onLeftClick", "onRightClick", "rightArrowButtonText"];
import * as React from 'react';
import clsx from 'clsx';
import Typography from '@mui/material/Typography';
import { useTheme, styled, useThemeProps } from '@mui/material/styles';
import { unstable_composeClasses as composeClasses } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import { ArrowLeft, ArrowRight } from './icons';
import { getPickersArrowSwitcherUtilityClass } from './pickersArrowSwitcherClasses';
import { jsx as _jsx } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";

var useUtilityClasses = function useUtilityClasses(ownerState) {
  var classes = ownerState.classes;
  var slots = {
    root: ['root'],
    spacer: ['spacer'],
    button: ['button']
  };
  return composeClasses(slots, getPickersArrowSwitcherUtilityClass, classes);
};

var PickersArrowSwitcherRoot = styled('div', {
  name: 'MuiPickersArrowSwitcher',
  slot: 'Root',
  overridesResolver: function overridesResolver(props, styles) {
    return styles.root;
  }
})({
  display: 'flex'
});
var PickersArrowSwitcherSpacer = styled('div', {
  name: 'MuiPickersArrowSwitcher',
  slot: 'Spacer',
  overridesResolver: function overridesResolver(props, styles) {
    return styles.spacer;
  }
})(function (_ref) {
  var theme = _ref.theme;
  return {
    width: theme.spacing(3)
  };
});
var PickersArrowSwitcherButton = styled(IconButton, {
  name: 'MuiPickersArrowSwitcher',
  slot: 'Button',
  overridesResolver: function overridesResolver(props, styles) {
    return styles.button;
  }
})(function (_ref2) {
  var ownerState = _ref2.ownerState;
  return _extends({}, ownerState.hidden && {
    visibility: 'hidden'
  });
});
export var PickersArrowSwitcher = /*#__PURE__*/React.forwardRef(function PickersArrowSwitcher(inProps, ref) {
  var props = useThemeProps({
    props: inProps,
    name: 'MuiPickersArrowSwitcher'
  });

  var children = props.children,
      className = props.className,
      components = props.components,
      componentsProps = props.componentsProps,
      isLeftDisabled = props.isLeftDisabled,
      isLeftHidden = props.isLeftHidden,
      isRightDisabled = props.isRightDisabled,
      isRightHidden = props.isRightHidden,
      leftArrowButtonText = props.leftArrowButtonText,
      onLeftClick = props.onLeftClick,
      onRightClick = props.onRightClick,
      rightArrowButtonText = props.rightArrowButtonText,
      other = _objectWithoutProperties(props, _excluded);

  var theme = useTheme();
  var isRtl = theme.direction === 'rtl';
  var leftArrowButtonProps = (componentsProps == null ? void 0 : componentsProps.leftArrowButton) || {};
  var LeftArrowIcon = (components == null ? void 0 : components.LeftArrowIcon) || ArrowLeft;
  var rightArrowButtonProps = (componentsProps == null ? void 0 : componentsProps.rightArrowButton) || {};
  var RightArrowIcon = (components == null ? void 0 : components.RightArrowIcon) || ArrowRight;
  var ownerState = props;
  var classes = useUtilityClasses(ownerState);
  return /*#__PURE__*/_jsxs(PickersArrowSwitcherRoot, _extends({
    ref: ref,
    className: clsx(classes.root, className),
    ownerState: ownerState
  }, other, {
    children: [/*#__PURE__*/_jsx(PickersArrowSwitcherButton, _extends({
      as: components == null ? void 0 : components.LeftArrowButton,
      size: "small",
      "aria-label": leftArrowButtonText,
      title: leftArrowButtonText,
      disabled: isLeftDisabled,
      edge: "end",
      onClick: onLeftClick
    }, leftArrowButtonProps, {
      className: clsx(classes.button, leftArrowButtonProps.className),
      ownerState: _extends({}, ownerState, leftArrowButtonProps, {
        hidden: isLeftHidden
      }),
      children: isRtl ? /*#__PURE__*/_jsx(RightArrowIcon, {}) : /*#__PURE__*/_jsx(LeftArrowIcon, {})
    })), children ? /*#__PURE__*/_jsx(Typography, {
      variant: "subtitle1",
      component: "span",
      children: children
    }) : /*#__PURE__*/_jsx(PickersArrowSwitcherSpacer, {
      className: classes.spacer,
      ownerState: ownerState
    }), /*#__PURE__*/_jsx(PickersArrowSwitcherButton, _extends({
      as: components == null ? void 0 : components.RightArrowButton,
      size: "small",
      "aria-label": rightArrowButtonText,
      title: rightArrowButtonText,
      edge: "start",
      disabled: isRightDisabled,
      onClick: onRightClick
    }, rightArrowButtonProps, {
      className: clsx(classes.button, rightArrowButtonProps.className),
      ownerState: _extends({}, ownerState, rightArrowButtonProps, {
        hidden: isRightHidden
      }),
      children: isRtl ? /*#__PURE__*/_jsx(LeftArrowIcon, {}) : /*#__PURE__*/_jsx(RightArrowIcon, {})
    }))]
  }));
});