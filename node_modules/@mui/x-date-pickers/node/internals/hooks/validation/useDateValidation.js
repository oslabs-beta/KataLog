"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.validateDate = exports.useIsDayDisabled = exports.useDateValidation = exports.isSameDateError = void 0;

var React = _interopRequireWildcard(require("react"));

var _useValidation = require("./useValidation");

var _useUtils = require("../useUtils");

var _dateUtils = require("../../utils/date-utils");

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

const validateDate = ({
  props,
  value,
  adapter
}) => {
  const now = adapter.utils.date();
  const date = adapter.utils.date(value);
  const minDate = (0, _dateUtils.parseNonNullablePickerDate)(adapter.utils, props.minDate, adapter.defaultDates.minDate);
  const maxDate = (0, _dateUtils.parseNonNullablePickerDate)(adapter.utils, props.maxDate, adapter.defaultDates.maxDate);

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

exports.validateDate = validateDate;

const useIsDayDisabled = ({
  shouldDisableDate,
  minDate,
  maxDate,
  disableFuture,
  disablePast
}) => {
  const adapter = (0, _useUtils.useLocalizationContext)();
  return React.useCallback(day => validateDate({
    adapter,
    value: day,
    props: {
      shouldDisableDate,
      minDate,
      maxDate,
      disableFuture,
      disablePast
    }
  }) !== null, [adapter, shouldDisableDate, minDate, maxDate, disableFuture, disablePast]);
};

exports.useIsDayDisabled = useIsDayDisabled;

const isSameDateError = (a, b) => a === b;

exports.isSameDateError = isSameDateError;

const useDateValidation = props => (0, _useValidation.useValidation)(props, validateDate, isSameDateError);

exports.useDateValidation = useDateValidation;