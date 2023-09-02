import { generateUtilityClass, generateUtilityClasses } from '@mui/material';
export function getPickersToolbarTextUtilityClass(slot) {
  // TODO v6: Rename 'PrivatePickersToolbarText' to 'MuiPickersToolbarText' to follow convention
  return generateUtilityClass('PrivatePickersToolbarText', slot);
} // TODO v6: Rename 'PrivatePickersToolbarText' to 'MuiPickersToolbarText' to follow convention

export const pickersToolbarTextClasses = generateUtilityClasses('PrivatePickersToolbarText', ['root', 'selected']);