import { createIsAfterIgnoreDatePart } from '../../utils/time-utils';
import { useValidation } from './useValidation';
export var validateTime = function validateTime(_ref) {
  var adapter = _ref.adapter,
      value = _ref.value,
      props = _ref.props;
  var minTime = props.minTime,
      maxTime = props.maxTime,
      minutesStep = props.minutesStep,
      shouldDisableTime = props.shouldDisableTime,
      disableIgnoringDatePartForTimeValidation = props.disableIgnoringDatePartForTimeValidation;
  var date = adapter.utils.date(value);
  var isAfter = createIsAfterIgnoreDatePart(disableIgnoringDatePartForTimeValidation, adapter.utils);

  if (value === null) {
    return null;
  }

  switch (true) {
    case !adapter.utils.isValid(value):
      return 'invalidDate';

    case Boolean(minTime && isAfter(minTime, date)):
      return 'minTime';

    case Boolean(maxTime && isAfter(date, maxTime)):
      return 'maxTime';

    case Boolean(shouldDisableTime && shouldDisableTime(adapter.utils.getHours(date), 'hours')):
      return 'shouldDisableTime-hours';

    case Boolean(shouldDisableTime && shouldDisableTime(adapter.utils.getMinutes(date), 'minutes')):
      return 'shouldDisableTime-minutes';

    case Boolean(shouldDisableTime && shouldDisableTime(adapter.utils.getSeconds(date), 'seconds')):
      return 'shouldDisableTime-seconds';

    case Boolean(minutesStep && adapter.utils.getMinutes(date) % minutesStep !== 0):
      return 'minutesStep';

    default:
      return null;
  }
};

var isSameTimeError = function isSameTimeError(a, b) {
  return a === b;
};

export var useTimeValidation = function useTimeValidation(props) {
  return useValidation(props, validateTime, isSameTimeError);
};