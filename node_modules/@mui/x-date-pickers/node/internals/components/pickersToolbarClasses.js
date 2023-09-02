"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getPickersToolbarUtilityClass = getPickersToolbarUtilityClass;
exports.pickersToolbarClasses = void 0;

var _material = require("@mui/material");

function getPickersToolbarUtilityClass(slot) {
  return (0, _material.generateUtilityClass)('MuiPickersToolbar', slot);
}

const pickersToolbarClasses = (0, _material.generateUtilityClasses)('MuiPickersToolbar', ['root', 'content', 'penIconButton', 'penIconButtonLandscape']);
exports.pickersToolbarClasses = pickersToolbarClasses;