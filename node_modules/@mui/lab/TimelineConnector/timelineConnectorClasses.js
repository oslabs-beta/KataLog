import generateUtilityClass from '@mui/material/generateUtilityClass';
import generateUtilityClasses from '@mui/material/generateUtilityClasses';
export function getTimelineConnectorUtilityClass(slot) {
  return generateUtilityClass('MuiTimelineConnector', slot);
}
const timelineConnectorClasses = generateUtilityClasses('MuiTimelineConnector', ['root']);
export default timelineConnectorClasses;