"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.pickersFadeTransitionGroupClasses = exports.getPickersFadeTransitionGroupUtilityClass = void 0;

var _material = require("@mui/material");

const getPickersFadeTransitionGroupUtilityClass = slot => (0, _material.generateUtilityClass)('MuiPickersFadeTransitionGroup', slot);

exports.getPickersFadeTransitionGroupUtilityClass = getPickersFadeTransitionGroupUtilityClass;
const pickersFadeTransitionGroupClasses = (0, _material.generateUtilityClasses)('MuiPickersFadeTransitionGroup', ['root']);
exports.pickersFadeTransitionGroupClasses = pickersFadeTransitionGroupClasses;