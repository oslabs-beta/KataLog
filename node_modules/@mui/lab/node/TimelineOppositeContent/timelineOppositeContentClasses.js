"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
exports.getTimelineOppositeContentUtilityClass = getTimelineOppositeContentUtilityClass;
var _generateUtilityClass = _interopRequireDefault(require("@mui/material/generateUtilityClass"));
var _generateUtilityClasses = _interopRequireDefault(require("@mui/material/generateUtilityClasses"));
function getTimelineOppositeContentUtilityClass(slot) {
  return (0, _generateUtilityClass.default)('MuiTimelineOppositeContent', slot);
}
const timelineOppositeContentClasses = (0, _generateUtilityClasses.default)('MuiTimelineOppositeContent', ['root', 'positionLeft', 'positionRight', 'positionAlternate']);
var _default = timelineOppositeContentClasses;
exports.default = _default;