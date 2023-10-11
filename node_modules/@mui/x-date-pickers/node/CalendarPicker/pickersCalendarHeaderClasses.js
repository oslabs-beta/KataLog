"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.pickersCalendarHeaderClasses = exports.getPickersCalendarHeaderUtilityClass = void 0;

var _material = require("@mui/material");

const getPickersCalendarHeaderUtilityClass = slot => (0, _material.generateUtilityClass)('MuiPickersCalendarHeader', slot);

exports.getPickersCalendarHeaderUtilityClass = getPickersCalendarHeaderUtilityClass;
const pickersCalendarHeaderClasses = (0, _material.generateUtilityClasses)('MuiPickersCalendarHeader', ['root', 'labelContainer', 'label', 'switchViewButton', 'switchViewIcon']);
exports.pickersCalendarHeaderClasses = pickersCalendarHeaderClasses;