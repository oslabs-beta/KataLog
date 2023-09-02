import { generateUtilityClass, generateUtilityClasses } from '@mui/material';
export function getClockPointerUtilityClass(slot) {
  return generateUtilityClass('MuiClockPointer', slot);
}
export var clockPointerClasses = generateUtilityClasses('MuiClockPointer', ['root', 'thumb']);