import _extends from "@babel/runtime/helpers/esm/extends";
import _objectWithoutPropertiesLoose from "@babel/runtime/helpers/esm/objectWithoutPropertiesLoose";
const _excluded = ["children", "className", "reduceAnimations", "slideDirection", "transKey"];
import * as React from 'react';
import clsx from 'clsx';
import { styled } from '@mui/material/styles';
import { unstable_composeClasses as composeClasses } from '@mui/material';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import { getPickersSlideTransitionUtilityClass, pickersSlideTransitionClasses } from './pickersSlideTransitionClasses';
import { jsx as _jsx } from "react/jsx-runtime";

const useUtilityClasses = ownerState => {
  const {
    classes
  } = ownerState;
  const slots = {
    root: ['root']
  };
  return composeClasses(slots, getPickersSlideTransitionUtilityClass, classes);
};

export const slideAnimationDuration = 350;
const PickersSlideTransitionRoot = styled(TransitionGroup, {
  name: 'PrivatePickersSlideTransition',
  slot: 'Root',
  overridesResolver: (_, styles) => [styles.root, {
    [`.${pickersSlideTransitionClasses['slideEnter-left']}`]: styles['slideEnter-left']
  }, {
    [`.${pickersSlideTransitionClasses['slideEnter-right']}`]: styles['slideEnter-right']
  }, {
    [`.${pickersSlideTransitionClasses.slideEnterActive}`]: styles.slideEnterActive
  }, {
    [`.${pickersSlideTransitionClasses.slideExit}`]: styles.slideExit
  }, {
    [`.${pickersSlideTransitionClasses['slideExitActiveLeft-left']}`]: styles['slideExitActiveLeft-left']
  }, {
    [`.${pickersSlideTransitionClasses['slideExitActiveLeft-right']}`]: styles['slideExitActiveLeft-right']
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
    [`& .${pickersSlideTransitionClasses['slideEnter-left']}`]: {
      willChange: 'transform',
      transform: 'translate(100%)',
      zIndex: 1
    },
    [`& .${pickersSlideTransitionClasses['slideEnter-right']}`]: {
      willChange: 'transform',
      transform: 'translate(-100%)',
      zIndex: 1
    },
    [`& .${pickersSlideTransitionClasses.slideEnterActive}`]: {
      transform: 'translate(0%)',
      transition: slideTransition
    },
    [`& .${pickersSlideTransitionClasses.slideExit}`]: {
      transform: 'translate(0%)'
    },
    [`& .${pickersSlideTransitionClasses['slideExitActiveLeft-left']}`]: {
      willChange: 'transform',
      transform: 'translate(-100%)',
      transition: slideTransition,
      zIndex: 0
    },
    [`& .${pickersSlideTransitionClasses['slideExitActiveLeft-right']}`]: {
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

export const PickersSlideTransition = props => {
  // TODO v6: add 'useThemeProps' once the component class names are aligned
  const {
    children,
    className,
    reduceAnimations,
    slideDirection,
    transKey
  } = props,
        other = _objectWithoutPropertiesLoose(props, _excluded);

  const classes = useUtilityClasses(props);

  if (reduceAnimations) {
    return /*#__PURE__*/_jsx("div", {
      className: clsx(classes.root, className),
      children: children
    });
  }

  const transitionClasses = {
    exit: pickersSlideTransitionClasses.slideExit,
    enterActive: pickersSlideTransitionClasses.slideEnterActive,
    enter: pickersSlideTransitionClasses[`slideEnter-${slideDirection}`],
    exitActive: pickersSlideTransitionClasses[`slideExitActiveLeft-${slideDirection}`]
  };
  return /*#__PURE__*/_jsx(PickersSlideTransitionRoot, {
    className: clsx(classes.root, className),
    childFactory: element => /*#__PURE__*/React.cloneElement(element, {
      classNames: transitionClasses
    }),
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