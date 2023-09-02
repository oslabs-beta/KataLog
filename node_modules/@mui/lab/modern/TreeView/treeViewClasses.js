import generateUtilityClass from '@mui/material/generateUtilityClass';
import generateUtilityClasses from '@mui/material/generateUtilityClasses';
export function getTreeViewUtilityClass(slot) {
  return generateUtilityClass('MuiTreeView', slot);
}
const treeViewClasses = generateUtilityClasses('MuiTreeView', ['root']);
export default treeViewClasses;