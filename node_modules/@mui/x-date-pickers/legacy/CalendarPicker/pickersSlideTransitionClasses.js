import { generateUtilityClass, generateUtilityClasses } from '@mui/material';
export var getPickersSlideTransitionUtilityClass = function getPickersSlideTransitionUtilityClass(slot) {
  return (// TODO v6: Rename 'PrivatePickersSlideTransition' to 'MuiPickersSlideTransition' to follow convention
    generateUtilityClass('PrivatePickersSlideTransition', slot)
  );
};
export var pickersSlideTransitionClasses = generateUtilityClasses( // TODO v6: Rename 'PrivatePickersSlideTransition' to 'MuiPickersSlideTransition' to follow convention
'PrivatePickersSlideTransition', ['root', 'slideEnter-left', 'slideEnter-right', 'slideEnterActive', 'slideExit', 'slideExitActiveLeft-left', 'slideExitActiveLeft-right']);