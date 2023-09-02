import _extends from "@babel/runtime/helpers/esm/extends";
import _objectWithoutProperties from "@babel/runtime/helpers/esm/objectWithoutProperties";
var _excluded = ["displayStaticWrapperAs", "onAccept", "onClear", "onCancel", "onDismiss", "onSetToday", "open", "children", "components", "componentsProps", "className"];
import * as React from 'react';
import PropTypes from 'prop-types';
import { styled, useThemeProps } from '@mui/material/styles';
import { unstable_composeClasses as composeClasses } from '@mui/material';
import clsx from 'clsx';
import { DIALOG_WIDTH } from '../../constants/dimensions';
import { WrapperVariantContext } from '../wrappers/WrapperVariantContext';
import { getStaticWrapperUtilityClass } from './pickerStaticWrapperClasses';
import { PickersActionBar } from '../../../PickersActionBar';
import { jsx as _jsx } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";

var useUtilityClasses = function useUtilityClasses(ownerState) {
  var classes = ownerState.classes;
  var slots = {
    root: ['root'],
    content: ['content']
  };
  return composeClasses(slots, getStaticWrapperUtilityClass, classes);
};

var PickerStaticWrapperRoot = styled('div', {
  name: 'MuiPickerStaticWrapper',
  slot: 'Root',
  overridesResolver: function overridesResolver(props, styles) {
    return styles.root;
  }
})({
  display: 'flex',
  flexDirection: 'column'
});
var PickerStaticWrapperContent = styled('div', {
  name: 'MuiPickerStaticWrapper',
  slot: 'Content',
  overridesResolver: function overridesResolver(props, styles) {
    return styles.content;
  }
})(function (_ref) {
  var theme = _ref.theme;
  return {
    overflow: 'hidden',
    minWidth: DIALOG_WIDTH,
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: theme.palette.background.paper
  };
});

function PickerStaticWrapper(inProps) {
  var _components$ActionBar;

  var props = useThemeProps({
    props: inProps,
    name: 'MuiPickerStaticWrapper'
  });

  var displayStaticWrapperAs = props.displayStaticWrapperAs,
      onAccept = props.onAccept,
      onClear = props.onClear,
      onCancel = props.onCancel,
      onDismiss = props.onDismiss,
      onSetToday = props.onSetToday,
      open = props.open,
      children = props.children,
      components = props.components,
      componentsProps = props.componentsProps,
      className = props.className,
      other = _objectWithoutProperties(props, _excluded);

  var classes = useUtilityClasses(props);
  var ActionBar = (_components$ActionBar = components == null ? void 0 : components.ActionBar) != null ? _components$ActionBar : PickersActionBar;
  var PaperContent = (components == null ? void 0 : components.PaperContent) || React.Fragment;
  return /*#__PURE__*/_jsx(WrapperVariantContext.Provider, {
    value: displayStaticWrapperAs,
    children: /*#__PURE__*/_jsxs(PickerStaticWrapperRoot, _extends({
      className: clsx(classes.root, className)
    }, other, {
      children: [/*#__PURE__*/_jsx(PickerStaticWrapperContent, {
        className: classes.content,
        children: /*#__PURE__*/_jsx(PaperContent, _extends({}, componentsProps == null ? void 0 : componentsProps.paperContent, {
          children: children
        }))
      }), /*#__PURE__*/_jsx(ActionBar, _extends({
        onAccept: onAccept,
        onClear: onClear,
        onCancel: onCancel,
        onSetToday: onSetToday,
        actions: displayStaticWrapperAs === 'desktop' ? [] : ['cancel', 'accept']
      }, componentsProps == null ? void 0 : componentsProps.actionBar))]
    }))
  });
}

process.env.NODE_ENV !== "production" ? PickerStaticWrapper.propTypes = {
  // ----------------------------- Warning --------------------------------
  // | These PropTypes are generated from the TypeScript type definitions |
  // | To update them edit the TypeScript types and run "yarn proptypes"  |
  // ----------------------------------------------------------------------
  children: PropTypes.node,

  /**
   * Override or extend the styles applied to the component.
   */
  classes: PropTypes.object,
  className: PropTypes.string,

  /**
   * Overrideable components.
   * @default {}
   */
  components: PropTypes.object,

  /**
   * The props used for each component slot.
   * @default {}
   */
  componentsProps: PropTypes.object,

  /**
   * Force static wrapper inner components to be rendered in mobile or desktop mode.
   */
  displayStaticWrapperAs: PropTypes.oneOf(['desktop', 'mobile']).isRequired,
  onAccept: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
  onClear: PropTypes.func.isRequired,
  onDismiss: PropTypes.func.isRequired,
  onSetToday: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired
} : void 0;
export { PickerStaticWrapper };