import _objectWithoutProperties from "@babel/runtime/helpers/esm/objectWithoutProperties";
import _extends from "@babel/runtime/helpers/esm/extends";
var _excluded = ["value", "defaultValue", "format", "onChange", "readOnly", "onError", "shouldDisableDate", "minDate", "maxDate", "disableFuture", "disablePast"];
import { datePickerValueManager } from '../DatePicker/shared';
import { useField, splitFormatIntoSections, addPositionPropertiesToSections, createDateStrFromSections } from '../internals/hooks/useField';
import { isSameDateError, validateDate } from '../internals/hooks/validation/useDateValidation';
import { parseNonNullablePickerDate } from '../internals/utils/date-utils';
import { useUtils, useDefaultDates } from '../internals/hooks/useUtils';
var dateRangeFieldValueManager = {
  getSectionsFromValue: function getSectionsFromValue(utils, prevSections, date, format) {
    return addPositionPropertiesToSections(splitFormatIntoSections(utils, format, date));
  },
  getValueStrFromSections: function getValueStrFromSections(sections) {
    return createDateStrFromSections(sections);
  },
  getValueFromSections: function getValueFromSections(utils, prevSections, sections, format) {
    var dateStr = createDateStrFromSections(sections);
    var value = utils.parse(dateStr, format);
    return {
      value: value,
      shouldPublish: utils.isValid(value)
    };
  },
  getActiveDateFromActiveSection: function getActiveDateFromActiveSection(value) {
    return {
      value: value,
      update: function update(newActiveDate) {
        return newActiveDate;
      }
    };
  },
  hasError: function hasError(error) {
    return error != null;
  },
  isSameError: isSameDateError
};

var useDefaultizedDateField = function useDefaultizedDateField(props) {
  var utils = useUtils();
  var defaultDates = useDefaultDates();
  return _extends({
    disablePast: false,
    disableFuture: false
  }, props, {
    minDate: parseNonNullablePickerDate(utils, props.minDate, defaultDates.minDate),
    maxDate: parseNonNullablePickerDate(utils, props.maxDate, defaultDates.maxDate)
  });
};

export var useDateField = function useDateField(inProps) {
  var _useDefaultizedDateFi = useDefaultizedDateField(inProps),
      value = _useDefaultizedDateFi.value,
      defaultValue = _useDefaultizedDateFi.defaultValue,
      format = _useDefaultizedDateFi.format,
      onChange = _useDefaultizedDateFi.onChange,
      readOnly = _useDefaultizedDateFi.readOnly,
      onError = _useDefaultizedDateFi.onError,
      shouldDisableDate = _useDefaultizedDateFi.shouldDisableDate,
      minDate = _useDefaultizedDateFi.minDate,
      maxDate = _useDefaultizedDateFi.maxDate,
      disableFuture = _useDefaultizedDateFi.disableFuture,
      disablePast = _useDefaultizedDateFi.disablePast,
      other = _objectWithoutProperties(_useDefaultizedDateFi, _excluded);

  return useField({
    forwardedProps: other,
    internalProps: {
      value: value,
      defaultValue: defaultValue,
      format: format,
      onChange: onChange,
      readOnly: readOnly,
      onError: onError,
      shouldDisableDate: shouldDisableDate,
      minDate: minDate,
      maxDate: maxDate,
      disableFuture: disableFuture,
      disablePast: disablePast
    },
    valueManager: datePickerValueManager,
    fieldValueManager: dateRangeFieldValueManager,
    // TODO: Support time validation.
    validator: validateDate
  });
};