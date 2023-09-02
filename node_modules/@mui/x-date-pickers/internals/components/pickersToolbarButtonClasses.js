import { generateUtilityClass, generateUtilityClasses } from '@mui/material';
export function getPickersToolbarButtonUtilityClass(slot) {
  return generateUtilityClass('MuiPickersToolbarButton', slot);
}
export const pickersToolbarButtonClasses = generateUtilityClasses('MuiPickersToolbarButton', ['root']);