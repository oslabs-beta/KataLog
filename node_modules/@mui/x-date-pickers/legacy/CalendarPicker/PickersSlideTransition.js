import _extends from "@babel/runtime/helpers/esm/extends";
import _objectWithoutProperties from "@babel/runtime/helpers/esm/objectWithoutProperties";
import _defineProperty from "@babel/runtime/helpers/esm/defineProperty";
var _excluded = ["children", "className", "reduceAnimations", "slideDirection", "transKey"];
import * as React from 'react';
import clsx from 'clsx';
import { styled } from '@mui/material/styles';
import { unstable_composeClasses as composeClasses } from '@mui/material';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import { getPickersSlideTransitionUtilityClass, pickersSlideTransitionClasses } from './pickersSlideTransitionClasses';
import { jsx as _jsx } from "react/jsx-runtime";

var useUtilityClasses = function useUtilityClasses(ownerState) {
  var classes = ownerState.classes;
  var slots = {
    root: ['root']
  };
  return composeClasses(slots, getPickersSlideTransitionUtilityClass, classes);
};

export var slideAnimationDuration = 350;
var PickersSlideTransitionRoot = styled(TransitionGroup, {
  name: 'PrivatePickersSlideTransition',
  slot: 'Root',
  overridesResolver: function overridesResolver(_, styles) {
    return [styles.root, _defineProperty({}, ".".concat(pickersSlideTransitionClasses['slideEnter-left']), styles['slideEnter-left']), _defineProperty({}, ".".concat(pickersSlideTransitionClasses['slideEnter-right']), styles['slideEnter-right']), _defineProperty({}, ".".concat(pickersSlideTransitionClasses.slideEnterActive), styles.slideEnterActive), _defineProperty({}, ".".concat(pickersSlideTransitionClasses.slideExit), styles.slideExit), _defineProperty({}, ".".concat(pickersSlideTransitionClasses['slideExitActiveLeft-left']), styles['slideExitActiveLeft-left']), _defineProperty({}, ".".concat(pickersSlideTransitionClasses['slideExitActiveLeft-right']), styles['slideExitActiveLeft-right'])];
  }
})(function (_ref7) {
  var _ref8;

  var theme = _ref7.theme;
  var slideTransition = theme.transitions.create('transform', {
    duration: slideAnimationDuration,
    easing: 'cubic-bezier(0.35, 0.8, 0.4, 1)'
  });
  return _ref8 = {
    display: 'block',
    position: 'relative',
    overflowX: 'hidden',
    '& > *': {
      position: 'absolute',
      top: 0,
      right: 0,
      left: 0
    }
  }, _defineProperty(_ref8, "& .".concat(pickersSlideTransitionClasses['slideEnter-left']), {
    willChange: 'transform',
    transform: 'translate(100%)',
    zIndex: 1
  }), _defineProperty(_ref8, "& .".concat(pickersSlideTransitionClasses['slideEnter-right']), {
    willChange: 'transform',
    transform: 'translate(-100%)',
    zIndex: 1
  }), _defineProperty(_ref8, "& .".concat(pickersSlideTransitionClasses.slideEnterActive), {
    transform: 'translate(0%)',
    transition: slideTransition
  }), _defineProperty(_ref8, "& .".concat(pickersSlideTransitionClasses.slideExit), {
    transform: 'translate(0%)'
  }), _defineProperty(_ref8, "& .".concat(pickersSlideTransitionClasses['slideExitActiveLeft-left']), {
    willChange: 'transform',
    transform: 'translate(-100%)',
    transition: slideTransition,
    zIndex: 0
  }), _defineProperty(_ref8, "& .".concat(pickersSlideTransitionClasses['slideExitActiveLeft-right']), {
    willChange: 'transform',
    transform: 'translate(100%)',
    transition: slideTransition,
    zIndex: 0
  }), _ref8;
});
/**
 * @ignore - do not document.
 */

export var PickersSlideTransition = function PickersSlideTransition(props) {
  // TODO v6: add 'useThemeProps' once the component class names are aligned
  var children = props.children,
      className = props.className,
      reduceAnimations = props.reduceAnimations,
      slideDirection = props.slideDirection,
      transKey = props.transKey,
      other = _objectWithoutProperties(props, _excluded);

  var classes = useUtilityClasses(props);

  if (reduceAnimations) {
    return /*#__PURE__*/_jsx("div", {
      className: clsx(classes.root, className),
      children: children
    });
  }

  var transitionClasses = {
    exit: pickersSlideTransitionClasses.slideExit,
    enterActive: pickersSlideTransitionClasses.slideEnterActive,
    enter: pickersSlideTransitionClasses["slideEnter-".concat(slideDirection)],
    exitActive: pickersSlideTransitionClasses["slideExitActiveLeft-".concat(slideDirection)]
  };
  return /*#__PURE__*/_jsx(PickersSlideTransitionRoot, {
    className: clsx(classes.root, className),
    childFactory: function childFactory(element) {
      return /*#__PURE__*/React.cloneElement(element, {
        classNames: transitionClasses
      });
    },
    role: "presentation",
    children: /*#__PURE__*/_jsx(CSSTransition, _extends({
      mountOnEnter: true,
      unmountOnExit: true,
      timeout: slideAnimationDuration,
      classNames: transitionClasses
    }, other, {
      children: children
    }), transKey)
  });
};