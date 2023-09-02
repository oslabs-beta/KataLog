"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.slideAnimationDuration = exports.PickersSlideTransition = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _objectWithoutPropertiesLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutPropertiesLoose"));

var React = _interopRequireWildcard(require("react"));

var _clsx = _interopRequireDefault(require("clsx"));

var _styles = require("@mui/material/styles");

var _material = require("@mui/material");

var _reactTransitionGroup = require("react-transition-group");

var _pickersSlideTransitionClasses = require("./pickersSlideTransitionClasses");

var _jsxRuntime = require("react/jsx-runtime");

const _excluded = ["children", "className", "reduceAnimations", "slideDirection", "transKey"];

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

const useUtilityClasses = ownerState => {
  const {
    classes
  } = ownerState;
  const slots = {
    root: ['root']
  };
  return (0, _material.unstable_composeClasses)(slots, _pickersSlideTransitionClasses.getPickersSlideTransitionUtilityClass, classes);
};

const slideAnimationDuration = 350;
exports.slideAnimationDuration = slideAnimationDuration;
const PickersSlideTransitionRoot = (0, _styles.styled)(_reactTransitionGroup.TransitionGroup, {
  name: 'PrivatePickersSlideTransition',
  slot: 'Root',
  overridesResolver: (_, styles) => [styles.root, {
    [`.${_pickersSlideTransitionClasses.pickersSlideTransitionClasses['slideEnter-left']}`]: styles['slideEnter-left']
  }, {
    [`.${_pickersSlideTransitionClasses.pickersSlideTransitionClasses['slideEnter-right']}`]: styles['slideEnter-right']
  }, {
    [`.${_pickersSlideTransitionClasses.pickersSlideTransitionClasses.slideEnterActive}`]: styles.slideEnterActive
  }, {
    [`.${_pickersSlideTransitionClasses.pickersSlideTransitionClasses.slideExit}`]: styles.slideExit
  }, {
    [`.${_pickersSlideTransitionClasses.pickersSlideTransitionClasses['slideExitActiveLeft-left']}`]: styles['slideExitActiveLeft-left']
  }, {
    [`.${_pickersSlideTransitionClasses.pickersSlideTransitionClasses['slideExitActiveLeft-right']}`]: styles['slideExitActiveLeft-right']
  }]
})(({
  theme
}) => {
  const slideTransition = theme.transitions.create('transform', {
    duration: slideAnimationDuration,
    easing: 'cubic-bezier(0.35, 0.8, 0.4, 1)'
  });
  return {
    display: 'block',
    position: 'relative',
    overflowX: 'hidden',
    '& > *': {
      position: 'absolute',
      top: 0,
      right: 0,
      left: 0
    },
    [`& .${_pickersSlideTransitionClasses.pickersSlideTransitionClasses['slideEnter-left']}`]: {
      willChange: 'transform',
      transform: 'translate(100%)',
      zIndex: 1
    },
    [`& .${_pickersSlideTransitionClasses.pickersSlideTransitionClasses['slideEnter-right']}`]: {
      willChange: 'transform',
      transform: 'translate(-100%)',
      zIndex: 1
    },
    [`& .${_pickersSlideTransitionClasses.pickersSlideTransitionClasses.slideEnterActive}`]: {
      transform: 'translate(0%)',
      transition: slideTransition
    },
    [`& .${_pickersSlideTransitionClasses.pickersSlideTransitionClasses.slideExit}`]: {
      transform: 'translate(0%)'
    },
    [`& .${_pickersSlideTransitionClasses.pickersSlideTransitionClasses['slideExitActiveLeft-left']}`]: {
      willChange: 'transform',
      transform: 'translate(-100%)',
      transition: slideTransition,
      zIndex: 0
    },
    [`& .${_pickersSlideTransitionClasses.pickersSlideTransitionClasses['slideExitActiveLeft-right']}`]: {
      willChange: 'transform',
      transform: 'translate(100%)',
      transition: slideTransition,
      zIndex: 0
    }
  };
});
/**
 * @ignore - do not document.
 */

const PickersSlideTransition = props => {
  // TODO v6: add 'useThemeProps' once the component class names are aligned
  const {
    children,
    className,
    reduceAnimations,
    slideDirection,
    transKey
  } = props,
        other = (0, _objectWithoutPropertiesLoose2.default)(props, _excluded);
  const classes = useUtilityClasses(props);

  if (reduceAnimations) {
    return /*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
      className: (0, _clsx.default)(classes.root, className),
      children: children
    });
  }

  const transitionClasses = {
    exit: _pickersSlideTransitionClasses.pickersSlideTransitionClasses.slideExit,
    enterActive: _pickersSlideTransitionClasses.pickersSlideTransitionClasses.slideEnterActive,
    enter: _pickersSlideTransitionClasses.pickersSlideTransitionClasses[`slideEnter-${slideDirection}`],
    exitActive: _pickersSlideTransitionClasses.pickersSlideTransitionClasses[`slideExitActiveLeft-${slideDirection}`]
  };
  return /*#__PURE__*/(0, _jsxRuntime.jsx)(PickersSlideTransitionRoot, {
    className: (0, _clsx.default)(classes.root, className),
    childFactory: element => /*#__PURE__*/React.cloneElement(element, {
      classNames: transitionClasses
    }),
    role: "presentation",
    children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactTransitionGroup.CSSTransition, (0, _extends2.default)({
      mountOnEnter: true,
      unmountOnExit: true,
      timeout: slideAnimationDuration,
      classNames: transitionClasses
    }, other, {
      children: children
    }), transKey)
  });
};

exports.PickersSlideTransition = PickersSlideTransition;