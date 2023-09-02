"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MonthPicker = void 0;
exports.useMonthPickerDefaultizedProps = useMonthPickerDefaultizedProps;

var _objectWithoutPropertiesLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutPropertiesLoose"));

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var React = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _clsx = _interopRequireDefault(require("clsx"));

var _system = require("@mui/system");

var _styles = require("@mui/material/styles");

var _material = require("@mui/material");

var _PickersMonth = require("./PickersMonth");

var _useUtils = require("../internals/hooks/useUtils");

var _monthPickerClasses = require("./monthPickerClasses");

var _dateUtils = require("../internals/utils/date-utils");

var _jsxRuntime = require("react/jsx-runtime");

const _excluded = ["className", "date", "disabled", "disableFuture", "disablePast", "maxDate", "minDate", "onChange", "shouldDisableMonth", "readOnly", "disableHighlightToday", "autoFocus", "onMonthFocus", "hasFocus", "onFocusedViewChange"];

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

const useUtilityClasses = ownerState => {
  const {
    classes
  } = ownerState;
  const slots = {
    root: ['root']
  };
  return (0, _material.unstable_composeClasses)(slots, _monthPickerClasses.getMonthPickerUtilityClass, classes);
};

function useMonthPickerDefaultizedProps(props, name) {
  const utils = (0, _useUtils.useUtils)();
  const defaultDates = (0, _useUtils.useDefaultDates)();
  const themeProps = (0, _styles.useThemeProps)({
    props,
    name
  });
  return (0, _extends2.default)({
    disableFuture: false,
    disablePast: false
  }, themeProps, {
    minDate: (0, _dateUtils.parseNonNullablePickerDate)(utils, themeProps.minDate, defaultDates.minDate),
    maxDate: (0, _dateUtils.parseNonNullablePickerDate)(utils, themeProps.maxDate, defaultDates.maxDate)
  });
}

const MonthPickerRoot = (0, _styles.styled)('div', {
  name: 'MuiMonthPicker',
  slot: 'Root',
  overridesResolver: (props, styles) => styles.root
})({
  width: 310,
  display: 'flex',
  flexWrap: 'wrap',
  alignContent: 'stretch',
  margin: '0 4px'
});
const MonthPicker = /*#__PURE__*/React.forwardRef(function MonthPicker(inProps, ref) {
  const utils = (0, _useUtils.useUtils)();
  const now = (0, _useUtils.useNow)();
  const props = useMonthPickerDefaultizedProps(inProps, 'MuiMonthPicker');
  const {
    className,
    date,
    disabled,
    disableFuture,
    disablePast,
    maxDate,
    minDate,
    onChange,
    shouldDisableMonth,
    readOnly,
    disableHighlightToday,
    autoFocus = false,
    onMonthFocus,
    hasFocus,
    onFocusedViewChange
  } = props,
        other = (0, _objectWithoutPropertiesLoose2.default)(props, _excluded);
  const ownerState = props;
  const classes = useUtilityClasses(ownerState);
  const theme = (0, _system.useTheme)();
  const selectedDateOrStartOfMonth = React.useMemo(() => date != null ? date : utils.startOfMonth(now), [now, utils, date]);
  const selectedMonth = React.useMemo(() => {
    if (date != null) {
      return utils.getMonth(date);
    }

    if (disableHighlightToday) {
      return null;
    }

    return utils.getMonth(now);
  }, [now, date, utils, disableHighlightToday]);
  const [focusedMonth, setFocusedMonth] = React.useState(() => selectedMonth || utils.getMonth(now));
  const isMonthDisabled = React.useCallback(month => {
    const firstEnabledMonth = utils.startOfMonth(disablePast && utils.isAfter(now, minDate) ? now : minDate);
    const lastEnabledMonth = utils.startOfMonth(disableFuture && utils.isBefore(now, maxDate) ? now : maxDate);

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

  const onMonthSelect = month => {
    if (readOnly) {
      return;
    }

    const newDate = utils.setMonth(selectedDateOrStartOfMonth, month);
    onChange(newDate, 'finish');
  };

  const [internalHasFocus, setInternalHasFocus] = (0, _material.useControlled)({
    name: 'MonthPicker',
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
  const focusMonth = React.useCallback(month => {
    if (!isMonthDisabled(utils.setMonth(selectedDateOrStartOfMonth, month))) {
      setFocusedMonth(month);
      changeHasFocus(true);

      if (onMonthFocus) {
        onMonthFocus(month);
      }
    }
  }, [isMonthDisabled, utils, selectedDateOrStartOfMonth, changeHasFocus, onMonthFocus]);
  React.useEffect(() => {
    setFocusedMonth(prevFocusedMonth => selectedMonth !== null && prevFocusedMonth !== selectedMonth ? selectedMonth : prevFocusedMonth);
  }, [selectedMonth]);
  const handleKeyDown = (0, _material.useEventCallback)(event => {
    const monthsInYear = 12;
    const monthsInRow = 3;

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
  const handleMonthFocus = React.useCallback((event, month) => {
    focusMonth(month);
  }, [focusMonth]);
  const handleMonthBlur = React.useCallback(() => {
    changeHasFocus(false);
  }, [changeHasFocus]);
  const currentMonthNumber = utils.getMonth(now);
  return /*#__PURE__*/(0, _jsxRuntime.jsx)(MonthPickerRoot, (0, _extends2.default)({
    ref: ref,
    className: (0, _clsx.default)(classes.root, className),
    ownerState: ownerState,
    onKeyDown: handleKeyDown
  }, other, {
    children: utils.getMonthArray(selectedDateOrStartOfMonth).map(month => {
      const monthNumber = utils.getMonth(month);
      const monthText = utils.format(month, 'monthShort');
      const isDisabled = disabled || isMonthDisabled(month);
      return /*#__PURE__*/(0, _jsxRuntime.jsx)(_PickersMonth.PickersMonth, {
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
exports.MonthPicker = MonthPicker;
process.env.NODE_ENV !== "production" ? MonthPicker.propTypes = {
  // ----------------------------- Warning --------------------------------
  // | These PropTypes are generated from the TypeScript type definitions |
  // | To update them edit the TypeScript types and run "yarn proptypes"  |
  // ----------------------------------------------------------------------
  autoFocus: _propTypes.default.bool,

  /**
   * Override or extend the styles applied to the component.
   */
  classes: _propTypes.default.object,

  /**
   * className applied to the root element.
   */
  className: _propTypes.default.string,

  /**
   * Date value for the MonthPicker
   */
  date: _propTypes.default.any,

  /**
   * If `true` picker is disabled
   */
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

  /**
   * Callback fired on date change.
   */
  onChange: _propTypes.default.func.isRequired,
  onFocusedViewChange: _propTypes.default.func,
  onMonthFocus: _propTypes.default.func,

  /**
   * If `true` picker is readonly
   */
  readOnly: _propTypes.default.bool,

  /**
   * Disable specific months dynamically.
   * Works like `shouldDisableDate` but for month selection view @DateIOType.
   * @template TDate
   * @param {TDate} month The month to check.
   * @returns {boolean} If `true` the month will be disabled.
   */
  shouldDisableMonth: _propTypes.default.func,

  /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx: _propTypes.default.oneOfType([_propTypes.default.arrayOf(_propTypes.default.oneOfType([_propTypes.default.func, _propTypes.default.object, _propTypes.default.bool])), _propTypes.default.func, _propTypes.default.object])
} : void 0;