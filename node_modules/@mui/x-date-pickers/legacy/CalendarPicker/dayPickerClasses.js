import { generateUtilityClass, generateUtilityClasses } from '@mui/material';
export var getDayPickerUtilityClass = function getDayPickerUtilityClass(slot) {
  return generateUtilityClass('MuiDayPicker', slot);
};
export var dayPickerClasses = generateUtilityClasses('MuiDayPicker', ['header', 'weekDayLabel', 'loadingContainer', 'slideTransition', 'monthContainer', 'weekContainer']);