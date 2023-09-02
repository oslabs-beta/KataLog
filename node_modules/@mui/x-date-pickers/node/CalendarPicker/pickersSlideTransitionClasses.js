"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.pickersSlideTransitionClasses = exports.getPickersSlideTransitionUtilityClass = void 0;

var _material = require("@mui/material");

const getPickersSlideTransitionUtilityClass = slot => // TODO v6: Rename 'PrivatePickersSlideTransition' to 'MuiPickersSlideTransition' to follow convention
(0, _material.generateUtilityClass)('PrivatePickersSlideTransition', slot);

exports.getPickersSlideTransitionUtilityClass = getPickersSlideTransitionUtilityClass;
const pickersSlideTransitionClasses = (0, _material.generateUtilityClasses)( // TODO v6: Rename 'PrivatePickersSlideTransition' to 'MuiPickersSlideTransition' to follow convention
'PrivatePickersSlideTransition', ['root', 'slideEnter-left', 'slideEnter-right', 'slideEnterActive', 'slideExit', 'slideExitActiveLeft-left', 'slideExitActiveLeft-right']);
exports.pickersSlideTransitionClasses = pickersSlideTransitionClasses;