"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getPickersArrowSwitcherUtilityClass = getPickersArrowSwitcherUtilityClass;
exports.pickersArrowSwitcherClasses = void 0;

var _material = require("@mui/material");

function getPickersArrowSwitcherUtilityClass(slot) {
  return (0, _material.generateUtilityClass)('MuiPickersArrowSwitcher', slot);
}

const pickersArrowSwitcherClasses = (0, _material.generateUtilityClasses)('MuiPickersArrowSwitcher', ['root', 'spacer', 'button']);
exports.pickersArrowSwitcherClasses = pickersArrowSwitcherClasses;