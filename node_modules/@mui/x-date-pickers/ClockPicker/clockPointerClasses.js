import { generateUtilityClass, generateUtilityClasses } from '@mui/material';
export function getClockPointerUtilityClass(slot) {
  return generateUtilityClass('MuiClockPointer', slot);
}
export const clockPointerClasses = generateUtilityClasses('MuiClockPointer', ['root', 'thumb']);