import { generateUtilityClass, generateUtilityClasses } from '@mui/material';
export const getPickersSlideTransitionUtilityClass = slot => // TODO v6: Rename 'PrivatePickersSlideTransition' to 'MuiPickersSlideTransition' to follow convention
generateUtilityClass('PrivatePickersSlideTransition', slot);
export const pickersSlideTransitionClasses = generateUtilityClasses( // TODO v6: Rename 'PrivatePickersSlideTransition' to 'MuiPickersSlideTransition' to follow convention
'PrivatePickersSlideTransition', ['root', 'slideEnter-left', 'slideEnter-right', 'slideEnterActive', 'slideExit', 'slideExitActiveLeft-left', 'slideExitActiveLeft-right']);