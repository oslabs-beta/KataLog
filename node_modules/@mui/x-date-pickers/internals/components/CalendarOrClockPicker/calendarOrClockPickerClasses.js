import { generateUtilityClass, generateUtilityClasses } from '@mui/material';
export function getCalendarOrClockPickerUtilityClass(slot) {
  return generateUtilityClass('MuiCalendarOrClockPicker', slot);
}
export const calendarOrClockPickerClasses = generateUtilityClasses('MuiCalendarOrClockPicker', ['root', 'mobileKeyboardInputView']);