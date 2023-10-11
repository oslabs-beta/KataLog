"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getDayPickerUtilityClass = exports.dayPickerClasses = void 0;

var _material = require("@mui/material");

const getDayPickerUtilityClass = slot => (0, _material.generateUtilityClass)('MuiDayPicker', slot);

exports.getDayPickerUtilityClass = getDayPickerUtilityClass;
const dayPickerClasses = (0, _material.generateUtilityClasses)('MuiDayPicker', ['header', 'weekDayLabel', 'loadingContainer', 'slideTransition', 'monthContainer', 'weekContainer']);
exports.dayPickerClasses = dayPickerClasses;