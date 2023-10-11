import { generateUtilityClass, generateUtilityClasses } from '@mui/material';
export function getClockNumberUtilityClass(slot) {
  return generateUtilityClass('MuiClockNumber', slot);
}
export var clockNumberClasses = generateUtilityClasses('MuiClockNumber', ['root', 'selected', 'disabled']);