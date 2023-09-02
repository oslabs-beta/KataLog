"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getPickersYearUtilityClass = getPickersYearUtilityClass;
exports.pickersYearClasses = void 0;

var _material = require("@mui/material");

function getPickersYearUtilityClass(slot) {
  // TODO v6: Rename 'PrivatePickersYear' to 'MuiPickersYear' to follow convention
  return (0, _material.generateUtilityClass)('PrivatePickersYear', slot);
} // TODO v6: Rename 'PrivatePickersYear' to 'MuiPickersYear' to follow convention


const pickersYearClasses = (0, _material.generateUtilityClasses)('PrivatePickersYear', ['root', 'modeDesktop', 'modeMobile', 'yearButton', 'selected', 'disabled']);
exports.pickersYearClasses = pickersYearClasses;