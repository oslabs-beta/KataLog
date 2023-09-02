import { createIsAfterIgnoreDatePart } from '../../utils/time-utils';
import { useValidation } from './useValidation';
export const validateTime = ({
  adapter,
  value,
  props
}) => {
  const {
    minTime,
    maxTime,
    minutesStep,
    shouldDisableTime,
    disableIgnoringDatePartForTimeValidation
  } = props;
  const date = adapter.utils.date(value);
  const isAfter = createIsAfterIgnoreDatePart(disableIgnoringDatePartForTimeValidation, adapter.utils);

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

const isSameTimeError = (a, b) => a === b;

export const useTimeValidation = props => useValidation(props, validateTime, isSameTimeError);