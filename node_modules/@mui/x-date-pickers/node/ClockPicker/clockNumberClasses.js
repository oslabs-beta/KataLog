"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.clockNumberClasses = void 0;
exports.getClockNumberUtilityClass = getClockNumberUtilityClass;

var _material = require("@mui/material");

function getClockNumberUtilityClass(slot) {
  return (0, _material.generateUtilityClass)('MuiClockNumber', slot);
}

const clockNumberClasses = (0, _material.generateUtilityClasses)('MuiClockNumber', ['root', 'selected', 'disabled']);
exports.clockNumberClasses = clockNumberClasses;