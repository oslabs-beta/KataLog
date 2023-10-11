"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DayPicker = DayPicker;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var React = _interopRequireWildcard(require("react"));

var _Typography = _interopRequireDefault(require("@mui/material/Typography"));

var _styles = require("@mui/material/styles");

var _material = require("@mui/material");

var _clsx = _interopRequireDefault(require("clsx"));

var _PickersDay = require("../PickersDay/PickersDay");

var _useUtils = require("../internals/hooks/useUtils");

var _dimensions = require("../internals/constants/dimensions");

var _PickersSlideTransition = require("./PickersSlideTransition");

var _useDateValidation = require("../internals/hooks/validation/useDateValidation");

var _dateUtils = require("../internals/utils/date-utils");

var _dayPickerClasses = require("./dayPickerClasses");

var _jsxRuntime = require("react/jsx-runtime");

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

const useUtilityClasses = ownerState => {
  const {
    classes
  } = ownerState;
  const slots = {
    header: ['header'],
    weekDayLabel: ['weekDayLabel'],
    loadingContainer: ['loadingContainer'],
    slideTransition: ['slideTransition'],
    monthContainer: ['monthContainer'],
    weekContainer: ['weekContainer']
  };
  return (0, _material.unstable_composeClasses)(slots, _dayPickerClasses.getDayPickerUtilityClass, classes);
};

const defaultDayOfWeekFormatter = day => day.charAt(0).toUpperCase();

const weeksContainerHeight = (_dimensions.DAY_SIZE + _dimensions.DAY_MARGIN * 2) * 6;
const PickersCalendarDayHeader = (0, _styles.styled)('div', {
  name: 'MuiDayPicker',
  slot: 'Header',
  overridesResolver: (_, styles) => styles.header
})({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center'
});
const PickersCalendarWeekDayLabel = (0, _styles.styled)(_Typography.default, {
  name: 'MuiDayPicker',
  slot: 'WeekDayLabel',
  overridesResolver: (_, styles) => styles.weekDayLabel
})(({
  theme
}) => ({
  width: 36,
  height: 40,
  margin: '0 2px',
  textAlign: 'center',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  color: theme.palette.text.secondary
}));
const PickersCalendarLoadingContainer = (0, _styles.styled)('div', {
  name: 'MuiDayPicker',
  slot: 'LoadingContainer',
  overridesResolver: (_, styles) => styles.loadingContainer
})({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  minHeight: weeksContainerHeight
});
const PickersCalendarSlideTransition = (0, _styles.styled)(_PickersSlideTransition.PickersSlideTransition, {
  name: 'MuiDayPicker',
  slot: 'SlideTransition',
  overridesResolver: (_, styles) => styles.slideTransition
})({
  minHeight: weeksContainerHeight
});
const PickersCalendarWeekContainer = (0, _styles.styled)('div', {
  name: 'MuiDayPicker',
  slot: 'MonthContainer',
  overridesResolver: (_, styles) => styles.monthContainer
})({
  overflow: 'hidden'
});
const PickersCalendarWeek = (0, _styles.styled)('div', {
  name: 'MuiDayPicker',
  slot: 'WeekContainer',
  overridesResolver: (_, styles) => styles.weekContainer
})({
  margin: `${_dimensions.DAY_MARGIN}px 0`,
  display: 'flex',
  justifyContent: 'center'
});
/**
 * @ignore - do not document.
 */

function DayPicker(inProps) {
  const now = (0, _useUtils.useNow)();
  const utils = (0, _useUtils.useUtils)();
  const props = (0, _styles.useThemeProps)({
    props: inProps,
    name: 'MuiDayPicker'
  });
  const classes = useUtilityClasses(props);
  const {
    onFocusedDayChange,
    className,
    currentMonth,
    selectedDays,
    disabled,
    disableHighlightToday,
    focusedDay,
    isMonthSwitchingAnimating,
    loading,
    onSelectedDaysChange,
    onMonthSwitchingAnimationEnd,
    readOnly,
    reduceAnimations,
    renderDay,
    renderLoading = () => /*#__PURE__*/(0, _jsxRuntime.jsx)("span", {
      children: "..."
    }),
    showDaysOutsideCurrentMonth,
    slideDirection,
    TransitionProps,
    disablePast,
    disableFuture,
    minDate,
    maxDate,
    shouldDisableDate,
    dayOfWeekFormatter = defaultDayOfWeekFormatter,
    hasFocus,
    onFocusedViewChange,
    gridLabelId
  } = props;
  const isDateDisabled = (0, _useDateValidation.useIsDayDisabled)({
    shouldDisableDate,
    minDate,
    maxDate,
    disablePast,
    disableFuture
  });
  const [internalFocusedDay, setInternalFocusedDay] = React.useState(() => focusedDay || now);
  const changeHasFocus = React.useCallback(newHasFocus => {
    if (onFocusedViewChange) {
      onFocusedViewChange(newHasFocus);
    }
  }, [onFocusedViewChange]);
  const handleDaySelect = React.useCallback((day, isFinish = 'finish') => {
    if (readOnly) {
      return;
    }

    onSelectedDaysChange(day, isFinish);
  }, [onSelectedDaysChange, readOnly]);
  const focusDay = React.useCallback(day => {
    if (!isDateDisabled(day)) {
      onFocusedDayChange(day);
      setInternalFocusedDay(day);
      changeHasFocus(true);
    }
  }, [isDateDisabled, onFocusedDayChange, changeHasFocus]);
  const theme = (0, _styles.useTheme)();

  function handleKeyDown(event, day) {
    switch (event.key) {
      case 'ArrowUp':
        focusDay(utils.addDays(day, -7));
        event.preventDefault();
        break;

      case 'ArrowDown':
        focusDay(utils.addDays(day, 7));
        event.preventDefault();
        break;

      case 'ArrowLeft':
        {
          const newFocusedDayDefault = utils.addDays(day, theme.direction === 'ltr' ? -1 : 1);
          const nextAvailableMonth = theme.direction === 'ltr' ? utils.getPreviousMonth(day) : utils.getNextMonth(day);
          const closestDayToFocus = (0, _dateUtils.findClosestEnabledDate)({
            utils,
            date: newFocusedDayDefault,
            minDate: theme.direction === 'ltr' ? utils.startOfMonth(nextAvailableMonth) : newFocusedDayDefault,
            maxDate: theme.direction === 'ltr' ? newFocusedDayDefault : utils.endOfMonth(nextAvailableMonth),
            isDateDisabled
          });
          focusDay(closestDayToFocus || newFocusedDayDefault);
          event.preventDefault();
          break;
        }

      case 'ArrowRight':
        {
          const newFocusedDayDefault = utils.addDays(day, theme.direction === 'ltr' ? 1 : -1);
          const nextAvailableMonth = theme.direction === 'ltr' ? utils.getNextMonth(day) : utils.getPreviousMonth(day);
          const closestDayToFocus = (0, _dateUtils.findClosestEnabledDate)({
            utils,
            date: newFocusedDayDefault,
            minDate: theme.direction === 'ltr' ? newFocusedDayDefault : utils.startOfMonth(nextAvailableMonth),
            maxDate: theme.direction === 'ltr' ? utils.endOfMonth(nextAvailableMonth) : newFocusedDayDefault,
            isDateDisabled
          });
          focusDay(closestDayToFocus || newFocusedDayDefault);
          event.preventDefault();
          break;
        }

      case 'Home':
        focusDay(utils.startOfWeek(day));
        event.preventDefault();
        break;

      case 'End':
        focusDay(utils.endOfWeek(day));
        event.preventDefault();
        break;

      case 'PageUp':
        focusDay(utils.getNextMonth(day));
        event.preventDefault();
        break;

      case 'PageDown':
        focusDay(utils.getPreviousMonth(day));
        event.preventDefault();
        break;

      default:
        break;
    }
  }

  function handleFocus(event, day) {
    focusDay(day);
  }

  function handleBlur(event, day) {
    if (hasFocus && utils.isSameDay(internalFocusedDay, day)) {
      changeHasFocus(false);
    }
  }

  const currentMonthNumber = utils.getMonth(currentMonth);
  const validSelectedDays = selectedDays.filter(day => !!day).map(day => utils.startOfDay(day)); // need a new ref whenever the `key` of the transition changes: http://reactcommunity.org/react-transition-group/transition/#Transition-prop-nodeRef.

  const transitionKey = currentMonthNumber; // eslint-disable-next-line react-hooks/exhaustive-deps

  const slideNodeRef = React.useMemo(() => /*#__PURE__*/React.createRef(), [transitionKey]);
  const startOfCurrentWeek = utils.startOfWeek(now);
  const focusableDay = React.useMemo(() => {
    const startOfMonth = utils.startOfMonth(currentMonth);
    const endOfMonth = utils.endOfMonth(currentMonth);

    if (isDateDisabled(internalFocusedDay) || utils.isAfterDay(internalFocusedDay, endOfMonth) || utils.isBeforeDay(internalFocusedDay, startOfMonth)) {
      return (0, _dateUtils.findClosestEnabledDate)({
        utils,
        date: internalFocusedDay,
        minDate: startOfMonth,
        maxDate: endOfMonth,
        disablePast,
        disableFuture,
        isDateDisabled
      });
    }

    return internalFocusedDay;
  }, [currentMonth, disableFuture, disablePast, internalFocusedDay, isDateDisabled, utils]);
  return /*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
    role: "grid",
    "aria-labelledby": gridLabelId,
    children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(PickersCalendarDayHeader, {
      role: "row",
      className: classes.header,
      children: utils.getWeekdays().map((day, i) => {
        var _dayOfWeekFormatter;

        return /*#__PURE__*/(0, _jsxRuntime.jsx)(PickersCalendarWeekDayLabel, {
          variant: "caption",
          role: "columnheader",
          "aria-label": utils.format(utils.addDays(startOfCurrentWeek, i), 'weekday'),
          className: classes.weekDayLabel,
          children: (_dayOfWeekFormatter = dayOfWeekFormatter == null ? void 0 : dayOfWeekFormatter(day)) != null ? _dayOfWeekFormatter : day
        }, day + i.toString());
      })
    }), loading ? /*#__PURE__*/(0, _jsxRuntime.jsx)(PickersCalendarLoadingContainer, {
      className: classes.loadingContainer,
      children: renderLoading()
    }) : /*#__PURE__*/(0, _jsxRuntime.jsx)(PickersCalendarSlideTransition, (0, _extends2.default)({
      transKey: transitionKey,
      onExited: onMonthSwitchingAnimationEnd,
      reduceAnimations: reduceAnimations,
      slideDirection: slideDirection,
      className: (0, _clsx.default)(className, classes.slideTransition)
    }, TransitionProps, {
      nodeRef: slideNodeRef,
      children: /*#__PURE__*/(0, _jsxRuntime.jsx)(PickersCalendarWeekContainer, {
        ref: slideNodeRef,
        role: "rowgroup",
        className: classes.monthContainer,
        children: utils.getWeekArray(currentMonth).map(week => /*#__PURE__*/(0, _jsxRuntime.jsx)(PickersCalendarWeek, {
          role: "row",
          className: classes.weekContainer,
          children: week.map(day => {
            const isFocusableDay = focusableDay !== null && utils.isSameDay(day, focusableDay);
            const isSelected = validSelectedDays.some(selectedDay => utils.isSameDay(selectedDay, day));
            const isToday = utils.isSameDay(day, now);
            const pickersDayProps = {
              key: day == null ? void 0 : day.toString(),
              day,
              isAnimating: isMonthSwitchingAnimating,
              disabled: disabled || isDateDisabled(day),
              autoFocus: hasFocus && isFocusableDay,
              today: isToday,
              outsideCurrentMonth: utils.getMonth(day) !== currentMonthNumber,
              selected: isSelected,
              disableHighlightToday,
              showDaysOutsideCurrentMonth,
              onKeyDown: handleKeyDown,
              onFocus: handleFocus,
              onBlur: handleBlur,
              onDaySelect: handleDaySelect,
              tabIndex: isFocusableDay ? 0 : -1,
              role: 'gridcell',
              'aria-selected': isSelected
            };

            if (isToday) {
              pickersDayProps['aria-current'] = 'date';
            }

            return renderDay ? renderDay(day, validSelectedDays, pickersDayProps) : /*#__PURE__*/(0, React.createElement)(_PickersDay.PickersDay, (0, _extends2.default)({}, pickersDayProps, {
              key: pickersDayProps.key
            }));
          })
        }, `week-${week[0]}`))
      })
    }))]
  });
}