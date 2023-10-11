import { generateUtilityClass, generateUtilityClasses } from '@mui/material';
export function getClockUtilityClass(slot) {
  return generateUtilityClass('MuiClock', slot);
}
export const clockClasses = generateUtilityClasses('MuiClock', ['root', 'clock', 'wrapper', 'squareMask', 'pin', 'amButton', 'pmButton']);