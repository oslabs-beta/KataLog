"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.clockPointerClasses = void 0;
exports.getClockPointerUtilityClass = getClockPointerUtilityClass;

var _material = require("@mui/material");

function getClockPointerUtilityClass(slot) {
  return (0, _material.generateUtilityClass)('MuiClockPointer', slot);
}

const clockPointerClasses = (0, _material.generateUtilityClasses)('MuiClockPointer', ['root', 'thumb']);
exports.clockPointerClasses = clockPointerClasses;