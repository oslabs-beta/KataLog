import { generateUtilityClass, generateUtilityClasses } from '@mui/material';
export const getPickersFadeTransitionGroupUtilityClass = slot => generateUtilityClass('MuiPickersFadeTransitionGroup', slot);
export const pickersFadeTransitionGroupClasses = generateUtilityClasses('MuiPickersFadeTransitionGroup', ['root']);