import generateUtilityClass from '@mui/material/generateUtilityClass';
import generateUtilityClasses from '@mui/material/generateUtilityClasses';
export function getLoadingButtonUtilityClass(slot) {
  return generateUtilityClass('MuiLoadingButton', slot);
}
var loadingButtonClasses = generateUtilityClasses('MuiLoadingButton', ['root', 'loading', 'loadingIndicator', 'loadingIndicatorCenter', 'loadingIndicatorStart', 'loadingIndicatorEnd', 'endIconLoadingEnd', 'startIconLoadingStart']);
export default loadingButtonClasses;