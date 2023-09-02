"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getPickersMonthUtilityClass = getPickersMonthUtilityClass;
exports.pickersMonthClasses = void 0;

var _material = require("@mui/material");

function getPickersMonthUtilityClass(slot) {
  // TODO v6 Rename 'PrivatePickersMonth' to 'MuiPickersMonth' to follow convention
  return (0, _material.generateUtilityClass)('PrivatePickersMonth', slot);
}

const pickersMonthClasses = (0, _material.generateUtilityClasses)( // TODO v6 Rename 'PrivatePickersMonth' to 'MuiPickersMonth' to follow convention
'PrivatePickersMonth', ['root', 'selected']);
exports.pickersMonthClasses = pickersMonthClasses;