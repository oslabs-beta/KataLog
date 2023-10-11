"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getPickersToolbarTextUtilityClass = getPickersToolbarTextUtilityClass;
exports.pickersToolbarTextClasses = void 0;

var _material = require("@mui/material");

function getPickersToolbarTextUtilityClass(slot) {
  // TODO v6: Rename 'PrivatePickersToolbarText' to 'MuiPickersToolbarText' to follow convention
  return (0, _material.generateUtilityClass)('PrivatePickersToolbarText', slot);
} // TODO v6: Rename 'PrivatePickersToolbarText' to 'MuiPickersToolbarText' to follow convention


const pickersToolbarTextClasses = (0, _material.generateUtilityClasses)('PrivatePickersToolbarText', ['root', 'selected']);
exports.pickersToolbarTextClasses = pickersToolbarTextClasses;