"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PickersArrowSwitcher = void 0;

var _objectWithoutPropertiesLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutPropertiesLoose"));

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var React = _interopRequireWildcard(require("react"));

var _clsx = _interopRequireDefault(require("clsx"));

var _Typography = _interopRequireDefault(require("@mui/material/Typography"));

var _styles = require("@mui/material/styles");

var _material = require("@mui/material");

var _IconButton = _interopRequireDefault(require("@mui/material/IconButton"));

var _icons = require("./icons");

var _pickersArrowSwitcherClasses = require("./pickersArrowSwitcherClasses");

var _jsxRuntime = require("react/jsx-runtime");

const _excluded = ["children", "className", "components", "componentsProps", "isLeftDisabled", "isLeftHidden", "isRightDisabled", "isRightHidden", "leftArrowButtonText", "onLeftClick", "onRightClick", "rightArrowButtonText"];

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

const useUtilityClasses = ownerState => {
  const {
    classes
  } = ownerState;
  const slots = {
    root: ['root'],
    spacer: ['spacer'],
    button: ['button']
  };
  return (0, _material.unstable_composeClasses)(slots, _pickersArrowSwitcherClasses.getPickersArrowSwitcherUtilityClass, classes);
};

const PickersArrowSwitcherRoot = (0, _styles.styled)('div', {
  name: 'MuiPickersArrowSwitcher',
  slot: 'Root',
  overridesResolver: (props, styles) => styles.root
})({
  display: 'flex'
});
const PickersArrowSwitcherSpacer = (0, _styles.styled)('div', {
  name: 'MuiPickersArrowSwitcher',
  slot: 'Spacer',
  overridesResolver: (props, styles) => styles.spacer
})(({
  theme
}) => ({
  width: theme.spacing(3)
}));
const PickersArrowSwitcherButton = (0, _styles.styled)(_IconButton.default, {
  name: 'MuiPickersArrowSwitcher',
  slot: 'Button',
  overridesResolver: (props, styles) => styles.button
})(({
  ownerState
}) => (0, _extends2.default)({}, ownerState.hidden && {
  visibility: 'hidden'
}));
const PickersArrowSwitcher = /*#__PURE__*/React.forwardRef(function PickersArrowSwitcher(inProps, ref) {
  const props = (0, _styles.useThemeProps)({
    props: inProps,
    name: 'MuiPickersArrowSwitcher'
  });
  const {
    children,
    className,
    components,
    componentsProps,
    isLeftDisabled,
    isLeftHidden,
    isRightDisabled,
    isRightHidden,
    leftArrowButtonText,
    onLeftClick,
    onRightClick,
    rightArrowButtonText
  } = props,
        other = (0, _objectWithoutPropertiesLoose2.default)(props, _excluded);
  const theme = (0, _styles.useTheme)();
  const isRtl = theme.direction === 'rtl';
  const leftArrowButtonProps = (componentsProps == null ? void 0 : componentsProps.leftArrowButton) || {};
  const LeftArrowIcon = (components == null ? void 0 : components.LeftArrowIcon) || _icons.ArrowLeft;
  const rightArrowButtonProps = (componentsProps == null ? void 0 : componentsProps.rightArrowButton) || {};
  const RightArrowIcon = (components == null ? void 0 : components.RightArrowIcon) || _icons.ArrowRight;
  const ownerState = props;
  const classes = useUtilityClasses(ownerState);
  return /*#__PURE__*/(0, _jsxRuntime.jsxs)(PickersArrowSwitcherRoot, (0, _extends2.default)({
    ref: ref,
    className: (0, _clsx.default)(classes.root, className),
    ownerState: ownerState
  }, other, {
    children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(PickersArrowSwitcherButton, (0, _extends2.default)({
      as: components == null ? void 0 : components.LeftArrowButton,
      size: "small",
      "aria-label": leftArrowButtonText,
      title: leftArrowButtonText,
      disabled: isLeftDisabled,
      edge: "end",
      onClick: onLeftClick
    }, leftArrowButtonProps, {
      className: (0, _clsx.default)(classes.button, leftArrowButtonProps.className),
      ownerState: (0, _extends2.default)({}, ownerState, leftArrowButtonProps, {
        hidden: isLeftHidden
      }),
      children: isRtl ? /*#__PURE__*/(0, _jsxRuntime.jsx)(RightArrowIcon, {}) : /*#__PURE__*/(0, _jsxRuntime.jsx)(LeftArrowIcon, {})
    })), children ? /*#__PURE__*/(0, _jsxRuntime.jsx)(_Typography.default, {
      variant: "subtitle1",
      component: "span",
      children: children
    }) : /*#__PURE__*/(0, _jsxRuntime.jsx)(PickersArrowSwitcherSpacer, {
      className: classes.spacer,
      ownerState: ownerState
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)(PickersArrowSwitcherButton, (0, _extends2.default)({
      as: components == null ? void 0 : components.RightArrowButton,
      size: "small",
      "aria-label": rightArrowButtonText,
      title: rightArrowButtonText,
      edge: "start",
      disabled: isRightDisabled,
      onClick: onRightClick
    }, rightArrowButtonProps, {
      className: (0, _clsx.default)(classes.button, rightArrowButtonProps.className),
      ownerState: (0, _extends2.default)({}, ownerState, rightArrowButtonProps, {
        hidden: isRightHidden
      }),
      children: isRtl ? /*#__PURE__*/(0, _jsxRuntime.jsx)(LeftArrowIcon, {}) : /*#__PURE__*/(0, _jsxRuntime.jsx)(RightArrowIcon, {})
    }))]
  }));
});
exports.PickersArrowSwitcher = PickersArrowSwitcher;