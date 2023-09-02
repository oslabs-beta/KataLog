import generateUtilityClass from '@mui/material/generateUtilityClass';
import generateUtilityClasses from '@mui/material/generateUtilityClasses';
export function getTimelineOppositeContentUtilityClass(slot) {
  return generateUtilityClass('MuiTimelineOppositeContent', slot);
}
const timelineOppositeContentClasses = generateUtilityClasses('MuiTimelineOppositeContent', ['root', 'positionLeft', 'positionRight', 'positionAlternate']);
export default timelineOppositeContentClasses;