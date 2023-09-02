import { generateUtilityClass, generateUtilityClasses } from '@mui/material';
export function getDateTimePickerTabsUtilityClass(slot) {
  return generateUtilityClass('MuiDateTimePickerTabs', slot);
}
export const dateTimePickerTabsClasses = generateUtilityClasses('MuiDateTimePickerTabs', ['root']);