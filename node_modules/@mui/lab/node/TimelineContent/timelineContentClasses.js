"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
exports.getTimelineContentUtilityClass = getTimelineContentUtilityClass;
var _generateUtilityClass = _interopRequireDefault(require("@mui/material/generateUtilityClass"));
var _generateUtilityClasses = _interopRequireDefault(require("@mui/material/generateUtilityClasses"));
function getTimelineContentUtilityClass(slot) {
  return (0, _generateUtilityClass.default)('MuiTimelineContent', slot);
}
const timelineContentClasses = (0, _generateUtilityClasses.default)('MuiTimelineContent', ['root', 'positionLeft', 'positionRight', 'positionAlternate']);
var _default = timelineContentClasses;
exports.default = _default;