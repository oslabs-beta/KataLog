"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useDateField = void 0;

var _objectWithoutPropertiesLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutPropertiesLoose"));

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _shared = require("../DatePicker/shared");

var _useField = require("../internals/hooks/useField");

var _useDateValidation = require("../internals/hooks/validation/useDateValidation");

var _dateUtils = require("../internals/utils/date-utils");

var _useUtils = require("../internals/hooks/useUtils");

const _excluded = ["value", "defaultValue", "format", "onChange", "readOnly", "onError", "shouldDisableDate", "minDate", "maxDate", "disableFuture", "disablePast"];
const dateRangeFieldValueManager = {
  getSectionsFromValue: (utils, prevSections, date, format) => (0, _useField.addPositionPropertiesToSections)((0, _useField.splitFormatIntoSections)(utils, format, date)),
  getValueStrFromSections: sections => (0, _useField.createDateStrFromSections)(sections),
  getValueFromSections: (utils, prevSections, sections, format) => {
    const dateStr = (0, _useField.createDateStrFromSections)(sections);
    const value = utils.parse(dateStr, format);
    return {
      value,
      shouldPublish: utils.isValid(value)
    };
  },
  getActiveDateFromActiveSection: value => ({
    value,
    update: newActiveDate => newActiveDate
  }),
  hasError: error => error != null,
  isSameError: _useDateValidation.isSameDateError
};

const useDefaultizedDateField = props => {
  const utils = (0, _useUtils.useUtils)();
  const defaultDates = (0, _useUtils.useDefaultDates)();
  return (0, _extends2.default)({
    disablePast: false,
    disableFuture: false
  }, props, {
    minDate: (0, _dateUtils.parseNonNullablePickerDate)(utils, props.minDate, defaultDates.minDate),
    maxDate: (0, _dateUtils.parseNonNullablePickerDate)(utils, props.maxDate, defaultDates.maxDate)
  });
};

const useDateField = inProps => {
  const _useDefaultizedDateFi = useDefaultizedDateField(inProps),
        {
    value,
    defaultValue,
    format,
    onChange,
    readOnly,
    onError,
    shouldDisableDate,
    minDate,
    maxDate,
    disableFuture,
    disablePast
  } = _useDefaultizedDateFi,
        other = (0, _objectWithoutPropertiesLoose2.default)(_useDefaultizedDateFi, _excluded);

  return (0, _useField.useField)({
    forwardedProps: other,
    internalProps: {
      value,
      defaultValue,
      format,
      onChange,
      readOnly,
      onError,
      shouldDisableDate,
      minDate,
      maxDate,
      disableFuture,
      disablePast
    },
    valueManager: _shared.datePickerValueManager,
    fieldValueManager: dateRangeFieldValueManager,
    // TODO: Support time validation.
    validator: _useDateValidation.validateDate
  });
};

exports.useDateField = useDateField;