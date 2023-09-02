import _objectWithoutProperties from "@babel/runtime/helpers/esm/objectWithoutProperties";
import _defineProperty from "@babel/runtime/helpers/esm/defineProperty";
import _extends from "@babel/runtime/helpers/esm/extends";
var _excluded = ["autoFocus", "className", "day", "disabled", "disableHighlightToday", "disableMargin", "hidden", "isAnimating", "onClick", "onDaySelect", "onFocus", "onBlur", "onKeyDown", "onMouseDown", "outsideCurrentMonth", "selected", "showDaysOutsideCurrentMonth", "children", "today"];
import * as React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import ButtonBase from '@mui/material/ButtonBase';
import { unstable_useEnhancedEffect as useEnhancedEffect } from '@mui/utils';
import { unstable_composeClasses as composeClasses } from '@mui/material';
import { alpha, styled, useThemeProps } from '@mui/material/styles';
import { useForkRef } from '@mui/material/utils';
import { useUtils } from '../internals/hooks/useUtils';
import { DAY_SIZE, DAY_MARGIN } from '../internals/constants/dimensions';
import { getPickersDayUtilityClass, pickersDayClasses } from './pickersDayClasses';
import { jsx as _jsx } from "react/jsx-runtime";

var useUtilityClasses = function useUtilityClasses(ownerState) {
  var selected = ownerState.selected,
      disableMargin = ownerState.disableMargin,
      disableHighlightToday = ownerState.disableHighlightToday,
      today = ownerState.today,
      disabled = ownerState.disabled,
      outsideCurrentMonth = ownerState.outsideCurrentMonth,
      showDaysOutsideCurrentMonth = ownerState.showDaysOutsideCurrentMonth,
      classes = ownerState.classes;
  var slots = {
    root: ['root', selected && 'selected', disabled && 'disabled', !disableMargin && 'dayWithMargin', !disableHighlightToday && today && 'today', outsideCurrentMonth && showDaysOutsideCurrentMonth && 'dayOutsideMonth', outsideCurrentMonth && !showDaysOutsideCurrentMonth && 'hiddenDaySpacingFiller'],
    hiddenDaySpacingFiller: ['hiddenDaySpacingFiller']
  };
  return composeClasses(slots, getPickersDayUtilityClass, classes);
};

var styleArg = function styleArg(_ref) {
  var _extends2;

  var theme = _ref.theme,
      ownerState = _ref.ownerState;
  return _extends({}, theme.typography.caption, (_extends2 = {
    width: DAY_SIZE,
    height: DAY_SIZE,
    borderRadius: '50%',
    padding: 0,
    // background required here to prevent collides with the other days when animating with transition group
    backgroundColor: theme.palette.background.paper,
    color: theme.palette.text.primary,
    '&:hover': {
      backgroundColor: alpha(theme.palette.action.active, theme.palette.action.hoverOpacity)
    },
    '&:focus': _defineProperty({
      backgroundColor: alpha(theme.palette.action.active, theme.palette.action.hoverOpacity)
    }, "&.".concat(pickersDayClasses.selected), {
      willChange: 'background-color',
      backgroundColor: theme.palette.primary.dark
    })
  }, _defineProperty(_extends2, "&.".concat(pickersDayClasses.selected), {
    color: theme.palette.primary.contrastText,
    backgroundColor: theme.palette.primary.main,
    fontWeight: theme.typography.fontWeightMedium,
    transition: theme.transitions.create('background-color', {
      duration: theme.transitions.duration.short
    }),
    '&:hover': {
      willChange: 'background-color',
      backgroundColor: theme.palette.primary.dark
    }
  }), _defineProperty(_extends2, "&.".concat(pickersDayClasses.disabled), {
    color: theme.palette.text.disabled
  }), _extends2), !ownerState.disableMargin && {
    margin: "0 ".concat(DAY_MARGIN, "px")
  }, ownerState.outsideCurrentMonth && ownerState.showDaysOutsideCurrentMonth && {
    color: theme.palette.text.secondary
  }, !ownerState.disableHighlightToday && ownerState.today && _defineProperty({}, "&:not(.".concat(pickersDayClasses.selected, ")"), {
    border: "1px solid ".concat(theme.palette.text.secondary)
  }));
};

var overridesResolver = function overridesResolver(props, styles) {
  var ownerState = props.ownerState;
  return [styles.root, !ownerState.disableMargin && styles.dayWithMargin, !ownerState.disableHighlightToday && ownerState.today && styles.today, !ownerState.outsideCurrentMonth && ownerState.showDaysOutsideCurrentMonth && styles.dayOutsideMonth, ownerState.outsideCurrentMonth && !ownerState.showDaysOutsideCurrentMonth && styles.hiddenDaySpacingFiller];
};

var PickersDayRoot = styled(ButtonBase, {
  name: 'MuiPickersDay',
  slot: 'Root',
  overridesResolver: overridesResolver
})(styleArg);
var PickersDayFiller = styled('div', {
  name: 'MuiPickersDay',
  slot: 'Root',
  overridesResolver: overridesResolver
})(function (_ref3) {
  var theme = _ref3.theme,
      ownerState = _ref3.ownerState;
  return _extends({}, styleArg({
    theme: theme,
    ownerState: ownerState
  }), {
    // visibility: 'hidden' does not work here as it hides the element from screen readers as well
    opacity: 0,
    pointerEvents: 'none'
  });
});

var noop = function noop() {};

var PickersDayRaw = /*#__PURE__*/React.forwardRef(function PickersDay(inProps, forwardedRef) {
  var props = useThemeProps({
    props: inProps,
    name: 'MuiPickersDay'
  });

  var _props$autoFocus = props.autoFocus,
      autoFocus = _props$autoFocus === void 0 ? false : _props$autoFocus,
      className = props.className,
      day = props.day,
      _props$disabled = props.disabled,
      disabled = _props$disabled === void 0 ? false : _props$disabled,
      _props$disableHighlig = props.disableHighlightToday,
      disableHighlightToday = _props$disableHighlig === void 0 ? false : _props$disableHighlig,
      _props$disableMargin = props.disableMargin,
      disableMargin = _props$disableMargin === void 0 ? false : _props$disableMargin,
      hidden = props.hidden,
      isAnimating = props.isAnimating,
      onClick = props.onClick,
      onDaySelect = props.onDaySelect,
      _props$onFocus = props.onFocus,
      _onFocus = _props$onFocus === void 0 ? noop : _props$onFocus,
      _props$onBlur = props.onBlur,
      _onBlur = _props$onBlur === void 0 ? noop : _props$onBlur,
      _props$onKeyDown = props.onKeyDown,
      _onKeyDown = _props$onKeyDown === void 0 ? noop : _props$onKeyDown,
      onMouseDown = props.onMouseDown,
      outsideCurrentMonth = props.outsideCurrentMonth,
      _props$selected = props.selected,
      selected = _props$selected === void 0 ? false : _props$selected,
      _props$showDaysOutsid = props.showDaysOutsideCurrentMonth,
      showDaysOutsideCurrentMonth = _props$showDaysOutsid === void 0 ? false : _props$showDaysOutsid,
      children = props.children,
      _props$today = props.today,
      isToday = _props$today === void 0 ? false : _props$today,
      other = _objectWithoutProperties(props, _excluded);

  var ownerState = _extends({}, props, {
    autoFocus: autoFocus,
    disabled: disabled,
    disableHighlightToday: disableHighlightToday,
    disableMargin: disableMargin,
    selected: selected,
    showDaysOutsideCurrentMonth: showDaysOutsideCurrentMonth,
    today: isToday
  });

  var classes = useUtilityClasses(ownerState);
  var utils = useUtils();
  var ref = React.useRef(null);
  var handleRef = useForkRef(ref, forwardedRef); // Since this is rendered when a Popper is opened we can't use passive effects.
  // Focusing in passive effects in Popper causes scroll jump.

  useEnhancedEffect(function () {
    if (autoFocus && !disabled && !isAnimating && !outsideCurrentMonth) {
      // ref.current being null would be a bug in MUI
      ref.current.focus();
    }
  }, [autoFocus, disabled, isAnimating, outsideCurrentMonth]); // For day outside of current month, move focus from mouseDown to mouseUp
  // Goal: have the onClick ends before sliding to the new month

  var handleMouseDown = function handleMouseDown(event) {
    if (onMouseDown) {
      onMouseDown(event);
    }

    if (outsideCurrentMonth) {
      event.preventDefault();
    }
  };

  var handleClick = function handleClick(event) {
    if (!disabled) {
      onDaySelect(day, 'finish');
    }

    if (outsideCurrentMonth) {
      event.currentTarget.focus();
    }

    if (onClick) {
      onClick(event);
    }
  };

  if (outsideCurrentMonth && !showDaysOutsideCurrentMonth) {
    return /*#__PURE__*/_jsx(PickersDayFiller, {
      className: clsx(classes.root, classes.hiddenDaySpacingFiller, className),
      ownerState: ownerState,
      role: other.role
    });
  }

  return /*#__PURE__*/_jsx(PickersDayRoot, _extends({
    className: clsx(classes.root, className),
    ownerState: ownerState,
    ref: handleRef,
    centerRipple: true,
    disabled: disabled,
    tabIndex: selected ? 0 : -1,
    onKeyDown: function onKeyDown(event) {
      return _onKeyDown(event, day);
    },
    onFocus: function onFocus(event) {
      return _onFocus(event, day);
    },
    onBlur: function onBlur(event) {
      return _onBlur(event, day);
    },
    onClick: handleClick,
    onMouseDown: handleMouseDown
  }, other, {
    children: !children ? utils.format(day, 'dayOfMonth') : children
  }));
});
export var areDayPropsEqual = function areDayPropsEqual(prevProps, nextProps) {
  return prevProps.autoFocus === nextProps.autoFocus && prevProps.isAnimating === nextProps.isAnimating && prevProps.today === nextProps.today && prevProps.disabled === nextProps.disabled && prevProps.selected === nextProps.selected && prevProps.disableMargin === nextProps.disableMargin && prevProps.showDaysOutsideCurrentMonth === nextProps.showDaysOutsideCurrentMonth && prevProps.disableHighlightToday === nextProps.disableHighlightToday && prevProps.className === nextProps.className && prevProps.sx === nextProps.sx && prevProps.outsideCurrentMonth === nextProps.outsideCurrentMonth && prevProps.onFocus === nextProps.onFocus && prevProps.onBlur === nextProps.onBlur && prevProps.onDaySelect === nextProps.onDaySelect;
};
process.env.NODE_ENV !== "production" ? PickersDayRaw.propTypes = {
  // ----------------------------- Warning --------------------------------
  // | These PropTypes are generated from the TypeScript type definitions |
  // | To update them edit the TypeScript types and run "yarn proptypes"  |
  // ----------------------------------------------------------------------

  /**
   * Override or extend the styles applied to the component.
   */
  classes: PropTypes.object,

  /**
   * The date to show.
   */
  day: PropTypes.any.isRequired,

  /**
   * If `true`, renders as disabled.
   * @default false
   */
  disabled: PropTypes.bool,

  /**
   * If `true`, today's date is rendering without highlighting with circle.
   * @default false
   */
  disableHighlightToday: PropTypes.bool,

  /**
   * If `true`, days are rendering without margin. Useful for displaying linked range of days.
   * @default false
   */
  disableMargin: PropTypes.bool,
  isAnimating: PropTypes.bool,
  onBlur: PropTypes.func,
  onDaySelect: PropTypes.func.isRequired,
  onFocus: PropTypes.func,
  onKeyDown: PropTypes.func,

  /**
   * If `true`, day is outside of month and will be hidden.
   */
  outsideCurrentMonth: PropTypes.bool.isRequired,

  /**
   * If `true`, renders as selected.
   * @default false
   */
  selected: PropTypes.bool,

  /**
   * If `true`, days that have `outsideCurrentMonth={true}` are displayed.
   * @default false
   */
  showDaysOutsideCurrentMonth: PropTypes.bool,

  /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.func, PropTypes.object, PropTypes.bool])), PropTypes.func, PropTypes.object]),

  /**
   * If `true`, renders as today date.
   * @default false
   */
  today: PropTypes.bool
} : void 0;
/**
 *
 * Demos:
 *
 * - [Date Picker](https://mui.com/x/react-date-pickers/date-picker/)
 *
 * API:
 *
 * - [PickersDay API](https://mui.com/x/api/date-pickers/pickers-day/)
 */

export var PickersDay = /*#__PURE__*/React.memo(PickersDayRaw, areDayPropsEqual);