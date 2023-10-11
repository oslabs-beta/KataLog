import { generateUtilityClass, generateUtilityClasses } from '@mui/material';
export function getPickersPopperUtilityClass(slot) {
  return generateUtilityClass('MuiPickersPopper', slot);
}
export const pickersPopperClasses = generateUtilityClasses('MuiPickersPopper', ['root', 'paper']);