import generateUtilityClass from '@mui/material/generateUtilityClass';
import generateUtilityClasses from '@mui/material/generateUtilityClasses';
export function getMasonryUtilityClass(slot) {
  return generateUtilityClass('MuiMasonry', slot);
}
const masonryClasses = generateUtilityClasses('MuiMasonry', ['root']);
export default masonryClasses;