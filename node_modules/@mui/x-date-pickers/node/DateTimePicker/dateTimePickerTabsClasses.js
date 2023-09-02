"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.dateTimePickerTabsClasses = void 0;
exports.getDateTimePickerTabsUtilityClass = getDateTimePickerTabsUtilityClass;

var _material = require("@mui/material");

function getDateTimePickerTabsUtilityClass(slot) {
  return (0, _material.generateUtilityClass)('MuiDateTimePickerTabs', slot);
}

const dateTimePickerTabsClasses = (0, _material.generateUtilityClasses)('MuiDateTimePickerTabs', ['root']);
exports.dateTimePickerTabsClasses = dateTimePickerTabsClasses;