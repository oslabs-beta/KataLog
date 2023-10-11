"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getPickersPopperUtilityClass = getPickersPopperUtilityClass;
exports.pickersPopperClasses = void 0;

var _material = require("@mui/material");

function getPickersPopperUtilityClass(slot) {
  return (0, _material.generateUtilityClass)('MuiPickersPopper', slot);
}

const pickersPopperClasses = (0, _material.generateUtilityClasses)('MuiPickersPopper', ['root', 'paper']);
exports.pickersPopperClasses = pickersPopperClasses;