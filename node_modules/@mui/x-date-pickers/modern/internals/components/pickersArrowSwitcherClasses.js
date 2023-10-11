import { generateUtilityClass, generateUtilityClasses } from '@mui/material';
export function getPickersArrowSwitcherUtilityClass(slot) {
  return generateUtilityClass('MuiPickersArrowSwitcher', slot);
}
export const pickersArrowSwitcherClasses = generateUtilityClasses('MuiPickersArrowSwitcher', ['root', 'spacer', 'button']);