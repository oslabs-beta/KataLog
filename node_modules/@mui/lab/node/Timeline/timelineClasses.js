"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
exports.getTimelineUtilityClass = getTimelineUtilityClass;
var _generateUtilityClass = _interopRequireDefault(require("@mui/material/generateUtilityClass"));
var _generateUtilityClasses = _interopRequireDefault(require("@mui/material/generateUtilityClasses"));
function getTimelineUtilityClass(slot) {
  return (0, _generateUtilityClass.default)('MuiTimeline', slot);
}
const timelineClasses = (0, _generateUtilityClasses.default)('MuiTimeline', ['root', 'positionLeft', 'positionRight', 'positionAlternate']);
var _default = timelineClasses;
exports.default = _default;