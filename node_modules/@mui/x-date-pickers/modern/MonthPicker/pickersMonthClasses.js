import { generateUtilityClass, generateUtilityClasses } from '@mui/material';
export function getPickersMonthUtilityClass(slot) {
  // TODO v6 Rename 'PrivatePickersMonth' to 'MuiPickersMonth' to follow convention
  return generateUtilityClass('PrivatePickersMonth', slot);
}
export const pickersMonthClasses = generateUtilityClasses( // TODO v6 Rename 'PrivatePickersMonth' to 'MuiPickersMonth' to follow convention
'PrivatePickersMonth', ['root', 'selected']);