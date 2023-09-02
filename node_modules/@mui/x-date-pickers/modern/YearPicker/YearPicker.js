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

const useUtilityClasses = ownerState => {
  const {
    classes
  } = ownerState;
  const slots = {
    root: ['root']
  };
  return composeClasses(slots, getYearPickerUtilityClass, classes);
};

function useYearPickerDefaultizedProps(props, name) {
  const utils = useUtils();
  const defaultDates = useDefaultDates();
  const themeProps = useThemeProps({
    props,
    name
  });
  return _extends({
    disablePast: false,
    disableFuture: false
  }, themeProps, {
    minDate: parseNonNullablePickerDate(utils, themeProps.minDate, defaultDates.minDate),
    maxDate: parseNonNullablePickerDate(utils, themeProps.maxDate, defaultDates.maxDate)
  });
}

const YearPickerRoot = styled('div', {
  name: 'MuiYearPicker',
  slot: 'Root',
  overridesResolver: (props, styles) => styles.root
})({
  display: 'flex',
  flexDirection: 'row',
  flexWrap: 'wrap',
  overflowY: 'auto',
  height: '100%',
  padding: '0 4px',
  maxHeight: '304px'
});
export const YearPicker = /*#__PURE__*/React.forwardRef(function YearPicker(inProps, ref) {
  const now = useNow();
  const theme = useTheme();
  const utils = useUtils();
  const props = useYearPickerDefaultizedProps(inProps, 'MuiYearPicker');
  const {
    autoFocus,
    className,
    date,
    disabled,
    disableFuture,
    disablePast,
    maxDate,
    minDate,
    onChange,
    readOnly,
    shouldDisableYear,
    disableHighlightToday,
    onYearFocus,
    hasFocus,
    onFocusedViewChange
  } = props;
  const ownerState = props;
  const classes = useUtilityClasses(ownerState);
  const selectedDateOrStartOfYear = React.useMemo(() => date ?? utils.startOfYear(now), [now, utils, date]);
  const currentYear = React.useMemo(() => {
    if (date != null) {
      return utils.getYear(date);
    }

    if (disableHighlightToday) {
      return null;
    }

    return utils.getYear(now);
  }, [now, date, utils, disableHighlightToday]);
  const wrapperVariant = React.useContext(WrapperVariantContext);
  const selectedYearRef = React.useRef(null);
  const [focusedYear, setFocusedYear] = React.useState(() => currentYear || utils.getYear(now));
  const [internalHasFocus, setInternalHasFocus] = useControlled({
    name: 'YearPicker',
    state: 'hasFocus',
    controlled: hasFocus,
    default: autoFocus
  });
  const changeHasFocus = React.useCallback(newHasFocus => {
    setInternalHasFocus(newHasFocus);

    if (onFocusedViewChange) {
      onFocusedViewChange(newHasFocus);
    }
  }, [setInternalHasFocus, onFocusedViewChange]);
  const isYearDisabled = React.useCallback(dateToValidate => {
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

  const handleYearSelection = (event, year, isFinish = 'finish') => {
    if (readOnly) {
      return;
    }

    const newDate = utils.setYear(selectedDateOrStartOfYear, year);
    onChange(newDate, isFinish);
  };

  const focusYear = React.useCallback(year => {
    if (!isYearDisabled(utils.setYear(selectedDateOrStartOfYear, year))) {
      setFocusedYear(year);
      changeHasFocus(true);
      onYearFocus?.(year);
    }
  }, [isYearDisabled, utils, selectedDateOrStartOfYear, changeHasFocus, onYearFocus]);
  React.useEffect(() => {
    setFocusedYear(prevFocusedYear => currentYear !== null && prevFocusedYear !== currentYear ? currentYear : prevFocusedYear);
  }, [currentYear]);
  const yearsInRow = wrapperVariant === 'desktop' ? 4 : 3;
  const handleKeyDown = React.useCallback((event, year) => {
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
  const handleFocus = React.useCallback((event, year) => {
    focusYear(year);
  }, [focusYear]);
  const handleBlur = React.useCallback((event, year) => {
    if (focusedYear === year) {
      changeHasFocus(false);
    }
  }, [focusedYear, changeHasFocus]);
  const nowYear = utils.getYear(now);
  const scrollerRef = React.useRef(null);
  const handleRef = useForkRef(ref, scrollerRef);
  React.useEffect(() => {
    if (autoFocus || scrollerRef.current === null) {
      return;
    }

    const tabbableButton = scrollerRef.current.querySelector('[tabindex="0"]');

    if (!tabbableButton) {
      return;
    } // Taken from useScroll in x-data-grid, but vertically centered


    const offsetHeight = tabbableButton.offsetHeight;
    const offsetTop = tabbableButton.offsetTop;
    const clientHeight = scrollerRef.current.clientHeight;
    const scrollTop = scrollerRef.current.scrollTop;
    const elementBottom = offsetTop + offsetHeight;

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
    children: utils.getYearRange(minDate, maxDate).map(year => {
      const yearNumber = utils.getYear(year);
      const selected = yearNumber === currentYear;
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