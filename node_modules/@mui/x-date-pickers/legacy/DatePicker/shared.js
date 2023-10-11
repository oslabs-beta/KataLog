import _extends from "@babel/runtime/helpers/esm/extends";
import { useThemeProps } from '@mui/material/styles';
import { useDefaultDates, useUtils } from '../internals/hooks/useUtils';
import { parsePickerInputValue, parseNonNullablePickerDate } from '../internals/utils/date-utils';
export var isYearOnlyView = function isYearOnlyView(views) {
  return views.length === 1 && views[0] === 'year';
};
export var isYearAndMonthViews = function isYearAndMonthViews(views) {
  return views.length === 2 && views.indexOf('month') !== -1 && views.indexOf('year') !== -1;
};

var getFormatAndMaskByViews = function getFormatAndMaskByViews(views, utils) {
  if (isYearOnlyView(views)) {
    return {
      inputFormat: utils.formats.year
    };
  }

  if (isYearAndMonthViews(views)) {
    return {
      disableMaskedInput: true,
      inputFormat: utils.formats.monthAndYear
    };
  }

  return {
    inputFormat: utils.formats.keyboardDate
  };
};

export function useDatePickerDefaultizedProps(props, name) {
  var _themeProps$views;

  var utils = useUtils();
  var defaultDates = useDefaultDates(); // This is technically unsound if the type parameters appear in optional props.
  // Optional props can be filled by `useThemeProps` with types that don't match the type parameters.

  var themeProps = useThemeProps({
    props: props,
    name: name
  });
  var views = (_themeProps$views = themeProps.views) != null ? _themeProps$views : ['year', 'day'];
  return _extends({
    openTo: 'day',
    disableFuture: false,
    disablePast: false
  }, getFormatAndMaskByViews(views, utils), themeProps, {
    views: views,
    minDate: parseNonNullablePickerDate(utils, themeProps.minDate, defaultDates.minDate),
    maxDate: parseNonNullablePickerDate(utils, themeProps.maxDate, defaultDates.maxDate)
  });
}
export var datePickerValueManager = {
  emptyValue: null,
  getTodayValue: function getTodayValue(utils) {
    return utils.date();
  },
  parseInput: parsePickerInputValue,
  areValuesEqual: function areValuesEqual(utils, a, b) {
    return utils.isEqual(a, b);
  }
};