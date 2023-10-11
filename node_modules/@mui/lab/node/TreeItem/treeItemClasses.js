"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
exports.getTreeItemUtilityClass = getTreeItemUtilityClass;
var _generateUtilityClass = _interopRequireDefault(require("@mui/material/generateUtilityClass"));
var _generateUtilityClasses = _interopRequireDefault(require("@mui/material/generateUtilityClasses"));
function getTreeItemUtilityClass(slot) {
  return (0, _generateUtilityClass.default)('MuiTreeItem', slot);
}
const treeItemClasses = (0, _generateUtilityClasses.default)('MuiTreeItem', ['root', 'group', 'content', 'expanded', 'selected', 'focused', 'disabled', 'iconContainer', 'label']);
var _default = treeItemClasses;
exports.default = _default;