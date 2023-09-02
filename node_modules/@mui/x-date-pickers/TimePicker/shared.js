import _extends from "@babel/runtime/helpers/esm/extends";
import { useThemeProps } from '@mui/material/styles';
import { Clock } from '../internals/components/icons';
import { useLocaleText, useUtils } from '../internals/hooks/useUtils';
import { parsePickerInputValue } from '../internals/utils/date-utils';
export function useTimePickerDefaultizedProps(props, name) {
  var _themeProps$ampm;

  // This is technically unsound if the type parameters appear in optional props.
  // Optional props can be filled by `useThemeProps` with types that don't match the type parameters.
  const themeProps = useThemeProps({
    props,
    name
  });
  const utils = useUtils();
  const ampm = (_themeProps$ampm = themeProps.ampm) != null ? _themeProps$ampm : utils.is12HourCycleInCurrentLocale();
  const localeText = useLocaleText();
  const getOpenDialogAriaText = localeText.openTimePickerDialogue;
  return _extends({
    ampm,
    openTo: 'hours',
    views: ['hours', 'minutes'],
    acceptRegex: ampm ? /[\dapAP]/gi : /\d/gi,
    disableMaskedInput: false,
    getOpenDialogAriaText,
    inputFormat: ampm ? utils.formats.fullTime12h : utils.formats.fullTime24h
  }, themeProps, {
    components: _extends({
      OpenPickerIcon: Clock
    }, themeProps.components)
  });
}
export const timePickerValueManager = {
  emptyValue: null,
  parseInput: parsePickerInputValue,
  getTodayValue: utils => utils.date(),
  areValuesEqual: (utils, a, b) => utils.isEqual(a, b),
  valueReducer: (utils, lastValidValue, newValue) => {
    if (!lastValidValue || !utils.isValid(newValue)) {
      return newValue;
    }

    return utils.mergeDateAndTime(lastValidValue, newValue);
  }
};