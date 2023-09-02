import _defineProperty from "@babel/runtime/helpers/esm/defineProperty";
import _extends from "@babel/runtime/helpers/esm/extends";
import * as React from 'react';
import clsx from 'clsx';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import { styled, useThemeProps } from '@mui/material/styles';
import { unstable_composeClasses as composeClasses } from '@mui/material';
import { Pen, Calendar, Clock } from './icons';
import { useLocaleText } from '../hooks/useUtils';
import { getPickersToolbarUtilityClass, pickersToolbarClasses } from './pickersToolbarClasses';
import { jsx as _jsx } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";

var useUtilityClasses = function useUtilityClasses(ownerState) {
  var classes = ownerState.classes,
      isLandscape = ownerState.isLandscape;
  var slots = {
    root: ['root'],
    content: ['content'],
    penIconButton: ['penIconButton', isLandscape && 'penIconButtonLandscape']
  };
  return composeClasses(slots, getPickersToolbarUtilityClass, classes);
};

var PickersToolbarRoot = styled('div', {
  name: 'MuiPickersToolbar',
  slot: 'Root',
  overridesResolver: function overridesResolver(props, styles) {
    return styles.root;
  }
})(function (_ref) {
  var theme = _ref.theme,
      ownerState = _ref.ownerState;
  return _extends({
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    padding: theme.spacing(2, 3)
  }, ownerState.isLandscape && {
    height: 'auto',
    maxWidth: 160,
    padding: 16,
    justifyContent: 'flex-start',
    flexWrap: 'wrap'
  });
});
var PickersToolbarContent = styled(Grid, {
  name: 'MuiPickersToolbar',
  slot: 'Content',
  overridesResolver: function overridesResolver(props, styles) {
    return styles.content;
  }
})(function (_ref2) {
  var ownerState = _ref2.ownerState;
  return _extends({
    flex: 1
  }, !ownerState.isLandscape && {
    alignItems: 'center'
  });
});
var PickersToolbarPenIconButton = styled(IconButton, {
  name: 'MuiPickersToolbar',
  slot: 'PenIconButton',
  overridesResolver: function overridesResolver(props, styles) {
    return [_defineProperty({}, "&.".concat(pickersToolbarClasses.penIconButtonLandscape), styles.penIconButtonLandscape), styles.penIconButton];
  }
})({});

var getViewTypeIcon = function getViewTypeIcon(viewType) {
  return viewType === 'clock' ? /*#__PURE__*/_jsx(Clock, {
    color: "inherit"
  }) : /*#__PURE__*/_jsx(Calendar, {
    color: "inherit"
  });
};

export var PickersToolbar = /*#__PURE__*/React.forwardRef(function PickersToolbar(inProps, ref) {
  var props = useThemeProps({
    props: inProps,
    name: 'MuiPickersToolbar'
  });
  var children = props.children,
      className = props.className,
      getMobileKeyboardInputViewButtonText = props.getMobileKeyboardInputViewButtonText,
      isLandscape = props.isLandscape,
      isMobileKeyboardViewOpen = props.isMobileKeyboardViewOpen,
      _props$landscapeDirec = props.landscapeDirection,
      landscapeDirection = _props$landscapeDirec === void 0 ? 'column' : _props$landscapeDirec,
      toggleMobileKeyboardView = props.toggleMobileKeyboardView,
      toolbarTitle = props.toolbarTitle,
      _props$viewType = props.viewType,
      viewType = _props$viewType === void 0 ? 'calendar' : _props$viewType;
  var ownerState = props;
  var localeText = useLocaleText();
  var classes = useUtilityClasses(ownerState);
  return /*#__PURE__*/_jsxs(PickersToolbarRoot, {
    ref: ref,
    className: clsx(classes.root, className),
    ownerState: ownerState,
    children: [/*#__PURE__*/_jsx(Typography, {
      color: "text.secondary",
      variant: "overline",
      children: toolbarTitle
    }), /*#__PURE__*/_jsxs(PickersToolbarContent, {
      container: true,
      justifyContent: "space-between",
      className: classes.content,
      ownerState: ownerState,
      direction: isLandscape ? landscapeDirection : 'row',
      alignItems: isLandscape ? 'flex-start' : 'flex-end',
      children: [children, /*#__PURE__*/_jsx(PickersToolbarPenIconButton, {
        onClick: toggleMobileKeyboardView,
        className: classes.penIconButton,
        ownerState: ownerState,
        color: "inherit",
        "aria-label": getMobileKeyboardInputViewButtonText ? getMobileKeyboardInputViewButtonText(isMobileKeyboardViewOpen, viewType) : localeText.inputModeToggleButtonAriaLabel(isMobileKeyboardViewOpen, viewType),
        children: isMobileKeyboardViewOpen ? getViewTypeIcon(viewType) : /*#__PURE__*/_jsx(Pen, {
          color: "inherit"
        })
      })]
    })]
  });
});