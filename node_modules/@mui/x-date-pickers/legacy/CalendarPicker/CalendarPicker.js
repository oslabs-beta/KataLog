import _slicedToArray from "@babel/runtime/helpers/esm/slicedToArray";
import _objectWithoutProperties from "@babel/runtime/helpers/esm/objectWithoutProperties";
import _extends from "@babel/runtime/helpers/esm/extends";
var _excluded = ["autoFocus", "onViewChange", "date", "disableFuture", "disablePast", "defaultCalendarMonth", "onChange", "onYearChange", "onMonthChange", "reduceAnimations", "shouldDisableDate", "shouldDisableMonth", "shouldDisableYear", "view", "views", "openTo", "className", "disabled", "readOnly", "minDate", "maxDate", "disableHighlightToday", "focusedView", "onFocusedViewChange", "classes"];
import * as React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { styled, useThemeProps } from '@mui/material/styles';
import { unstable_composeClasses as composeClasses } from '@mui/material';
import { useControlled, unstable_useId as useId, useEventCallback } from '@mui/material/utils';
import { MonthPicker } from '../MonthPicker/MonthPicker';
import { useCalendarState } from './useCalendarState';
import { useDefaultDates, useUtils } from '../internals/hooks/useUtils';
import { PickersFadeTransitionGroup } from './PickersFadeTransitionGroup';
import { DayPicker } from './DayPicker';
import { useViews } from '../internals/hooks/useViews';
import { PickersCalendarHeader } from './PickersCalendarHeader';
import { YearPicker } from '../YearPicker/YearPicker';
import { findClosestEnabledDate, parseNonNullablePickerDate } from '../internals/utils/date-utils';
import { PickerViewRoot } from '../internals/components/PickerViewRoot';
import { defaultReduceAnimations } from '../internals/utils/defaultReduceAnimations';
import { getCalendarPickerUtilityClass } from './calendarPickerClasses';
import { jsx as _jsx } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";

var useUtilityClasses = function useUtilityClasses(ownerState) {
  var classes = ownerState.classes;
  var slots = {
    root: ['root'],
    viewTransitionContainer: ['viewTransitionContainer']
  };
  return composeClasses(slots, getCalendarPickerUtilityClass, classes);
};

function useCalendarPickerDefaultizedProps(props, name) {
  var utils = useUtils();
  var defaultDates = useDefaultDates();
  var themeProps = useThemeProps({
    props: props,
    name: name
  });
  return _extends({
    loading: false,
    disablePast: false,
    disableFuture: false,
    openTo: 'day',
    views: ['year', 'day'],
    reduceAnimations: defaultReduceAnimations,
    renderLoading: function renderLoading() {
      return /*#__PURE__*/_jsx("span", {
        children: "..."
      });
    }
  }, themeProps, {
    minDate: parseNonNullablePickerDate(utils, themeProps.minDate, defaultDates.minDate),
    maxDate: parseNonNullablePickerDate(utils, themeProps.maxDate, defaultDates.maxDate)
  });
}

var CalendarPickerRoot = styled(PickerViewRoot, {
  name: 'MuiCalendarPicker',
  slot: 'Root',
  overridesResolver: function overridesResolver(props, styles) {
    return styles.root;
  }
})({
  display: 'flex',
  flexDirection: 'column'
});
var CalendarPickerViewTransitionContainer = styled(PickersFadeTransitionGroup, {
  name: 'MuiCalendarPicker',
  slot: 'ViewTransitionContainer',
  overridesResolver: function overridesResolver(props, styles) {
    return styles.viewTransitionContainer;
  }
})({});

/**
 *
 * Demos:
 *
 * - [Date Picker](https://mui.com/x/react-date-pickers/date-picker/)
 *
 * API:
 *
 * - [CalendarPicker API](https://mui.com/x/api/date-pickers/calendar-picker/)
 */
export var CalendarPicker = /*#__PURE__*/React.forwardRef(function CalendarPicker(inProps, ref) {
  var utils = useUtils();
  var id = useId();
  var props = useCalendarPickerDefaultizedProps(inProps, 'MuiCalendarPicker');

  var autoFocus = props.autoFocus,
      onViewChange = props.onViewChange,
      date = props.date,
      disableFuture = props.disableFuture,
      disablePast = props.disablePast,
      defaultCalendarMonth = props.defaultCalendarMonth,
      onChange = props.onChange,
      onYearChange = props.onYearChange,
      onMonthChange = props.onMonthChange,
      reduceAnimations = props.reduceAnimations,
      shouldDisableDate = props.shouldDisableDate,
      shouldDisableMonth = props.shouldDisableMonth,
      shouldDisableYear = props.shouldDisableYear,
      view = props.view,
      views = props.views,
      openTo = props.openTo,
      className = props.className,
      disabled = props.disabled,
      readOnly = props.readOnly,
      minDate = props.minDate,
      maxDate = props.maxDate,
      disableHighlightToday = props.disableHighlightToday,
      focusedView = props.focusedView,
      onFocusedViewChange = props.onFocusedViewChange,
      providedClasses = props.classes,
      other = _objectWithoutProperties(props, _excluded);

  var _useViews = useViews({
    view: view,
    views: views,
    openTo: openTo,
    onChange: onChange,
    onViewChange: onViewChange
  }),
      openView = _useViews.openView,
      setOpenView = _useViews.setOpenView,
      openNext = _useViews.openNext;

  var _useCalendarState = useCalendarState({
    date: date,
    defaultCalendarMonth: defaultCalendarMonth,
    reduceAnimations: reduceAnimations,
    onMonthChange: onMonthChange,
    minDate: minDate,
    maxDate: maxDate,
    shouldDisableDate: shouldDisableDate,
    disablePast: disablePast,
    disableFuture: disableFuture
  }),
      calendarState = _useCalendarState.calendarState,
      changeFocusedDay = _useCalendarState.changeFocusedDay,
      changeMonth = _useCalendarState.changeMonth,
      handleChangeMonth = _useCalendarState.handleChangeMonth,
      isDateDisabled = _useCalendarState.isDateDisabled,
      onMonthSwitchingAnimationEnd = _useCalendarState.onMonthSwitchingAnimationEnd;

  var handleDateMonthChange = React.useCallback(function (newDate, selectionState) {
    var startOfMonth = utils.startOfMonth(newDate);
    var endOfMonth = utils.endOfMonth(newDate);
    var closestEnabledDate = isDateDisabled(newDate) ? findClosestEnabledDate({
      utils: utils,
      date: newDate,
      minDate: utils.isBefore(minDate, startOfMonth) ? startOfMonth : minDate,
      maxDate: utils.isAfter(maxDate, endOfMonth) ? endOfMonth : maxDate,
      disablePast: disablePast,
      disableFuture: disableFuture,
      isDateDisabled: isDateDisabled
    }) : newDate;

    if (closestEnabledDate) {
      onChange(closestEnabledDate, selectionState);
      onMonthChange == null ? void 0 : onMonthChange(startOfMonth);
    } else {
      openNext();
      changeMonth(startOfMonth);
    }

    changeFocusedDay(closestEnabledDate, true);
  }, [changeFocusedDay, disableFuture, disablePast, isDateDisabled, maxDate, minDate, onChange, onMonthChange, changeMonth, openNext, utils]);
  var handleDateYearChange = React.useCallback(function (newDate, selectionState) {
    var startOfYear = utils.startOfYear(newDate);
    var endOfYear = utils.endOfYear(newDate);
    var closestEnabledDate = isDateDisabled(newDate) ? findClosestEnabledDate({
      utils: utils,
      date: newDate,
      minDate: utils.isBefore(minDate, startOfYear) ? startOfYear : minDate,
      maxDate: utils.isAfter(maxDate, endOfYear) ? endOfYear : maxDate,
      disablePast: disablePast,
      disableFuture: disableFuture,
      isDateDisabled: isDateDisabled
    }) : newDate;

    if (closestEnabledDate) {
      onChange(closestEnabledDate, selectionState);
      onYearChange == null ? void 0 : onYearChange(closestEnabledDate);
    } else {
      openNext();
      changeMonth(startOfYear);
    }

    changeFocusedDay(closestEnabledDate, true);
  }, [changeFocusedDay, disableFuture, disablePast, isDateDisabled, maxDate, minDate, onChange, onYearChange, openNext, utils, changeMonth]);
  var onSelectedDayChange = React.useCallback(function (day, isFinish) {
    if (date && day) {
      // If there is a date already selected, then we want to keep its time
      return onChange(utils.mergeDateAndTime(day, date), isFinish);
    }

    return onChange(day, isFinish);
  }, [utils, date, onChange]);
  React.useEffect(function () {
    if (date) {
      changeMonth(date);
    }
  }, [date]); // eslint-disable-line

  var ownerState = props;
  var classes = useUtilityClasses(ownerState);
  var baseDateValidationProps = {
    disablePast: disablePast,
    disableFuture: disableFuture,
    maxDate: maxDate,
    minDate: minDate
  }; // When disabled, limit the view to the selected date

  var minDateWithDisabled = disabled && date || minDate;
  var maxDateWithDisabled = disabled && date || maxDate;
  var commonViewProps = {
    disableHighlightToday: disableHighlightToday,
    readOnly: readOnly,
    disabled: disabled
  };
  var gridLabelId = "".concat(id, "-grid-label");

  var _useControlled = useControlled({
    name: 'DayPicker',
    state: 'focusedView',
    controlled: focusedView,
    default: autoFocus ? openView : null
  }),
      _useControlled2 = _slicedToArray(_useControlled, 2),
      internalFocusedView = _useControlled2[0],
      setInternalFocusedView = _useControlled2[1];

  var hasFocus = internalFocusedView !== null;
  var handleFocusedViewChange = useEventCallback(function (eventView) {
    return function (newHasFocus) {
      if (onFocusedViewChange) {
        // Use the calendar or clock logic
        onFocusedViewChange(eventView)(newHasFocus);
        return;
      } // If alone, do the local modifications


      if (newHasFocus) {
        setInternalFocusedView(eventView);
      } else {
        setInternalFocusedView(function (prevView) {
          return prevView === eventView ? null : prevView;
        });
      }
    };
  });
  var prevOpenViewRef = React.useRef(openView);
  React.useEffect(function () {
    // Set focus to the button when switching from a view to another
    if (prevOpenViewRef.current === openView) {
      return;
    }

    prevOpenViewRef.current = openView;
    handleFocusedViewChange(openView)(true);
  }, [openView, handleFocusedViewChange]);
  return /*#__PURE__*/_jsxs(CalendarPickerRoot, {
    ref: ref,
    className: clsx(classes.root, className),
    ownerState: ownerState,
    children: [/*#__PURE__*/_jsx(PickersCalendarHeader, _extends({}, other, {
      views: views,
      openView: openView,
      currentMonth: calendarState.currentMonth,
      onViewChange: setOpenView,
      onMonthChange: function onMonthChange(newMonth, direction) {
        return handleChangeMonth({
          newMonth: newMonth,
          direction: direction
        });
      },
      minDate: minDateWithDisabled,
      maxDate: maxDateWithDisabled,
      disabled: disabled,
      disablePast: disablePast,
      disableFuture: disableFuture,
      reduceAnimations: reduceAnimations,
      labelId: gridLabelId
    })), /*#__PURE__*/_jsx(CalendarPickerViewTransitionContainer, {
      reduceAnimations: reduceAnimations,
      className: classes.viewTransitionContainer,
      transKey: openView,
      ownerState: ownerState,
      children: /*#__PURE__*/_jsxs("div", {
        children: [openView === 'year' && /*#__PURE__*/_jsx(YearPicker, _extends({}, other, baseDateValidationProps, commonViewProps, {
          autoFocus: autoFocus,
          date: date,
          onChange: handleDateYearChange,
          shouldDisableYear: shouldDisableYear,
          hasFocus: hasFocus,
          onFocusedViewChange: handleFocusedViewChange('year')
        })), openView === 'month' && /*#__PURE__*/_jsx(MonthPicker, _extends({}, baseDateValidationProps, commonViewProps, {
          autoFocus: autoFocus,
          hasFocus: hasFocus,
          className: className,
          date: date,
          onChange: handleDateMonthChange,
          shouldDisableMonth: shouldDisableMonth,
          onFocusedViewChange: handleFocusedViewChange('month')
        })), openView === 'day' && /*#__PURE__*/_jsx(DayPicker, _extends({}, other, calendarState, baseDateValidationProps, commonViewProps, {
          autoFocus: autoFocus,
          onMonthSwitchingAnimationEnd: onMonthSwitchingAnimationEnd,
          onFocusedDayChange: changeFocusedDay,
          reduceAnimations: reduceAnimations,
          selectedDays: [date],
          onSelectedDaysChange: onSelectedDayChange,
          shouldDisableDate: shouldDisableDate,
          hasFocus: hasFocus,
          onFocusedViewChange: handleFocusedViewChange('day'),
          gridLabelId: gridLabelId
        }))]
      })
    })]
  });
});
process.env.NODE_ENV !== "production" ? CalendarPicker.propTypes = {
  // ----------------------------- Warning --------------------------------
  // | These PropTypes are generated from the TypeScript type definitions |
  // | To update them edit the TypeScript types and run "yarn proptypes"  |
  // ----------------------------------------------------------------------
  autoFocus: PropTypes.bool,
  classes: PropTypes.object,
  className: PropTypes.string,

  /**
   * Overrideable components.
   * @default {}
   */
  components: PropTypes.object,

  /**
   * The props used for each component slot.
   * @default {}
   */
  componentsProps: PropTypes.object,
  date: PropTypes.any,

  /**
   * Formats the day of week displayed in the calendar header.
   * @param {string} day The day of week provided by the adapter's method `getWeekdays`.
   * @returns {string} The name to display.
   * @default (day) => day.charAt(0).toUpperCase()
   */
  dayOfWeekFormatter: PropTypes.func,

  /**
   * Default calendar month displayed when `value={null}`.
   */
  defaultCalendarMonth: PropTypes.any,

  /**
   * If `true`, the picker and text field are disabled.
   * @default false
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
  focusedView: PropTypes.oneOf(['day', 'month', 'year']),

  /**
   * Get aria-label text for switching between views button.
   * @param {CalendarPickerView} currentView The view from which we want to get the button text.
   * @returns {string} The label of the view.
   * @deprecated Use the `localeText` prop of `LocalizationProvider` instead, see https://mui.com/x/react-date-pickers/localization/.
   */
  getViewSwitchingButtonText: PropTypes.func,

  /**
   * Left arrow icon aria-label text.
   * @deprecated
   */
  leftArrowButtonText: PropTypes.string,

  /**
   * If `true` renders `LoadingComponent` in calendar instead of calendar view.
   * Can be used to preload information and show it in calendar.
   * @default false
   */
  loading: PropTypes.bool,

  /**
   * Maximal selectable date. @DateIOType
   */
  maxDate: PropTypes.any,

  /**
   * Minimal selectable date. @DateIOType
   */
  minDate: PropTypes.any,

  /**
   * Callback fired on date change
   */
  onChange: PropTypes.func.isRequired,
  onFocusedViewChange: PropTypes.func,

  /**
   * Callback firing on month change @DateIOType.
   * @template TDate
   * @param {TDate} month The new month.
   * @returns {void|Promise} -
   */
  onMonthChange: PropTypes.func,

  /**
   * Callback fired on view change.
   * @param {CalendarPickerView} view The new view.
   */
  onViewChange: PropTypes.func,

  /**
   * Callback firing on year change @DateIOType.
   * @template TDate
   * @param {TDate} year The new year.
   */
  onYearChange: PropTypes.func,

  /**
   * Initially open view.
   * @default 'day'
   */
  openTo: PropTypes.oneOf(['day', 'month', 'year']),

  /**
   * Make picker read only.
   * @default false
   */
  readOnly: PropTypes.bool,

  /**
   * Disable heavy animations.
   * @default typeof navigator !== 'undefined' && /(android)/i.test(navigator.userAgent)
   */
  reduceAnimations: PropTypes.bool,

  /**
   * Custom renderer for day. Check the [PickersDay](https://mui.com/x/api/date-pickers/pickers-day/) component.
   * @template TDate
   * @param {TDate} day The day to render.
   * @param {Array<TDate | null>} selectedDays The days currently selected.
   * @param {PickersDayProps<TDate>} pickersDayProps The props of the day to render.
   * @returns {JSX.Element} The element representing the day.
   */
  renderDay: PropTypes.func,

  /**
   * Component displaying when passed `loading` true.
   * @returns {React.ReactNode} The node to render when loading.
   * @default () => <span data-mui-test="loading-progress">...</span>
   */
  renderLoading: PropTypes.func,

  /**
   * Right arrow icon aria-label text.
   * @deprecated
   */
  rightArrowButtonText: PropTypes.string,

  /**
   * Disable specific date. @DateIOType
   * @template TDate
   * @param {TDate} day The date to test.
   * @returns {boolean} Returns `true` if the date should be disabled.
   */
  shouldDisableDate: PropTypes.func,

  /**
   * Disable specific months dynamically.
   * Works like `shouldDisableDate` but for month selection view @DateIOType.
   * @template TDate
   * @param {TDate} month The month to check.
   * @returns {boolean} If `true` the month will be disabled.
   */
  shouldDisableMonth: PropTypes.func,

  /**
   * Disable specific years dynamically.
   * Works like `shouldDisableDate` but for year selection view @DateIOType.
   * @template TDate
   * @param {TDate} year The year to test.
   * @returns {boolean} Returns `true` if the year should be disabled.
   */
  shouldDisableYear: PropTypes.func,

  /**
   * If `true`, days that have `outsideCurrentMonth={true}` are displayed.
   * @default false
   */
  showDaysOutsideCurrentMonth: PropTypes.bool,

  /**
   * Controlled open view.
   */
  view: PropTypes.oneOf(['day', 'month', 'year']),

  /**
   * Views for calendar picker.
   * @default ['year', 'day']
   */
  views: PropTypes.arrayOf(PropTypes.oneOf(['day', 'month', 'year']).isRequired)
} : void 0;