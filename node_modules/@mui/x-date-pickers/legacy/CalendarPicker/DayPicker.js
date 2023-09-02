import _extends from "@babel/runtime/helpers/esm/extends";
import _slicedToArray from "@babel/runtime/helpers/esm/slicedToArray";
import * as React from 'react';
import Typography from '@mui/material/Typography';
import { styled, useTheme, useThemeProps } from '@mui/material/styles';
import { unstable_composeClasses as composeClasses } from '@mui/material';
import clsx from 'clsx';
import { PickersDay } from '../PickersDay/PickersDay';
import { useUtils, useNow } from '../internals/hooks/useUtils';
import { DAY_SIZE, DAY_MARGIN } from '../internals/constants/dimensions';
import { PickersSlideTransition } from './PickersSlideTransition';
import { useIsDayDisabled } from '../internals/hooks/validation/useDateValidation';
import { findClosestEnabledDate } from '../internals/utils/date-utils';
import { getDayPickerUtilityClass } from './dayPickerClasses';
import { jsx as _jsx } from "react/jsx-runtime";
import { createElement as _createElement } from "react";
import { jsxs as _jsxs } from "react/jsx-runtime";

var useUtilityClasses = function useUtilityClasses(ownerState) {
  var classes = ownerState.classes;
  var slots = {
    header: ['header'],
    weekDayLabel: ['weekDayLabel'],
    loadingContainer: ['loadingContainer'],
    slideTransition: ['slideTransition'],
    monthContainer: ['monthContainer'],
    weekContainer: ['weekContainer']
  };
  return composeClasses(slots, getDayPickerUtilityClass, classes);
};

var defaultDayOfWeekFormatter = function defaultDayOfWeekFormatter(day) {
  return day.charAt(0).toUpperCase();
};

var weeksContainerHeight = (DAY_SIZE + DAY_MARGIN * 2) * 6;
var PickersCalendarDayHeader = styled('div', {
  name: 'MuiDayPicker',
  slot: 'Header',
  overridesResolver: function overridesResolver(_, styles) {
    return styles.header;
  }
})({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center'
});
var PickersCalendarWeekDayLabel = styled(Typography, {
  name: 'MuiDayPicker',
  slot: 'WeekDayLabel',
  overridesResolver: function overridesResolver(_, styles) {
    return styles.weekDayLabel;
  }
})(function (_ref) {
  var theme = _ref.theme;
  return {
    width: 36,
    height: 40,
    margin: '0 2px',
    textAlign: 'center',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    color: theme.palette.text.secondary
  };
});
var PickersCalendarLoadingContainer = styled('div', {
  name: 'MuiDayPicker',
  slot: 'LoadingContainer',
  overridesResolver: function overridesResolver(_, styles) {
    return styles.loadingContainer;
  }
})({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  minHeight: weeksContainerHeight
});
var PickersCalendarSlideTransition = styled(PickersSlideTransition, {
  name: 'MuiDayPicker',
  slot: 'SlideTransition',
  overridesResolver: function overridesResolver(_, styles) {
    return styles.slideTransition;
  }
})({
  minHeight: weeksContainerHeight
});
var PickersCalendarWeekContainer = styled('div', {
  name: 'MuiDayPicker',
  slot: 'MonthContainer',
  overridesResolver: function overridesResolver(_, styles) {
    return styles.monthContainer;
  }
})({
  overflow: 'hidden'
});
var PickersCalendarWeek = styled('div', {
  name: 'MuiDayPicker',
  slot: 'WeekContainer',
  overridesResolver: function overridesResolver(_, styles) {
    return styles.weekContainer;
  }
})({
  margin: "".concat(DAY_MARGIN, "px 0"),
  display: 'flex',
  justifyContent: 'center'
});
/**
 * @ignore - do not document.
 */

export function DayPicker(inProps) {
  var now = useNow();
  var utils = useUtils();
  var props = useThemeProps({
    props: inProps,
    name: 'MuiDayPicker'
  });
  var classes = useUtilityClasses(props);
  var onFocusedDayChange = props.onFocusedDayChange,
      className = props.className,
      currentMonth = props.currentMonth,
      selectedDays = props.selectedDays,
      disabled = props.disabled,
      disableHighlightToday = props.disableHighlightToday,
      focusedDay = props.focusedDay,
      isMonthSwitchingAnimating = props.isMonthSwitchingAnimating,
      loading = props.loading,
      onSelectedDaysChange = props.onSelectedDaysChange,
      onMonthSwitchingAnimationEnd = props.onMonthSwitchingAnimationEnd,
      readOnly = props.readOnly,
      reduceAnimations = props.reduceAnimations,
      renderDay = props.renderDay,
      _props$renderLoading = props.renderLoading,
      renderLoading = _props$renderLoading === void 0 ? function () {
    return /*#__PURE__*/_jsx("span", {
      children: "..."
    });
  } : _props$renderLoading,
      showDaysOutsideCurrentMonth = props.showDaysOutsideCurrentMonth,
      slideDirection = props.slideDirection,
      TransitionProps = props.TransitionProps,
      disablePast = props.disablePast,
      disableFuture = props.disableFuture,
      minDate = props.minDate,
      maxDate = props.maxDate,
      shouldDisableDate = props.shouldDisableDate,
      _props$dayOfWeekForma = props.dayOfWeekFormatter,
      dayOfWeekFormatter = _props$dayOfWeekForma === void 0 ? defaultDayOfWeekFormatter : _props$dayOfWeekForma,
      hasFocus = props.hasFocus,
      onFocusedViewChange = props.onFocusedViewChange,
      gridLabelId = props.gridLabelId;
  var isDateDisabled = useIsDayDisabled({
    shouldDisableDate: shouldDisableDate,
    minDate: minDate,
    maxDate: maxDate,
    disablePast: disablePast,
    disableFuture: disableFuture
  });

  var _React$useState = React.useState(function () {
    return focusedDay || now;
  }),
      _React$useState2 = _slicedToArray(_React$useState, 2),
      internalFocusedDay = _React$useState2[0],
      setInternalFocusedDay = _React$useState2[1];

  var changeHasFocus = React.useCallback(function (newHasFocus) {
    if (onFocusedViewChange) {
      onFocusedViewChange(newHasFocus);
    }
  }, [onFocusedViewChange]);
  var handleDaySelect = React.useCallback(function (day) {
    var isFinish = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'finish';

    if (readOnly) {
      return;
    }

    onSelectedDaysChange(day, isFinish);
  }, [onSelectedDaysChange, readOnly]);
  var focusDay = React.useCallback(function (day) {
    if (!isDateDisabled(day)) {
      onFocusedDayChange(day);
      setInternalFocusedDay(day);
      changeHasFocus(true);
    }
  }, [isDateDisabled, onFocusedDayChange, changeHasFocus]);
  var theme = useTheme();

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
          var newFocusedDayDefault = utils.addDays(day, theme.direction === 'ltr' ? -1 : 1);
          var nextAvailableMonth = theme.direction === 'ltr' ? utils.getPreviousMonth(day) : utils.getNextMonth(day);
          var closestDayToFocus = findClosestEnabledDate({
            utils: utils,
            date: newFocusedDayDefault,
            minDate: theme.direction === 'ltr' ? utils.startOfMonth(nextAvailableMonth) : newFocusedDayDefault,
            maxDate: theme.direction === 'ltr' ? newFocusedDayDefault : utils.endOfMonth(nextAvailableMonth),
            isDateDisabled: isDateDisabled
          });
          focusDay(closestDayToFocus || newFocusedDayDefault);
          event.preventDefault();
          break;
        }

      case 'ArrowRight':
        {
          var _newFocusedDayDefault = utils.addDays(day, theme.direction === 'ltr' ? 1 : -1);

          var _nextAvailableMonth = theme.direction === 'ltr' ? utils.getNextMonth(day) : utils.getPreviousMonth(day);

          var _closestDayToFocus = findClosestEnabledDate({
            utils: utils,
            date: _newFocusedDayDefault,
            minDate: theme.direction === 'ltr' ? _newFocusedDayDefault : utils.startOfMonth(_nextAvailableMonth),
            maxDate: theme.direction === 'ltr' ? utils.endOfMonth(_nextAvailableMonth) : _newFocusedDayDefault,
            isDateDisabled: isDateDisabled
          });

          focusDay(_closestDayToFocus || _newFocusedDayDefault);
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

  var currentMonthNumber = utils.getMonth(currentMonth);
  var validSelectedDays = selectedDays.filter(function (day) {
    return !!day;
  }).map(function (day) {
    return utils.startOfDay(day);
  }); // need a new ref whenever the `key` of the transition changes: http://reactcommunity.org/react-transition-group/transition/#Transition-prop-nodeRef.

  var transitionKey = currentMonthNumber; // eslint-disable-next-line react-hooks/exhaustive-deps

  var slideNodeRef = React.useMemo(function () {
    return /*#__PURE__*/React.createRef();
  }, [transitionKey]);
  var startOfCurrentWeek = utils.startOfWeek(now);
  var focusableDay = React.useMemo(function () {
    var startOfMonth = utils.startOfMonth(currentMonth);
    var endOfMonth = utils.endOfMonth(currentMonth);

    if (isDateDisabled(internalFocusedDay) || utils.isAfterDay(internalFocusedDay, endOfMonth) || utils.isBeforeDay(internalFocusedDay, startOfMonth)) {
      return findClosestEnabledDate({
        utils: utils,
        date: internalFocusedDay,
        minDate: startOfMonth,
        maxDate: endOfMonth,
        disablePast: disablePast,
        disableFuture: disableFuture,
        isDateDisabled: isDateDisabled
      });
    }

    return internalFocusedDay;
  }, [currentMonth, disableFuture, disablePast, internalFocusedDay, isDateDisabled, utils]);
  return /*#__PURE__*/_jsxs("div", {
    role: "grid",
    "aria-labelledby": gridLabelId,
    children: [/*#__PURE__*/_jsx(PickersCalendarDayHeader, {
      role: "row",
      className: classes.header,
      children: utils.getWeekdays().map(function (day, i) {
        var _dayOfWeekFormatter;

        return /*#__PURE__*/_jsx(PickersCalendarWeekDayLabel, {
          variant: "caption",
          role: "columnheader",
          "aria-label": utils.format(utils.addDays(startOfCurrentWeek, i), 'weekday'),
          className: classes.weekDayLabel,
          children: (_dayOfWeekFormatter = dayOfWeekFormatter == null ? void 0 : dayOfWeekFormatter(day)) != null ? _dayOfWeekFormatter : day
        }, day + i.toString());
      })
    }), loading ? /*#__PURE__*/_jsx(PickersCalendarLoadingContainer, {
      className: classes.loadingContainer,
      children: renderLoading()
    }) : /*#__PURE__*/_jsx(PickersCalendarSlideTransition, _extends({
      transKey: transitionKey,
      onExited: onMonthSwitchingAnimationEnd,
      reduceAnimations: reduceAnimations,
      slideDirection: slideDirection,
      className: clsx(className, classes.slideTransition)
    }, TransitionProps, {
      nodeRef: slideNodeRef,
      children: /*#__PURE__*/_jsx(PickersCalendarWeekContainer, {
        ref: slideNodeRef,
        role: "rowgroup",
        className: classes.monthContainer,
        children: utils.getWeekArray(currentMonth).map(function (week) {
          return /*#__PURE__*/_jsx(PickersCalendarWeek, {
            role: "row",
            className: classes.weekContainer,
            children: week.map(function (day) {
              var isFocusableDay = focusableDay !== null && utils.isSameDay(day, focusableDay);
              var isSelected = validSelectedDays.some(function (selectedDay) {
                return utils.isSameDay(selectedDay, day);
              });
              var isToday = utils.isSameDay(day, now);
              var pickersDayProps = {
                key: day == null ? void 0 : day.toString(),
                day: day,
                isAnimating: isMonthSwitchingAnimating,
                disabled: disabled || isDateDisabled(day),
                autoFocus: hasFocus && isFocusableDay,
                today: isToday,
                outsideCurrentMonth: utils.getMonth(day) !== currentMonthNumber,
                selected: isSelected,
                disableHighlightToday: disableHighlightToday,
                showDaysOutsideCurrentMonth: showDaysOutsideCurrentMonth,
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

              return renderDay ? renderDay(day, validSelectedDays, pickersDayProps) : /*#__PURE__*/_createElement(PickersDay, _extends({}, pickersDayProps, {
                key: pickersDayProps.key
              }));
            })
          }, "week-".concat(week[0]));
        })
      })
    }))]
  });
}