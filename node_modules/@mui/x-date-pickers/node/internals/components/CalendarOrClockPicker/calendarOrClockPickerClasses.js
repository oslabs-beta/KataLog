"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.calendarOrClockPickerClasses = void 0;
exports.getCalendarOrClockPickerUtilityClass = getCalendarOrClockPickerUtilityClass;

var _material = require("@mui/material");

function getCalendarOrClockPickerUtilityClass(slot) {
  return (0, _material.generateUtilityClass)('MuiCalendarOrClockPicker', slot);
}

const calendarOrClockPickerClasses = (0, _material.generateUtilityClasses)('MuiCalendarOrClockPicker', ['root', 'mobileKeyboardInputView']);
exports.calendarOrClockPickerClasses = calendarOrClockPickerClasses;