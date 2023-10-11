import _objectWithoutProperties from "@babel/runtime/helpers/esm/objectWithoutProperties";
import _slicedToArray from "@babel/runtime/helpers/esm/slicedToArray";
import _extends from "@babel/runtime/helpers/esm/extends";
var _excluded = ["onClick", "onTouchStart"];
import * as React from 'react';
import Grow from '@mui/material/Grow';
import Paper from '@mui/material/Paper';
import Popper from '@mui/material/Popper';
import TrapFocus from '@mui/material/Unstable_TrapFocus';
import { useForkRef, useEventCallback, ownerDocument } from '@mui/material/utils';
import { styled, useThemeProps } from '@mui/material/styles';
import { unstable_composeClasses as composeClasses } from '@mui/material';
import { PickersActionBar } from '../../PickersActionBar';
import { getPickersPopperUtilityClass } from './pickersPopperClasses';
import { getActiveElement } from '../utils/utils';
import { jsx as _jsx } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";

var useUtilityClasses = function useUtilityClasses(ownerState) {
  var classes = ownerState.classes;
  var slots = {
    root: ['root'],
    paper: ['paper']
  };
  return composeClasses(slots, getPickersPopperUtilityClass, classes);
};

var PickersPopperRoot = styled(Popper, {
  name: 'MuiPickersPopper',
  slot: 'Root',
  overridesResolver: function overridesResolver(_, styles) {
    return styles.root;
  }
})(function (_ref) {
  var theme = _ref.theme;
  return {
    zIndex: theme.zIndex.modal
  };
});
var PickersPopperPaper = styled(Paper, {
  name: 'MuiPickersPopper',
  slot: 'Paper',
  overridesResolver: function overridesResolver(_, styles) {
    return styles.paper;
  }
})(function (_ref2) {
  var ownerState = _ref2.ownerState;
  return _extends({
    transformOrigin: 'top center',
    outline: 0
  }, ownerState.placement === 'top' && {
    transformOrigin: 'bottom center'
  });
});

function clickedRootScrollbar(event, doc) {
  return doc.documentElement.clientWidth < event.clientX || doc.documentElement.clientHeight < event.clientY;
}

/**
 * Based on @mui/material/ClickAwayListener without the customization.
 * We can probably strip away even more since children won't be portaled.
 * @param {boolean} active Only listen to clicks when the popper is opened.
 * @param {(event: MouseEvent | TouchEvent) => void} onClickAway The callback to call when clicking outside the popper.
 * @returns {Array} The ref and event handler to listen to the outside clicks.
 */
function useClickAwayListener(active, onClickAway) {
  var movedRef = React.useRef(false);
  var syntheticEventRef = React.useRef(false);
  var nodeRef = React.useRef(null);
  var activatedRef = React.useRef(false);
  React.useEffect(function () {
    if (!active) {
      return undefined;
    } // Ensure that this hook is not "activated" synchronously.
    // https://github.com/facebook/react/issues/20074


    function armClickAwayListener() {
      activatedRef.current = true;
    }

    document.addEventListener('mousedown', armClickAwayListener, true);
    document.addEventListener('touchstart', armClickAwayListener, true);
    return function () {
      document.removeEventListener('mousedown', armClickAwayListener, true);
      document.removeEventListener('touchstart', armClickAwayListener, true);
      activatedRef.current = false;
    };
  }, [active]); // The handler doesn't take event.defaultPrevented into account:
  //
  // event.preventDefault() is meant to stop default behaviors like
  // clicking a checkbox to check it, hitting a button to submit a form,
  // and hitting left arrow to move the cursor in a text input etc.
  // Only special HTML elements have these default behaviors.

  var handleClickAway = useEventCallback(function (event) {
    if (!activatedRef.current) {
      return;
    } // Given developers can stop the propagation of the synthetic event,
    // we can only be confident with a positive value.


    var insideReactTree = syntheticEventRef.current;
    syntheticEventRef.current = false;
    var doc = ownerDocument(nodeRef.current); // 1. IE11 support, which trigger the handleClickAway even after the unbind
    // 2. The child might render null.
    // 3. Behave like a blur listener.

    if (!nodeRef.current || // is a TouchEvent?
    'clientX' in event && clickedRootScrollbar(event, doc)) {
      return;
    } // Do not act if user performed touchmove


    if (movedRef.current) {
      movedRef.current = false;
      return;
    }

    var insideDOM; // If not enough, can use https://github.com/DieterHolvoet/event-propagation-path/blob/master/propagationPath.js

    if (event.composedPath) {
      insideDOM = event.composedPath().indexOf(nodeRef.current) > -1;
    } else {
      insideDOM = !doc.documentElement.contains(event.target) || nodeRef.current.contains(event.target);
    }

    if (!insideDOM && !insideReactTree) {
      onClickAway(event);
    }
  }); // Keep track of mouse/touch events that bubbled up through the portal.

  var handleSynthetic = function handleSynthetic() {
    syntheticEventRef.current = true;
  };

  React.useEffect(function () {
    if (active) {
      var doc = ownerDocument(nodeRef.current);

      var handleTouchMove = function handleTouchMove() {
        movedRef.current = true;
      };

      doc.addEventListener('touchstart', handleClickAway);
      doc.addEventListener('touchmove', handleTouchMove);
      return function () {
        doc.removeEventListener('touchstart', handleClickAway);
        doc.removeEventListener('touchmove', handleTouchMove);
      };
    }

    return undefined;
  }, [active, handleClickAway]);
  React.useEffect(function () {
    // TODO This behavior is not tested automatically
    // It's unclear whether this is due to different update semantics in test (batched in act() vs discrete on click).
    // Or if this is a timing related issues due to different Transition components
    // Once we get rid of all the manual scheduling (e.g. setTimeout(update, 0)) we can revisit this code+test.
    if (active) {
      var doc = ownerDocument(nodeRef.current);
      doc.addEventListener('click', handleClickAway);
      return function () {
        doc.removeEventListener('click', handleClickAway); // cleanup `handleClickAway`

        syntheticEventRef.current = false;
      };
    }

    return undefined;
  }, [active, handleClickAway]);
  return [nodeRef, handleSynthetic, handleSynthetic];
}

export function PickersPopper(inProps) {
  var _components$ActionBar;

  var props = useThemeProps({
    props: inProps,
    name: 'MuiPickersPopper'
  });
  var anchorEl = props.anchorEl,
      _children = props.children,
      _props$containerRef = props.containerRef,
      containerRef = _props$containerRef === void 0 ? null : _props$containerRef,
      onBlur = props.onBlur,
      onClose = props.onClose,
      onClear = props.onClear,
      onAccept = props.onAccept,
      onCancel = props.onCancel,
      onSetToday = props.onSetToday,
      open = props.open,
      PopperProps = props.PopperProps,
      role = props.role,
      _props$TransitionComp = props.TransitionComponent,
      TransitionComponent = _props$TransitionComp === void 0 ? Grow : _props$TransitionComp,
      TrapFocusProps = props.TrapFocusProps,
      _props$PaperProps = props.PaperProps,
      PaperProps = _props$PaperProps === void 0 ? {} : _props$PaperProps,
      components = props.components,
      componentsProps = props.componentsProps;
  React.useEffect(function () {
    function handleKeyDown(nativeEvent) {
      // IE11, Edge (prior to using Bink?) use 'Esc'
      if (open && (nativeEvent.key === 'Escape' || nativeEvent.key === 'Esc')) {
        onClose();
      }
    }

    document.addEventListener('keydown', handleKeyDown);
    return function () {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [onClose, open]);
  var lastFocusedElementRef = React.useRef(null);
  React.useEffect(function () {
    if (role === 'tooltip') {
      return;
    }

    if (open) {
      lastFocusedElementRef.current = getActiveElement(document);
    } else if (lastFocusedElementRef.current && lastFocusedElementRef.current instanceof HTMLElement) {
      // make sure the button is flushed with updated label, before returning focus to it
      // avoids issue, where screen reader could fail to announce selected date after selection
      setTimeout(function () {
        if (lastFocusedElementRef.current instanceof HTMLElement) {
          lastFocusedElementRef.current.focus();
        }
      });
    }
  }, [open, role]);

  var _useClickAwayListener = useClickAwayListener(open, onBlur != null ? onBlur : onClose),
      _useClickAwayListener2 = _slicedToArray(_useClickAwayListener, 3),
      clickAwayRef = _useClickAwayListener2[0],
      onPaperClick = _useClickAwayListener2[1],
      onPaperTouchStart = _useClickAwayListener2[2];

  var paperRef = React.useRef(null);
  var handleRef = useForkRef(paperRef, containerRef);
  var handlePaperRef = useForkRef(handleRef, clickAwayRef);
  var ownerState = props;
  var classes = useUtilityClasses(ownerState);

  var onPaperClickProp = PaperProps.onClick,
      onPaperTouchStartProp = PaperProps.onTouchStart,
      otherPaperProps = _objectWithoutProperties(PaperProps, _excluded);

  var handleKeyDown = function handleKeyDown(event) {
    if (event.key === 'Escape') {
      // stop the propagation to avoid closing parent modal
      event.stopPropagation();
      onClose();
    }
  };

  var ActionBar = (_components$ActionBar = components == null ? void 0 : components.ActionBar) != null ? _components$ActionBar : PickersActionBar;
  var PaperContent = (components == null ? void 0 : components.PaperContent) || React.Fragment;
  return /*#__PURE__*/_jsx(PickersPopperRoot, _extends({
    transition: true,
    role: role,
    open: open,
    anchorEl: anchorEl,
    onKeyDown: handleKeyDown,
    className: classes.root
  }, PopperProps, {
    children: function children(_ref3) {
      var TransitionProps = _ref3.TransitionProps,
          placement = _ref3.placement;
      return /*#__PURE__*/_jsx(TrapFocus, _extends({
        open: open,
        disableAutoFocus: true // pickers are managing focus position manually
        // without this prop the focus is returned to the button before `aria-label` is updated
        // which would force screen readers to read too old label
        ,
        disableRestoreFocus: true,
        disableEnforceFocus: role === 'tooltip',
        isEnabled: function isEnabled() {
          return true;
        }
      }, TrapFocusProps, {
        children: /*#__PURE__*/_jsx(TransitionComponent, _extends({}, TransitionProps, {
          children: /*#__PURE__*/_jsx(PickersPopperPaper, _extends({
            tabIndex: -1,
            elevation: 8,
            ref: handlePaperRef,
            onClick: function onClick(event) {
              onPaperClick(event);

              if (onPaperClickProp) {
                onPaperClickProp(event);
              }
            },
            onTouchStart: function onTouchStart(event) {
              onPaperTouchStart(event);

              if (onPaperTouchStartProp) {
                onPaperTouchStartProp(event);
              }
            },
            ownerState: _extends({}, ownerState, {
              placement: placement
            }),
            className: classes.paper
          }, otherPaperProps, {
            children: /*#__PURE__*/_jsxs(PaperContent, _extends({}, componentsProps == null ? void 0 : componentsProps.paperContent, {
              children: [_children, /*#__PURE__*/_jsx(ActionBar, _extends({
                onAccept: onAccept,
                onClear: onClear,
                onCancel: onCancel,
                onSetToday: onSetToday,
                actions: []
              }, componentsProps == null ? void 0 : componentsProps.actionBar))]
            }))
          }))
        }))
      }));
    }
  }));
}