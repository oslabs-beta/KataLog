"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
exports.getTreeViewUtilityClass = getTreeViewUtilityClass;
var _generateUtilityClass = _interopRequireDefault(require("@mui/material/generateUtilityClass"));
var _generateUtilityClasses = _interopRequireDefault(require("@mui/material/generateUtilityClasses"));
function getTreeViewUtilityClass(slot) {
  return (0, _generateUtilityClass.default)('MuiTreeView', slot);
}
const treeViewClasses = (0, _generateUtilityClasses.default)('MuiTreeView', ['root']);
var _default = treeViewClasses;
exports.default = _default;