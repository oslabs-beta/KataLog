"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PickerStaticWrapper = PickerStaticWrapper;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _objectWithoutPropertiesLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutPropertiesLoose"));

var React = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _styles = require("@mui/material/styles");

var _material = require("@mui/material");

var _clsx = _interopRequireDefault(require("clsx"));

var _dimensions = require("../../constants/dimensions");

var _WrapperVariantContext = require("../wrappers/WrapperVariantContext");

var _pickerStaticWrapperClasses = require("./pickerStaticWrapperClasses");

var _PickersActionBar = require("../../../PickersActionBar");

var _jsxRuntime = require("react/jsx-runtime");

const _excluded = ["displayStaticWrapperAs", "onAccept", "onClear", "onCancel", "onDismiss", "onSetToday", "open", "children", "components", "componentsProps", "className"];

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

const useUtilityClasses = ownerState => {
  const {
    classes
  } = ownerState;
  const slots = {
    root: ['root'],
    content: ['content']
  };
  return (0, _material.unstable_composeClasses)(slots, _pickerStaticWrapperClasses.getStaticWrapperUtilityClass, classes);
};

const PickerStaticWrapperRoot = (0, _styles.styled)('div', {
  name: 'MuiPickerStaticWrapper',
  slot: 'Root',
  overridesResolver: (props, styles) => styles.root
})({
  display: 'flex',
  flexDirection: 'column'
});
const PickerStaticWrapperContent = (0, _styles.styled)('div', {
  name: 'MuiPickerStaticWrapper',
  slot: 'Content',
  overridesResolver: (props, styles) => styles.content
})(({
  theme
}) => ({
  overflow: 'hidden',
  minWidth: _dimensions.DIALOG_WIDTH,
  display: 'flex',
  flexDirection: 'column',
  backgroundColor: theme.palette.background.paper
}));

function PickerStaticWrapper(inProps) {
  var _components$ActionBar;

  const props = (0, _styles.useThemeProps)({
    props: inProps,
    name: 'MuiPickerStaticWrapper'
  });
  const {
    displayStaticWrapperAs,
    onAccept,
    onClear,
    onCancel,
    onSetToday,
    children,
    components,
    componentsProps,
    className
  } = props,
        other = (0, _objectWithoutPropertiesLoose2.default)(props, _excluded);
  const classes = useUtilityClasses(props);
  const ActionBar = (_components$ActionBar = components == null ? void 0 : components.ActionBar) != null ? _components$ActionBar : _PickersActionBar.PickersActionBar;
  const PaperContent = (components == null ? void 0 : components.PaperContent) || React.Fragment;
  return /*#__PURE__*/(0, _jsxRuntime.jsx)(_WrapperVariantContext.WrapperVariantContext.Provider, {
    value: displayStaticWrapperAs,
    children: /*#__PURE__*/(0, _jsxRuntime.jsxs)(PickerStaticWrapperRoot, (0, _extends2.default)({
      className: (0, _clsx.default)(classes.root, className)
    }, other, {
      children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(PickerStaticWrapperContent, {
        className: classes.content,
        children: /*#__PURE__*/(0, _jsxRuntime.jsx)(PaperContent, (0, _extends2.default)({}, componentsProps == null ? void 0 : componentsProps.paperContent, {
          children: children
        }))
      }), /*#__PURE__*/(0, _jsxRuntime.jsx)(ActionBar, (0, _extends2.default)({
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
  children: _propTypes.default.node,

  /**
   * Override or extend the styles applied to the component.
   */
  classes: _propTypes.default.object,
  className: _propTypes.default.string,

  /**
   * Overrideable components.
   * @default {}
   */
  components: _propTypes.default.object,

  /**
   * The props used for each component slot.
   * @default {}
   */
  componentsProps: _propTypes.default.object,

  /**
   * Force static wrapper inner components to be rendered in mobile or desktop mode.
   */
  displayStaticWrapperAs: _propTypes.default.oneOf(['desktop', 'mobile']).isRequired,
  onAccept: _propTypes.default.func.isRequired,
  onCancel: _propTypes.default.func.isRequired,
  onClear: _propTypes.default.func.isRequired,
  onDismiss: _propTypes.default.func.isRequired,
  onSetToday: _propTypes.default.func.isRequired,
  open: _propTypes.default.bool.isRequired
} : void 0;