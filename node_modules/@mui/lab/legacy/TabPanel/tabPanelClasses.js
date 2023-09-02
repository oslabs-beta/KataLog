import generateUtilityClass from '@mui/material/generateUtilityClass';
import generateUtilityClasses from '@mui/material/generateUtilityClasses';
export function getTabPanelUtilityClass(slot) {
  return generateUtilityClass('MuiTabPanel', slot);
}
var tabPanelClasses = generateUtilityClasses('MuiTabPanel', ['root']);
export default tabPanelClasses;