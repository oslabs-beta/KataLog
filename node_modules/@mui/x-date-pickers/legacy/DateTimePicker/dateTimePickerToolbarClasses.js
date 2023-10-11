import { generateUtilityClass, generateUtilityClasses } from '@mui/material';
export function getDateTimePickerToolbarUtilityClass(slot) {
  return generateUtilityClass('MuiDateTimePickerToolbar', slot);
}
export var dateTimePickerToolbarClasses = generateUtilityClasses('MuiDateTimePickerToolbar', ['root', 'dateContainer', 'timeContainer', 'separator']);