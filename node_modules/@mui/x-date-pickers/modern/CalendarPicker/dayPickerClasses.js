import { generateUtilityClass, generateUtilityClasses } from '@mui/material';
export const getDayPickerUtilityClass = slot => generateUtilityClass('MuiDayPicker', slot);
export const dayPickerClasses = generateUtilityClasses('MuiDayPicker', ['header', 'weekDayLabel', 'loadingContainer', 'slideTransition', 'monthContainer', 'weekContainer']);