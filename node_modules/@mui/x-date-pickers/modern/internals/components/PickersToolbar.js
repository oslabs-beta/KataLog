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

const useUtilityClasses = ownerState => {
  const {
    classes,
    isLandscape
  } = ownerState;
  const slots = {
    root: ['root'],
    content: ['content'],
    penIconButton: ['penIconButton', isLandscape && 'penIconButtonLandscape']
  };
  return composeClasses(slots, getPickersToolbarUtilityClass, classes);
};

const PickersToolbarRoot = styled('div', {
  name: 'MuiPickersToolbar',
  slot: 'Root',
  overridesResolver: (props, styles) => styles.root
})(({
  theme,
  ownerState
}) => _extends({
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
}));
const PickersToolbarContent = styled(Grid, {
  name: 'MuiPickersToolbar',
  slot: 'Content',
  overridesResolver: (props, styles) => styles.content
})(({
  ownerState
}) => _extends({
  flex: 1
}, !ownerState.isLandscape && {
  alignItems: 'center'
}));
const PickersToolbarPenIconButton = styled(IconButton, {
  name: 'MuiPickersToolbar',
  slot: 'PenIconButton',
  overridesResolver: (props, styles) => [{
    [`&.${pickersToolbarClasses.penIconButtonLandscape}`]: styles.penIconButtonLandscape
  }, styles.penIconButton]
})({});

const getViewTypeIcon = viewType => viewType === 'clock' ? /*#__PURE__*/_jsx(Clock, {
  color: "inherit"
}) : /*#__PURE__*/_jsx(Calendar, {
  color: "inherit"
});

export const PickersToolbar = /*#__PURE__*/React.forwardRef(function PickersToolbar(inProps, ref) {
  const props = useThemeProps({
    props: inProps,
    name: 'MuiPickersToolbar'
  });
  const {
    children,
    className,
    getMobileKeyboardInputViewButtonText,
    isLandscape,
    isMobileKeyboardViewOpen,
    landscapeDirection = 'column',
    toggleMobileKeyboardView,
    toolbarTitle,
    viewType = 'calendar'
  } = props;
  const ownerState = props;
  const localeText = useLocaleText();
  const classes = useUtilityClasses(ownerState);
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