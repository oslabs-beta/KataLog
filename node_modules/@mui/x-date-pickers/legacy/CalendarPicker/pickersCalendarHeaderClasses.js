import { generateUtilityClass, generateUtilityClasses } from '@mui/material';
export var getPickersCalendarHeaderUtilityClass = function getPickersCalendarHeaderUtilityClass(slot) {
  return generateUtilityClass('MuiPickersCalendarHeader', slot);
};
export var pickersCalendarHeaderClasses = generateUtilityClasses('MuiPickersCalendarHeader', ['root', 'labelContainer', 'label', 'switchViewButton', 'switchViewIcon']);