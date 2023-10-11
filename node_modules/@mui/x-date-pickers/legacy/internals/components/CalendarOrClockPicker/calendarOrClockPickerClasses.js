import { generateUtilityClass, generateUtilityClasses } from '@mui/material';
export function getCalendarOrClockPickerUtilityClass(slot) {
  return generateUtilityClass('MuiCalendarOrClockPicker', slot);
}
export var calendarOrClockPickerClasses = generateUtilityClasses('MuiCalendarOrClockPicker', ['root', 'mobileKeyboardInputView']);