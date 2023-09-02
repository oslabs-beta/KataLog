"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.parsePickerInputValue = exports.parseNonNullablePickerDate = exports.findClosestEnabledDate = void 0;

const findClosestEnabledDate = ({
  date,
  disableFuture,
  disablePast,
  maxDate,
  minDate,
  isDateDisabled,
  utils
}) => {
  const today = utils.startOfDay(utils.date());

  if (disablePast && utils.isBefore(minDate, today)) {
    minDate = today;
  }

  if (disableFuture && utils.isAfter(maxDate, today)) {
    maxDate = today;
  }

  let forward = date;
  let backward = date;

  if (utils.isBefore(date, minDate)) {
    forward = utils.date(minDate);
    backward = null;
  }

  if (utils.isAfter(date, maxDate)) {
    if (backward) {
      backward = utils.date(maxDate);
    }

    forward = null;
  }

  while (forward || backward) {
    if (forward && utils.isAfter(forward, maxDate)) {
      forward = null;
    }

    if (backward && utils.isBefore(backward, minDate)) {
      backward = null;
    }

    if (forward) {
      if (!isDateDisabled(forward)) {
        return forward;
      }

      forward = utils.addDays(forward, 1);
    }

    if (backward) {
      if (!isDateDisabled(backward)) {
        return backward;
      }

      backward = utils.addDays(backward, -1);
    }
  }

  return null;
};

exports.findClosestEnabledDate = findClosestEnabledDate;

const parsePickerInputValue = (utils, value) => {
  const parsedValue = utils.date(value);
  return utils.isValid(parsedValue) ? parsedValue : null;
};

exports.parsePickerInputValue = parsePickerInputValue;

const parseNonNullablePickerDate = (utils, value, defaultValue) => {
  if (value == null) {
    return defaultValue;
  }

  const parsedValue = utils.date(value);
  const isDateValid = utils.isValid(parsedValue);

  if (isDateValid) {
    return parsedValue;
  }

  return defaultValue;
};

exports.parseNonNullablePickerDate = parseNonNullablePickerDate;