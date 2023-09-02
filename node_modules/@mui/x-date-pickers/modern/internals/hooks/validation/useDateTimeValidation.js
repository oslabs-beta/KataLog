import _objectWithoutPropertiesLoose from "@babel/runtime/helpers/esm/objectWithoutPropertiesLoose";
const _excluded = ["minDate", "maxDate", "disableFuture", "shouldDisableDate", "disablePast"];
import { useValidation } from './useValidation';
import { validateDate } from './useDateValidation';
import { validateTime } from './useTimeValidation';
export const validateDateTime = ({
  props,
  value,
  adapter
}) => {
  const {
    minDate,
    maxDate,
    disableFuture,
    shouldDisableDate,
    disablePast
  } = props,
        timeValidationProps = _objectWithoutPropertiesLoose(props, _excluded);

  const dateValidationResult = validateDate({
    adapter,
    value,
    props: {
      minDate,
      maxDate,
      disableFuture,
      shouldDisableDate,
      disablePast
    }
  });

  if (dateValidationResult !== null) {
    return dateValidationResult;
  }

  return validateTime({
    adapter,
    value,
    props: timeValidationProps
  });
};

const isSameDateTimeError = (a, b) => a === b;

export function useDateTimeValidation(props) {
  return useValidation(props, validateDateTime, isSameDateTimeError);
}