import _extends from "@babel/runtime/helpers/esm/extends";
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
  return composeClasses(slots, getDayPickerUtilityClass, classes);
};

const defaultDayOfWeekFormatter = day => day.charAt(0).toUpperCase();

const weeksContainerHeight = (DAY_SIZE + DAY_MARGIN * 2) * 6;
const PickersCalendarDayHeader = styled('div', {
  name: 'MuiDayPicker',
  slot: 'Header',
  overridesResolver: (_, styles) => styles.header
})({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center'
});
const PickersCalendarWeekDayLabel = styled(Typography, {
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
const PickersCalendarLoadingContainer = styled('div', {
  name: 'MuiDayPicker',
  slot: 'LoadingContainer',
  overridesResolver: (_, styles) => styles.loadingContainer
})({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  minHeight: weeksContainerHeight
});
const PickersCalendarSlideTransition = styled(PickersSlideTransition, {
  name: 'MuiDayPicker',
  slot: 'SlideTransition',
  overridesResolver: (_, styles) => styles.slideTransition
})({
  minHeight: weeksContainerHeight
});
const PickersCalendarWeekContainer = styled('div', {
  name: 'MuiDayPicker',
  slot: 'MonthContainer',
  overridesResolver: (_, styles) => styles.monthContainer
})({
  overflow: 'hidden'
});
const PickersCalendarWeek = styled('div', {
  name: 'MuiDayPicker',
  slot: 'WeekContainer',
  overridesResolver: (_, styles) => styles.weekContainer
})({
  margin: `${DAY_MARGIN}px 0`,
  display: 'flex',
  justifyContent: 'center'
});
/**
 * @ignore - do not document.
 */

export function DayPicker(inProps) {
  const now = useNow();
  const utils = useUtils();
  const props = useThemeProps({
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
    renderLoading = () => /*#__PURE__*/_jsx("span", {
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
  const isDateDisabled = useIsDayDisabled({
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
  const theme = useTheme();

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
          const closestDayToFocus = findClosestEnabledDate({
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
          const closestDayToFocus = findClosestEnabledDate({
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
      return findClosestEnabledDate({
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
  return /*#__PURE__*/_jsxs("div", {
    role: "grid",
    "aria-labelledby": gridLabelId,
    children: [/*#__PURE__*/_jsx(PickersCalendarDayHeader, {
      role: "row",
      className: classes.header,
      children: utils.getWeekdays().map((day, i) => {
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
        children: utils.getWeekArray(currentMonth).map(week => /*#__PURE__*/_jsx(PickersCalendarWeek, {
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

            return renderDay ? renderDay(day, validSelectedDays, pickersDayProps) : /*#__PURE__*/_createElement(PickersDay, _extends({}, pickersDayProps, {
              key: pickersDayProps.key
            }));
          })
        }, `week-${week[0]}`))
      })
    }))]
  });
}