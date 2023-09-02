"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
exports.getTimelineSeparatorUtilityClass = getTimelineSeparatorUtilityClass;
var _generateUtilityClass = _interopRequireDefault(require("@mui/material/generateUtilityClass"));
var _generateUtilityClasses = _interopRequireDefault(require("@mui/material/generateUtilityClasses"));
function getTimelineSeparatorUtilityClass(slot) {
  return (0, _generateUtilityClass.default)('MuiTimelineSeparator', slot);
}
const timelineSeparatorClasses = (0, _generateUtilityClasses.default)('MuiTimelineSeparator', ['root']);
var _default = timelineSeparatorClasses;
exports.default = _default;