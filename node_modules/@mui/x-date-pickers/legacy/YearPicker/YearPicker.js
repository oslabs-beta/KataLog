import _slicedToArray from "@babel/runtime/helpers/esm/slicedToArray";
import _extends from "@babel/runtime/helpers/esm/extends";
import * as React from 'react';
import PropTypes from 'prop-types';
import { useTheme, styled, useThemeProps } from '@mui/material/styles';
import { unstable_composeClasses as composeClasses } from '@mui/material';
import clsx from 'clsx';
import { useForkRef } from '@mui/material/utils';
import { unstable_useControlled as useControlled } from '@mui/utils';
import { PickersYear } from './PickersYear';
import { useUtils, useNow, useDefaultDates } from '../internals/hooks/useUtils';
import { WrapperVariantContext } from '../internals/components/wrappers/WrapperVariantContext';
import { getYearPickerUtilityClass } from './yearPickerClasses';
import { parseNonNullablePickerDate } from '../internals/utils/date-utils';
import { jsx as _jsx } from "react/jsx-runtime";

var useUtilityClasses = function useUtilityClasses(ownerState) {
  var classes = ownerState.classes;
  var slots = {
    root: ['root']
  };
  return composeClasses(slots, getYearPickerUtilityClass, classes);
};

function useYearPickerDefaultizedProps(props, name) {
  var utils = useUtils();
  var defaultDates = useDefaultDates();
  var themeProps = useThemeProps({
    props: props,
    name: name
  });
  return _extends({
    disablePast: false,
    disableFuture: false
  }, themeProps, {
    minDate: parseNonNullablePickerDate(utils, themeProps.minDate, defaultDates.minDate),
    maxDate: parseNonNullablePickerDate(utils, themeProps.maxDate, defaultDates.maxDate)
  });
}

var YearPickerRoot = styled('div', {
  name: 'MuiYearPicker',
  slot: 'Root',
  overridesResolver: function overridesResolver(props, styles) {
    return styles.root;
  }
})({
  display: 'flex',
  flexDirection: 'row',
  flexWrap: 'wrap',
  overflowY: 'auto',
  height: '100%',
  padding: '0 4px',
  maxHeight: '304px'
});
export var YearPicker = /*#__PURE__*/React.forwardRef(function YearPicker(inProps, ref) {
  var now = useNow();
  var theme = useTheme();
  var utils = useUtils();
  var props = useYearPickerDefaultizedProps(inProps, 'MuiYearPicker');
  var autoFocus = props.autoFocus,
      className = props.className,
      date = props.date,
      disabled = props.disabled,
      disableFuture = props.disableFuture,
      disablePast = props.disablePast,
      maxDate = props.maxDate,
      minDate = props.minDate,
      onChange = props.onChange,
      readOnly = props.readOnly,
      shouldDisableYear = props.shouldDisableYear,
      disableHighlightToday = props.disableHighlightToday,
      onYearFocus = props.onYearFocus,
      hasFocus = props.hasFocus,
      onFocusedViewChange = props.onFocusedViewChange;
  var ownerState = props;
  var classes = useUtilityClasses(ownerState);
  var selectedDateOrStartOfYear = React.useMemo(function () {
    return date != null ? date : utils.startOfYear(now);
  }, [now, utils, date]);
  var currentYear = React.useMemo(function () {
    if (date != null) {
      return utils.getYear(date);
    }

    if (disableHighlightToday) {
      return null;
    }

    return utils.getYear(now);
  }, [now, date, utils, disableHighlightToday]);
  var wrapperVariant = React.useContext(WrapperVariantContext);
  var selectedYearRef = React.useRef(null);

  var _React$useState = React.useState(function () {
    return currentYear || utils.getYear(now);
  }),
      _React$useState2 = _slicedToArray(_React$useState, 2),
      focusedYear = _React$useState2[0],
      setFocusedYear = _React$useState2[1];

  var _useControlled = useControlled({
    name: 'YearPicker',
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
  var isYearDisabled = React.useCallback(function (dateToValidate) {
    if (disablePast && utils.isBeforeYear(dateToValidate, now)) {
      return true;
    }

    if (disableFuture && utils.isAfterYear(dateToValidate, now)) {
      return true;
    }

    if (minDate && utils.isBeforeYear(dateToValidate, minDate)) {
      return true;
    }

    if (maxDate && utils.isAfterYear(dateToValidate, maxDate)) {
      return true;
    }

    if (shouldDisableYear && shouldDisableYear(dateToValidate)) {
      return true;
    }

    return false;
  }, [disableFuture, disablePast, maxDate, minDate, now, shouldDisableYear, utils]);

  var handleYearSelection = function handleYearSelection(event, year) {
    var isFinish = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 'finish';

    if (readOnly) {
      return;
    }

    var newDate = utils.setYear(selectedDateOrStartOfYear, year);
    onChange(newDate, isFinish);
  };

  var focusYear = React.useCallback(function (year) {
    if (!isYearDisabled(utils.setYear(selectedDateOrStartOfYear, year))) {
      setFocusedYear(year);
      changeHasFocus(true);
      onYearFocus == null ? void 0 : onYearFocus(year);
    }
  }, [isYearDisabled, utils, selectedDateOrStartOfYear, changeHasFocus, onYearFocus]);
  React.useEffect(function () {
    setFocusedYear(function (prevFocusedYear) {
      return currentYear !== null && prevFocusedYear !== currentYear ? currentYear : prevFocusedYear;
    });
  }, [currentYear]);
  var yearsInRow = wrapperVariant === 'desktop' ? 4 : 3;
  var handleKeyDown = React.useCallback(function (event, year) {
    switch (event.key) {
      case 'ArrowUp':
        focusYear(year - yearsInRow);
        event.preventDefault();
        break;

      case 'ArrowDown':
        focusYear(year + yearsInRow);
        event.preventDefault();
        break;

      case 'ArrowLeft':
        focusYear(year + (theme.direction === 'ltr' ? -1 : 1));
        event.preventDefault();
        break;

      case 'ArrowRight':
        focusYear(year + (theme.direction === 'ltr' ? 1 : -1));
        event.preventDefault();
        break;

      default:
        break;
    }
  }, [focusYear, theme.direction, yearsInRow]);
  var handleFocus = React.useCallback(function (event, year) {
    focusYear(year);
  }, [focusYear]);
  var handleBlur = React.useCallback(function (event, year) {
    if (focusedYear === year) {
      changeHasFocus(false);
    }
  }, [focusedYear, changeHasFocus]);
  var nowYear = utils.getYear(now);
  var scrollerRef = React.useRef(null);
  var handleRef = useForkRef(ref, scrollerRef);
  React.useEffect(function () {
    if (autoFocus || scrollerRef.current === null) {
      return;
    }

    var tabbableButton = scrollerRef.current.querySelector('[tabindex="0"]');

    if (!tabbableButton) {
      return;
    } // Taken from useScroll in x-data-grid, but vertically centered


    var offsetHeight = tabbableButton.offsetHeight;
    var offsetTop = tabbableButton.offsetTop;
    var clientHeight = scrollerRef.current.clientHeight;
    var scrollTop = scrollerRef.current.scrollTop;
    var elementBottom = offsetTop + offsetHeight;

    if (offsetHeight > clientHeight || offsetTop < scrollTop) {
      // Button already visible
      return;
    }

    scrollerRef.current.scrollTop = elementBottom - clientHeight / 2 - offsetHeight / 2;
  }, [autoFocus]);
  return /*#__PURE__*/_jsx(YearPickerRoot, {
    ref: handleRef,
    className: clsx(classes.root, className),
    ownerState: ownerState,
    children: utils.getYearRange(minDate, maxDate).map(function (year) {
      var yearNumber = utils.getYear(year);
      var selected = yearNumber === currentYear;
      return /*#__PURE__*/_jsx(PickersYear, {
        selected: selected,
        value: yearNumber,
        onClick: handleYearSelection,
        onKeyDown: handleKeyDown,
        autoFocus: internalHasFocus && yearNumber === focusedYear,
        ref: selected ? selectedYearRef : undefined,
        disabled: disabled || isYearDisabled(year),
        tabIndex: yearNumber === focusedYear ? 0 : -1,
        onFocus: handleFocus,
        onBlur: handleBlur,
        "aria-current": nowYear === yearNumber ? 'date' : undefined,
        children: utils.format(year, 'year')
      }, utils.format(year, 'year'));
    })
  });
});
process.env.NODE_ENV !== "production" ? YearPicker.propTypes = {
  // ----------------------------- Warning --------------------------------
  // | These PropTypes are generated from the TypeScript type definitions |
  // | To update them edit the TypeScript types and run "yarn proptypes"  |
  // ----------------------------------------------------------------------
  autoFocus: PropTypes.bool,
  classes: PropTypes.object,
  className: PropTypes.string,
  date: PropTypes.any,
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
  onChange: PropTypes.func.isRequired,
  onFocusedDayChange: PropTypes.func,
  onFocusedViewChange: PropTypes.func,
  onYearFocus: PropTypes.func,
  readOnly: PropTypes.bool,

  /**
   * Disable specific years dynamically.
   * Works like `shouldDisableDate` but for year selection view @DateIOType.
   * @template TDate
   * @param {TDate} year The year to test.
   * @returns {boolean} Returns `true` if the year should be disabled.
   */
  shouldDisableYear: PropTypes.func
} : void 0;