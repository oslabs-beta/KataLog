import { generateUtilityClass, generateUtilityClasses } from '@mui/material';
export function getPickersToolbarButtonUtilityClass(slot) {
  return generateUtilityClass('MuiPickersToolbarButton', slot);
}
export var pickersToolbarButtonClasses = generateUtilityClasses('MuiPickersToolbarButton', ['root']);