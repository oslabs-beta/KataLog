import _objectWithoutProperties from "@babel/runtime/helpers/esm/objectWithoutProperties";
var _excluded = ["minDate", "maxDate", "disableFuture", "shouldDisableDate", "disablePast"];
import { useValidation } from './useValidation';
import { validateDate } from './useDateValidation';
import { validateTime } from './useTimeValidation';
export var validateDateTime = function validateDateTime(_ref) {
  var props = _ref.props,
      value = _ref.value,
      adapter = _ref.adapter;

  var minDate = props.minDate,
      maxDate = props.maxDate,
      disableFuture = props.disableFuture,
      shouldDisableDate = props.shouldDisableDate,
      disablePast = props.disablePast,
      timeValidationProps = _objectWithoutProperties(props, _excluded);

  var dateValidationResult = validateDate({
    adapter: adapter,
    value: value,
    props: {
      minDate: minDate,
      maxDate: maxDate,
      disableFuture: disableFuture,
      shouldDisableDate: shouldDisableDate,
      disablePast: disablePast
    }
  });

  if (dateValidationResult !== null) {
    return dateValidationResult;
  }

  return validateTime({
    adapter: adapter,
    value: value,
    props: timeValidationProps
  });
};

var isSameDateTimeError = function isSameDateTimeError(a, b) {
  return a === b;
};

export function useDateTimeValidation(props) {
  return useValidation(props, validateDateTime, isSameDateTimeError);
}