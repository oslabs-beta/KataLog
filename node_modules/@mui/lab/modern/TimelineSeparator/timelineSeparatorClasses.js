import generateUtilityClass from '@mui/material/generateUtilityClass';
import generateUtilityClasses from '@mui/material/generateUtilityClasses';
export function getTimelineSeparatorUtilityClass(slot) {
  return generateUtilityClass('MuiTimelineSeparator', slot);
}
const timelineSeparatorClasses = generateUtilityClasses('MuiTimelineSeparator', ['root']);
export default timelineSeparatorClasses;