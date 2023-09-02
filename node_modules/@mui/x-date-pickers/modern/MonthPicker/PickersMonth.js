import _objectWithoutPropertiesLoose from "@babel/runtime/helpers/esm/objectWithoutPropertiesLoose";
import _extends from "@babel/runtime/helpers/esm/extends";
const _excluded = ["disabled", "onSelect", "selected", "value", "tabIndex", "hasFocus", "onFocus", "onBlur"];
import * as React from 'react';
import Typography from '@mui/material/Typography';
import { styled, alpha } from '@mui/material/styles';
import { unstable_composeClasses as composeClasses } from '@mui/material';
import { unstable_useEnhancedEffect as useEnhancedEffect } from '@mui/material/utils';
import { onSpaceOrEnter } from '../internals/utils/utils';
import { getPickersMonthUtilityClass, pickersMonthClasses } from './pickersMonthClasses';
import { jsx as _jsx } from "react/jsx-runtime";

const useUtilityClasses = ownerState => {
  const {
    classes,
    selected
  } = ownerState;
  const slots = {
    root: ['root', selected && 'selected']
  };
  return composeClasses(slots, getPickersMonthUtilityClass, classes);
};

const PickersMonthRoot = styled(Typography, {
  name: 'PrivatePickersMonth',
  slot: 'Root',
  overridesResolver: (_, styles) => [styles.root, {
    [`&.${pickersMonthClasses.selected}`]: styles.selected
  }]
})(({
  theme
}) => _extends({
  flex: '1 0 33.33%',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  color: 'unset',
  backgroundColor: 'transparent',
  border: 0,
  outline: 0
}, theme.typography.subtitle1, {
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
  },
  [`&.${pickersMonthClasses.selected}`]: {
    color: theme.palette.primary.contrastText,
    backgroundColor: theme.palette.primary.main,
    '&:focus, &:hover': {
      backgroundColor: theme.palette.primary.dark
    }
  }
}));

const noop = () => {};
/**
 * @ignore - do not document.
 */


export const PickersMonth = props => {
  // TODO v6 add 'useThemeProps' once the component class names are aligned
  const {
    disabled,
    onSelect,
    selected,
    value,
    tabIndex,
    hasFocus,
    onFocus = noop,
    onBlur = noop
  } = props,
        other = _objectWithoutPropertiesLoose(props, _excluded);

  const classes = useUtilityClasses(props);

  const handleSelection = () => {
    onSelect(value);
  };

  const ref = React.useRef(null);
  useEnhancedEffect(() => {
    if (hasFocus) {
      ref.current?.focus();
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
    onFocus: event => onFocus(event, value),
    onBlur: event => onBlur(event, value)
  }, other));
};