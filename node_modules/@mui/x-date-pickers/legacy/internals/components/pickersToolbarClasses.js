import { generateUtilityClass, generateUtilityClasses } from '@mui/material';
export function getPickersToolbarUtilityClass(slot) {
  return generateUtilityClass('MuiPickersToolbar', slot);
}
export var pickersToolbarClasses = generateUtilityClasses('MuiPickersToolbar', ['root', 'content', 'penIconButton', 'penIconButtonLandscape']);