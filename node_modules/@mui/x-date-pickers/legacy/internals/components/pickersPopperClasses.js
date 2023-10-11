import { generateUtilityClass, generateUtilityClasses } from '@mui/material';
export function getPickersPopperUtilityClass(slot) {
  return generateUtilityClass('MuiPickersPopper', slot);
}
export var pickersPopperClasses = generateUtilityClasses('MuiPickersPopper', ['root', 'paper']);