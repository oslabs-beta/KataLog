import { generateUtilityClass, generateUtilityClasses } from '@mui/material';
export function getDatePickerToolbarUtilityClass(slot) {
  return generateUtilityClass('MuiDatePickerToolbar', slot);
}
export const datePickerToolbarClasses = generateUtilityClasses('MuiDatePickerToolbar', ['root', 'title']);