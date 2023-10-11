"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.dateTimePickerToolbarClasses = void 0;
exports.getDateTimePickerToolbarUtilityClass = getDateTimePickerToolbarUtilityClass;

var _material = require("@mui/material");

function getDateTimePickerToolbarUtilityClass(slot) {
  return (0, _material.generateUtilityClass)('MuiDateTimePickerToolbar', slot);
}

const dateTimePickerToolbarClasses = (0, _material.generateUtilityClasses)('MuiDateTimePickerToolbar', ['root', 'dateContainer', 'timeContainer', 'separator']);
exports.dateTimePickerToolbarClasses = dateTimePickerToolbarClasses;