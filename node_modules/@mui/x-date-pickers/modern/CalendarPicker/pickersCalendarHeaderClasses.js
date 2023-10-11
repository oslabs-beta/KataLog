import { generateUtilityClass, generateUtilityClasses } from '@mui/material';
export const getPickersCalendarHeaderUtilityClass = slot => generateUtilityClass('MuiPickersCalendarHeader', slot);
export const pickersCalendarHeaderClasses = generateUtilityClasses('MuiPickersCalendarHeader', ['root', 'labelContainer', 'label', 'switchViewButton', 'switchViewIcon']);