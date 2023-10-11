import { generateUtilityClass, generateUtilityClasses } from '@mui/material';
export function getPickersYearUtilityClass(slot) {
  // TODO v6: Rename 'PrivatePickersYear' to 'MuiPickersYear' to follow convention
  return generateUtilityClass('PrivatePickersYear', slot);
} // TODO v6: Rename 'PrivatePickersYear' to 'MuiPickersYear' to follow convention

export const pickersYearClasses = generateUtilityClasses('PrivatePickersYear', ['root', 'modeDesktop', 'modeMobile', 'yearButton', 'selected', 'disabled']);