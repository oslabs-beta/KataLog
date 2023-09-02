import { generateUtilityClass, generateUtilityClasses } from '@mui/material';
export function getTimePickerToolbarUtilityClass(slot) {
  return generateUtilityClass('MuiTimePickerToolbar', slot);
}
export const timePickerToolbarClasses = generateUtilityClasses('MuiTimePickerToolbar', ['root', 'separator', 'hourMinuteLabel', 'hourMinuteLabelLandscape', 'hourMinuteLabelReverse', 'ampmSelection', 'ampmLandscape', 'ampmLabel']);