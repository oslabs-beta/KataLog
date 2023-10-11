import { generateUtilityClass, generateUtilityClasses } from '@mui/material';
export var getPickersFadeTransitionGroupUtilityClass = function getPickersFadeTransitionGroupUtilityClass(slot) {
  return generateUtilityClass('MuiPickersFadeTransitionGroup', slot);
};
export var pickersFadeTransitionGroupClasses = generateUtilityClasses('MuiPickersFadeTransitionGroup', ['root']);