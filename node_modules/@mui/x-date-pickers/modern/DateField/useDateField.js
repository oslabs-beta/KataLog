import _objectWithoutPropertiesLoose from "@babel/runtime/helpers/esm/objectWithoutPropertiesLoose";
import _extends from "@babel/runtime/helpers/esm/extends";
const _excluded = ["value", "defaultValue", "format", "onChange", "readOnly", "onError", "shouldDisableDate", "minDate", "maxDate", "disableFuture", "disablePast"];
import { datePickerValueManager } from '../DatePicker/shared';
import { useField, splitFormatIntoSections, addPositionPropertiesToSections, createDateStrFromSections } from '../internals/hooks/useField';
import { isSameDateError, validateDate } from '../internals/hooks/validation/useDateValidation';
import { parseNonNullablePickerDate } from '../internals/utils/date-utils';
import { useUtils, useDefaultDates } from '../internals/hooks/useUtils';
const dateRangeFieldValueManager = {
  getSectionsFromValue: (utils, prevSections, date, format) => addPositionPropertiesToSections(splitFormatIntoSections(utils, format, date)),
  getValueStrFromSections: sections => createDateStrFromSections(sections),
  getValueFromSections: (utils, prevSections, sections, format) => {
    const dateStr = createDateStrFromSections(sections);
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
  isSameError: isSameDateError
};

const useDefaultizedDateField = props => {
  const utils = useUtils();
  const defaultDates = useDefaultDates();
  return _extends({
    disablePast: false,
    disableFuture: false
  }, props, {
    minDate: parseNonNullablePickerDate(utils, props.minDate, defaultDates.minDate),
    maxDate: parseNonNullablePickerDate(utils, props.maxDate, defaultDates.maxDate)
  });
};

export const useDateField = inProps => {
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
        other = _objectWithoutPropertiesLoose(_useDefaultizedDateFi, _excluded);

  return useField({
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
    valueManager: datePickerValueManager,
    fieldValueManager: dateRangeFieldValueManager,
    // TODO: Support time validation.
    validator: validateDate
  });
};