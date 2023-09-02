import { generateUtilityClass, generateUtilityClasses } from '@mui/material';
export function getPickersToolbarUtilityClass(slot) {
  return generateUtilityClass('MuiPickersToolbar', slot);
}
export const pickersToolbarClasses = generateUtilityClasses('MuiPickersToolbar', ['root', 'content', 'penIconButton', 'penIconButtonLandscape']);