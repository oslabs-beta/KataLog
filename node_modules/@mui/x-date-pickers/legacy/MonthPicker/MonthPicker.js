import _slicedToArray from "@babel/runtime/helpers/esm/slicedToArray";
import _objectWithoutProperties from "@babel/runtime/helpers/esm/objectWithoutProperties";
import _extends from "@babel/runtime/helpers/esm/extends";
var _excluded = ["className", "date", "disabled", "disableFuture", "disablePast", "maxDate", "minDate", "onChange", "shouldDisableMonth", "readOnly", "disableHighlightToday", "autoFocus", "onMonthFocus", "hasFocus", "onFocusedViewChange"];
import * as React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { useTheme } from '@mui/system';
import { styled, useThemeProps } from '@mui/material/styles';
import { unstable_composeClasses as composeClasses, useControlled, useEventCallback } from '@mui/material';
import { PickersMonth } from './PickersMonth';
import { useUtils, useNow, useDefaultDates } from '../internals/hooks/useUtils';
import { getMonthPickerUtilityClass } from './monthPickerClasses';
import { parseNonNullablePickerDate } from '../internals/utils/date-utils';
import { jsx as _jsx } from "react/jsx-runtime";

var useUtilityClasses = function useUtilityClasses(ownerState) {
  var classes = ownerState.classes;
  var slots = {
    root: ['root']
  };
  return composeClasses(slots, getMonthPickerUtilityClass, classes);
};

export function useMonthPickerDefaultizedProps(props, name) {
  var utils = useUtils();
  var defaultDates = useDefaultDates();
  var themeProps = useThemeProps({
    props: props,
    name: name
  });
  return _extends({
    disableFuture: false,
    disablePast: false
  }, themeProps, {
    minDate: parseNonNullablePickerDate(utils, themeProps.minDate, defaultDates.minDate),
    maxDate: parseNonNullablePickerDate(utils, themeProps.maxDate, defaultDates.maxDate)
  });
}
var MonthPickerRoot = styled('div', {
  name: 'MuiMonthPicker',
  slot: 'Root',
  overridesResolver: function overridesResolver(props, styles) {
    return styles.root;
  }
})({
  width: 310,
  display: 'flex',
  flexWrap: 'wrap',
  alignContent: 'stretch',
  margin: '0 4px'
});
export var MonthPicker = /*#__PURE__*/React.forwardRef(function MonthPicker(inProps, ref) {
  var utils = useUtils();
  var now = useNow();
  var props = useMonthPickerDefaultizedProps(inProps, 'MuiMonthPicker');

  var className = props.className,
      date = props.date,
      disabled = props.disabled,
      disableFuture = props.disableFuture,
      disablePast = props.disablePast,
      maxDate = props.maxDate,
      minDate = props.minDate,
      onChange = props.onChange,
      shouldDisableMonth = props.shouldDisableMonth,
      readOnly = props.readOnly,
      disableHighlightToday = props.disableHighlightToday,
      _props$autoFocus = props.autoFocus,
      autoFocus = _props$autoFocus === void 0 ? false : _props$autoFocus,
      onMonthFocus = props.onMonthFocus,
      hasFocus = props.hasFocus,
      onFocusedViewChange = props.onFocusedViewChange,
      other = _objectWithoutProperties(props, _excluded);

  var ownerState = props;
  var classes = useUtilityClasses(ownerState);
  var theme = useTheme();
  var selectedDateOrStartOfMonth = React.useMemo(function () {
    return date != null ? date : utils.startOfMonth(now);
  }, [now, utils, date]);
  var selectedMonth = React.useMemo(function () {
    if (date != null) {
      return utils.getMonth(date);
    }

    if (disableHighlightToday) {
      return null;
    }

    return utils.getMonth(now);
  }, [now, date, utils, disableHighlightToday]);

  var _React$useState = React.useState(function () {
    return selectedMonth || utils.getMonth(now);
  }),
      _React$useState2 = _slicedToArray(_React$useState, 2),
      focusedMonth = _React$useState2[0],
      setFocusedMonth = _React$useState2[1];

  var isMonthDisabled = React.useCallback(function (month) {
    var firstEnabledMonth = utils.startOfMonth(disablePast && utils.isAfter(now, minDate) ? now : minDate);
    var lastEnabledMonth = utils.startOfMonth(disableFuture && utils.isBefore(now, maxDate) ? now : maxDate);

    if (utils.isBefore(month, firstEnabledMonth)) {
      return true;
    }

    if (utils.isAfter(month, lastEnabledMonth)) {
      return true;
    }

    if (!shouldDisableMonth) {
      return false;
    }

    return shouldDisableMonth(month);
  }, [disableFuture, disablePast, maxDate, minDate, now, shouldDisableMonth, utils]);

  var onMonthSelect = function onMonthSelect(month) {
    if (readOnly) {
      return;
    }

    var newDate = utils.setMonth(selectedDateOrStartOfMonth, month);
    onChange(newDate, 'finish');
  };

  var _useControlled = useControlled({
    name: 'MonthPicker',
    state: 'hasFocus',
    controlled: hasFocus,
    default: autoFocus
  }),
      _useControlled2 = _slicedToArray(_useControlled, 2),
      internalHasFocus = _useControlled2[0],
      setInternalHasFocus = _useControlled2[1];

  var changeHasFocus = React.useCallback(function (newHasFocus) {
    setInternalHasFocus(newHasFocus);

    if (onFocusedViewChange) {
      onFocusedViewChange(newHasFocus);
    }
  }, [setInternalHasFocus, onFocusedViewChange]);
  var focusMonth = React.useCallback(function (month) {
    if (!isMonthDisabled(utils.setMonth(selectedDateOrStartOfMonth, month))) {
      setFocusedMonth(month);
      changeHasFocus(true);

      if (onMonthFocus) {
        onMonthFocus(month);
      }
    }
  }, [isMonthDisabled, utils, selectedDateOrStartOfMonth, changeHasFocus, onMonthFocus]);
  React.useEffect(function () {
    setFocusedMonth(function (prevFocusedMonth) {
      return selectedMonth !== null && prevFocusedMonth !== selectedMonth ? selectedMonth : prevFocusedMonth;
    });
  }, [selectedMonth]);
  var handleKeyDown = useEventCallback(function (event) {
    var monthsInYear = 12;
    var monthsInRow = 3;

    switch (event.key) {
      case 'ArrowUp':
        focusMonth((monthsInYear + focusedMonth - monthsInRow) % monthsInYear);
        event.preventDefault();
        break;

      case 'ArrowDown':
        focusMonth((monthsInYear + focusedMonth + monthsInRow) % monthsInYear);
        event.preventDefault();
        break;

      case 'ArrowLeft':
        focusMonth((monthsInYear + focusedMonth + (theme.direction === 'ltr' ? -1 : 1)) % monthsInYear);
        event.preventDefault();
        break;

      case 'ArrowRight':
        focusMonth((monthsInYear + focusedMonth + (theme.direction === 'ltr' ? 1 : -1)) % monthsInYear);
        event.preventDefault();
        break;

      default:
        break;
    }
  });
  var handleMonthFocus = React.useCallback(function (event, month) {
    focusMonth(month);
  }, [focusMonth]);
  var handleMonthBlur = React.useCallback(function () {
    changeHasFocus(false);
  }, [changeHasFocus]);
  var currentMonthNumber = utils.getMonth(now);
  return /*#__PURE__*/_jsx(MonthPickerRoot, _extends({
    ref: ref,
    className: clsx(classes.root, className),
    ownerState: ownerState,
    onKeyDown: handleKeyDown
  }, other, {
    children: utils.getMonthArray(selectedDateOrStartOfMonth).map(function (month) {
      var monthNumber = utils.getMonth(month);
      var monthText = utils.format(month, 'monthShort');
      var isDisabled = disabled || isMonthDisabled(month);
      return /*#__PURE__*/_jsx(PickersMonth, {
        value: monthNumber,
        selected: monthNumber === selectedMonth,
        tabIndex: monthNumber === focusedMonth && !isDisabled ? 0 : -1,
        hasFocus: internalHasFocus && monthNumber === focusedMonth,
        onSelect: onMonthSelect,
        onFocus: handleMonthFocus,
        onBlur: handleMonthBlur,
        disabled: isDisabled,
        "aria-current": currentMonthNumber === monthNumber ? 'date' : undefined,
        children: monthText
      }, monthText);
    })
  }));
});
process.env.NODE_ENV !== "production" ? MonthPicker.propTypes = {
  // ----------------------------- Warning --------------------------------
  // | These PropTypes are generated from the TypeScript type definitions |
  // | To update them edit the TypeScript types and run "yarn proptypes"  |
  // ----------------------------------------------------------------------
  autoFocus: PropTypes.bool,

  /**
   * Override or extend the styles applied to the component.
   */
  classes: PropTypes.object,

  /**
   * className applied to the root element.
   */
  className: PropTypes.string,

  /**
   * Date value for the MonthPicker
   */
  date: PropTypes.any,

  /**
   * If `true` picker is disabled
   */
  disabled: PropTypes.bool,

  /**
   * If `true` future days are disabled.
   * @default false
   */
  disableFuture: PropTypes.bool,

  /**
   * If `true`, today's date is rendering without highlighting with circle.
   * @default false
   */
  disableHighlightToday: PropTypes.bool,

  /**
   * If `true` past days are disabled.
   * @default false
   */
  disablePast: PropTypes.bool,
  hasFocus: PropTypes.bool,

  /**
   * Maximal selectable date. @DateIOType
   */
  maxDate: PropTypes.any,

  /**
   * Minimal selectable date. @DateIOType
   */
  minDate: PropTypes.any,

  /**
   * Callback fired on date change.
   */
  onChange: PropTypes.func.isRequired,
  onFocusedViewChange: PropTypes.func,
  onMonthFocus: PropTypes.func,

  /**
   * If `true` picker is readonly
   */
  readOnly: PropTypes.bool,

  /**
   * Disable specific months dynamically.
   * Works like `shouldDisableDate` but for month selection view @DateIOType.
   * @template TDate
   * @param {TDate} month The month to check.
   * @returns {boolean} If `true` the month will be disabled.
   */
  shouldDisableMonth: PropTypes.func,

  /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.func, PropTypes.object, PropTypes.bool])), PropTypes.func, PropTypes.object])
} : void 0;