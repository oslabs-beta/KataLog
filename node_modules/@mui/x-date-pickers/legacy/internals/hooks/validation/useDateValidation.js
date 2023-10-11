import * as React from 'react';
import { useValidation } from './useValidation';
import { useLocalizationContext } from '../useUtils';
import { parseNonNullablePickerDate } from '../../utils/date-utils';
export var validateDate = function validateDate(_ref) {
  var props = _ref.props,
      value = _ref.value,
      adapter = _ref.adapter;
  var now = adapter.utils.date();
  var date = adapter.utils.date(value);
  var minDate = parseNonNullablePickerDate(adapter.utils, props.minDate, adapter.defaultDates.minDate);
  var maxDate = parseNonNullablePickerDate(adapter.utils, props.maxDate, adapter.defaultDates.maxDate);

  if (date === null) {
    return null;
  }

  switch (true) {
    case !adapter.utils.isValid(value):
      return 'invalidDate';

    case Boolean(props.shouldDisableDate && props.shouldDisableDate(date)):
      return 'shouldDisableDate';

    case Boolean(props.disableFuture && adapter.utils.isAfterDay(date, now)):
      return 'disableFuture';

    case Boolean(props.disablePast && adapter.utils.isBeforeDay(date, now)):
      return 'disablePast';

    case Boolean(minDate && adapter.utils.isBeforeDay(date, minDate)):
      return 'minDate';

    case Boolean(maxDate && adapter.utils.isAfterDay(date, maxDate)):
      return 'maxDate';

    default:
      return null;
  }
};
export var useIsDayDisabled = function useIsDayDisabled(_ref2) {
  var shouldDisableDate = _ref2.shouldDisableDate,
      minDate = _ref2.minDate,
      maxDate = _ref2.maxDate,
      disableFuture = _ref2.disableFuture,
      disablePast = _ref2.disablePast;
  var adapter = useLocalizationContext();
  return React.useCallback(function (day) {
    return validateDate({
      adapter: adapter,
      value: day,
      props: {
        shouldDisableDate: shouldDisableDate,
        minDate: minDate,
        maxDate: maxDate,
        disableFuture: disableFuture,
        disablePast: disablePast
      }
    }) !== null;
  }, [adapter, shouldDisableDate, minDate, maxDate, disableFuture, disablePast]);
};
export var isSameDateError = function isSameDateError(a, b) {
  return a === b;
};
export var useDateValidation = function useDateValidation(props) {
  return useValidation(props, validateDate, isSameDateError);
};