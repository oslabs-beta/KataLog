import { generateUtilityClass, generateUtilityClasses } from '@mui/material';
export function getDatePickerToolbarUtilityClass(slot) {
  return generateUtilityClass('MuiDatePickerToolbar', slot);
}
export var datePickerToolbarClasses = generateUtilityClasses('MuiDatePickerToolbar', ['root', 'title']);