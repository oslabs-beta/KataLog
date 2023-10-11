"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.validateTime = exports.useTimeValidation = void 0;

var _timeUtils = require("../../utils/time-utils");

var _useValidation = require("./useValidation");

const validateTime = ({
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
  const isAfter = (0, _timeUtils.createIsAfterIgnoreDatePart)(disableIgnoringDatePartForTimeValidation, adapter.utils);

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

exports.validateTime = validateTime;

const isSameTimeError = (a, b) => a === b;

const useTimeValidation = props => (0, _useValidation.useValidation)(props, validateTime, isSameTimeError);

exports.useTimeValidation = useTimeValidation;