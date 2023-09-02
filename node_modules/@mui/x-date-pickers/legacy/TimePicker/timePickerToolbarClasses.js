import { generateUtilityClass, generateUtilityClasses } from '@mui/material';
export function getTimePickerToolbarUtilityClass(slot) {
  return generateUtilityClass('MuiTimePickerToolbar', slot);
}
export var timePickerToolbarClasses = generateUtilityClasses('MuiTimePickerToolbar', ['root', 'separator', 'hourMinuteLabel', 'hourMinuteLabelLandscape', 'hourMinuteLabelReverse', 'ampmSelection', 'ampmLandscape', 'ampmLabel']);