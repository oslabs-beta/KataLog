"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.YearPicker = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var React = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _styles = require("@mui/material/styles");

var _material = require("@mui/material");

var _clsx = _interopRequireDefault(require("clsx"));

var _utils = require("@mui/material/utils");

var _utils2 = require("@mui/utils");

var _PickersYear = require("./PickersYear");

var _useUtils = require("../internals/hooks/useUtils");

var _WrapperVariantContext = require("../internals/components/wrappers/WrapperVariantContext");

var _yearPickerClasses = require("./yearPickerClasses");

var _dateUtils = require("../internals/utils/date-utils");

var _jsxRuntime = require("react/jsx-runtime");

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

const useUtilityClasses = ownerState => {
  const {
    classes
  } = ownerState;
  const slots = {
    root: ['root']
  };
  return (0, _material.unstable_composeClasses)(slots, _yearPickerClasses.getYearPickerUtilityClass, classes);
};

function useYearPickerDefaultizedProps(props, name) {
  const utils = (0, _useUtils.useUtils)();
  const defaultDates = (0, _useUtils.useDefaultDates)();
  const themeProps = (0, _styles.useThemeProps)({
    props,
    name
  });
  return (0, _extends2.default)({
    disablePast: false,
    disableFuture: false
  }, themeProps, {
    minDate: (0, _dateUtils.parseNonNullablePickerDate)(utils, themeProps.minDate, defaultDates.minDate),
    maxDate: (0, _dateUtils.parseNonNullablePickerDate)(utils, themeProps.maxDate, defaultDates.maxDate)
  });
}

const YearPickerRoot = (0, _styles.styled)('div', {
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
const YearPicker = /*#__PURE__*/React.forwardRef(function YearPicker(inProps, ref) {
  const now = (0, _useUtils.useNow)();
  const theme = (0, _styles.useTheme)();
  const utils = (0, _useUtils.useUtils)();
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
  const selectedDateOrStartOfYear = React.useMemo(() => date != null ? date : utils.startOfYear(now), [now, utils, date]);
  const currentYear = React.useMemo(() => {
    if (date != null) {
      return utils.getYear(date);
    }

    if (disableHighlightToday) {
      return null;
    }

    return utils.getYear(now);
  }, [now, date, utils, disableHighlightToday]);
  const wrapperVariant = React.useContext(_WrapperVariantContext.WrapperVariantContext);
  const selectedYearRef = React.useRef(null);
  const [focusedYear, setFocusedYear] = React.useState(() => currentYear || utils.getYear(now));
  const [internalHasFocus, setInternalHasFocus] = (0, _utils2.unstable_useControlled)({
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
      onYearFocus == null ? void 0 : onYearFocus(year);
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
  const handleRef = (0, _utils.useForkRef)(ref, scrollerRef);
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
  return /*#__PURE__*/(0, _jsxRuntime.jsx)(YearPickerRoot, {
    ref: handleRef,
    className: (0, _clsx.default)(classes.root, className),
    ownerState: ownerState,
    children: utils.getYearRange(minDate, maxDate).map(year => {
      const yearNumber = utils.getYear(year);
      const selected = yearNumber === currentYear;
      return /*#__PURE__*/(0, _jsxRuntime.jsx)(_PickersYear.PickersYear, {
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
exports.YearPicker = YearPicker;
process.env.NODE_ENV !== "production" ? YearPicker.propTypes = {
  // ----------------------------- Warning --------------------------------
  // | These PropTypes are generated from the TypeScript type definitions |
  // | To update them edit the TypeScript types and run "yarn proptypes"  |
  // ----------------------------------------------------------------------
  autoFocus: _propTypes.default.bool,
  classes: _propTypes.default.object,
  className: _propTypes.default.string,
  date: _propTypes.default.any,
  disabled: _propTypes.default.bool,

  /**
   * If `true` future days are disabled.
   * @default false
   */
  disableFuture: _propTypes.default.bool,

  /**
   * If `true`, today's date is rendering without highlighting with circle.
   * @default false
   */
  disableHighlightToday: _propTypes.default.bool,

  /**
   * If `true` past days are disabled.
   * @default false
   */
  disablePast: _propTypes.default.bool,
  hasFocus: _propTypes.default.bool,

  /**
   * Maximal selectable date. @DateIOType
   */
  maxDate: _propTypes.default.any,

  /**
   * Minimal selectable date. @DateIOType
   */
  minDate: _propTypes.default.any,
  onChange: _propTypes.default.func.isRequired,
  onFocusedDayChange: _propTypes.default.func,
  onFocusedViewChange: _propTypes.default.func,
  onYearFocus: _propTypes.default.func,
  readOnly: _propTypes.default.bool,

  /**
   * Disable specific years dynamically.
   * Works like `shouldDisableDate` but for year selection view @DateIOType.
   * @template TDate
   * @param {TDate} year The year to test.
   * @returns {boolean} Returns `true` if the year should be disabled.
   */
  shouldDisableYear: _propTypes.default.func
} : void 0;