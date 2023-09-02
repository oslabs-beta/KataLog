"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.datePickerToolbarClasses = void 0;
exports.getDatePickerToolbarUtilityClass = getDatePickerToolbarUtilityClass;

var _material = require("@mui/material");

function getDatePickerToolbarUtilityClass(slot) {
  return (0, _material.generateUtilityClass)('MuiDatePickerToolbar', slot);
}

const datePickerToolbarClasses = (0, _material.generateUtilityClasses)('MuiDatePickerToolbar', ['root', 'title']);
exports.datePickerToolbarClasses = datePickerToolbarClasses;