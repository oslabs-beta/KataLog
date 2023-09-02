import generateUtilityClass from '@mui/material/generateUtilityClass';
import generateUtilityClasses from '@mui/material/generateUtilityClasses';
export function getTabPanelUtilityClass(slot) {
  return generateUtilityClass('MuiTabPanel', slot);
}
const tabPanelClasses = generateUtilityClasses('MuiTabPanel', ['root']);
export default tabPanelClasses;