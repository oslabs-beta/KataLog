"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.clockClasses = void 0;
exports.getClockUtilityClass = getClockUtilityClass;

var _material = require("@mui/material");

function getClockUtilityClass(slot) {
  return (0, _material.generateUtilityClass)('MuiClock', slot);
}

const clockClasses = (0, _material.generateUtilityClasses)('MuiClock', ['root', 'clock', 'wrapper', 'squareMask', 'pin', 'amButton', 'pmButton']);
exports.clockClasses = clockClasses;