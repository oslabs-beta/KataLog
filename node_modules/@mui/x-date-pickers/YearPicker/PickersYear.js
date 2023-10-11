import _objectWithoutPropertiesLoose from "@babel/runtime/helpers/esm/objectWithoutPropertiesLoose";
import _extends from "@babel/runtime/helpers/esm/extends";
const _excluded = ["autoFocus", "className", "children", "disabled", "onClick", "onKeyDown", "value", "tabIndex", "onFocus", "onBlur"];
import * as React from 'react';
import clsx from 'clsx';
import { useForkRef, capitalize } from '@mui/material/utils';
import { alpha, styled } from '@mui/material/styles';
import { unstable_composeClasses as composeClasses } from '@mui/material';
import { WrapperVariantContext } from '../internals/components/wrappers/WrapperVariantContext';
import { getPickersYearUtilityClass, pickersYearClasses } from './pickersYearClasses';
import { jsx as _jsx } from "react/jsx-runtime";

const useUtilityClasses = ownerState => {
  const {
    wrapperVariant,
    disabled,
    selected,
    classes
  } = ownerState;
  const slots = {
    root: ['root', wrapperVariant && `mode${capitalize(wrapperVariant)}`],
    yearButton: ['yearButton', disabled && 'disabled', selected && 'selected']
  };
  return composeClasses(slots, getPickersYearUtilityClass, classes);
};

const PickersYearRoot = styled('div', {
  name: 'PrivatePickersYear',
  slot: 'Root',
  overridesResolver: (_, styles) => [styles.root, {
    [`&.${pickersYearClasses.modeDesktop}`]: styles.modeDesktop
  }, {
    [`&.${pickersYearClasses.modeMobile}`]: styles.modeMobile
  }]
})(({
  ownerState
}) => _extends({
  flexBasis: '33.3%',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center'
}, (ownerState == null ? void 0 : ownerState.wrapperVariant) === 'desktop' && {
  flexBasis: '25%'
}));
const PickersYearButton = styled('button', {
  name: 'PrivatePickersYear',
  slot: 'Button',
  overridesResolver: (_, styles) => [styles.button, {
    [`&.${pickersYearClasses.disabled}`]: styles.disabled
  }, {
    [`&.${pickersYearClasses.selected}`]: styles.selected
  }]
})(({
  theme
}) => _extends({
  color: 'unset',
  backgroundColor: 'transparent',
  border: 0,
  outline: 0
}, theme.typography.subtitle1, {
  margin: '8px 0',
  height: 36,
  width: 72,
  borderRadius: 18,
  cursor: 'pointer',
  '&:focus, &:hover': {
    backgroundColor: alpha(theme.palette.action.active, theme.palette.action.hoverOpacity)
  },
  [`&.${pickersYearClasses.disabled}`]: {
    color: theme.palette.text.secondary
  },
  [`&.${pickersYearClasses.selected}`]: {
    color: theme.palette.primary.contrastText,
    backgroundColor: theme.palette.primary.main,
    '&:focus, &:hover': {
      backgroundColor: theme.palette.primary.dark
    }
  }
}));

const noop = () => {};
/**
 * @ignore - internal component.
 */


export const PickersYear = /*#__PURE__*/React.forwardRef(function PickersYear(props, forwardedRef) {
  // TODO v6: add 'useThemeProps' once the component class names are aligned
  const {
    autoFocus,
    className,
    children,
    disabled,
    onClick,
    onKeyDown,
    value,
    tabIndex,
    onFocus = noop,
    onBlur = noop
  } = props,
        other = _objectWithoutPropertiesLoose(props, _excluded);

  const ref = React.useRef(null);
  const refHandle = useForkRef(ref, forwardedRef);
  const wrapperVariant = React.useContext(WrapperVariantContext);

  const ownerState = _extends({}, props, {
    wrapperVariant
  });

  const classes = useUtilityClasses(ownerState); // We can't forward the `autoFocus` to the button because it is a native button, not a MUI Button

  React.useEffect(() => {
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
      onClick: event => onClick(event, value),
      onKeyDown: event => onKeyDown(event, value),
      onFocus: event => onFocus(event, value),
      onBlur: event => onBlur(event, value),
      className: classes.yearButton,
      ownerState: ownerState
    }, other, {
      children: children
    }))
  });
});