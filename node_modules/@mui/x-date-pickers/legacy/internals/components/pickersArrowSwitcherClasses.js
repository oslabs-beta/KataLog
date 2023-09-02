import { generateUtilityClass, generateUtilityClasses } from '@mui/material';
export function getPickersArrowSwitcherUtilityClass(slot) {
  return generateUtilityClass('MuiPickersArrowSwitcher', slot);
}
export var pickersArrowSwitcherClasses = generateUtilityClasses('MuiPickersArrowSwitcher', ['root', 'spacer', 'button']);