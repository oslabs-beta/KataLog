"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getPickersToolbarButtonUtilityClass = getPickersToolbarButtonUtilityClass;
exports.pickersToolbarButtonClasses = void 0;

var _material = require("@mui/material");

function getPickersToolbarButtonUtilityClass(slot) {
  return (0, _material.generateUtilityClass)('MuiPickersToolbarButton', slot);
}

const pickersToolbarButtonClasses = (0, _material.generateUtilityClasses)('MuiPickersToolbarButton', ['root']);
exports.pickersToolbarButtonClasses = pickersToolbarButtonClasses;