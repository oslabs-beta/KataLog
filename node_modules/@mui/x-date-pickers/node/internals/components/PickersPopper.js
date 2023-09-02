"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PickersPopper = PickersPopper;

var _objectWithoutPropertiesLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutPropertiesLoose"));

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var React = _interopRequireWildcard(require("react"));

var _Grow = _interopRequireDefault(require("@mui/material/Grow"));

var _Paper = _interopRequireDefault(require("@mui/material/Paper"));

var _Popper = _interopRequireDefault(require("@mui/material/Popper"));

var _Unstable_TrapFocus = _interopRequireDefault(require("@mui/material/Unstable_TrapFocus"));

var _utils = require("@mui/material/utils");

var _styles = require("@mui/material/styles");

var _material = require("@mui/material");

var _PickersActionBar = require("../../PickersActionBar");

var _pickersPopperClasses = require("./pickersPopperClasses");

var _utils2 = require("../utils/utils");

var _jsxRuntime = require("react/jsx-runtime");

const _excluded = ["onClick", "onTouchStart"];

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

const useUtilityClasses = ownerState => {
  const {
    classes
  } = ownerState;
  const slots = {
    root: ['root'],
    paper: ['paper']
  };
  return (0, _material.unstable_composeClasses)(slots, _pickersPopperClasses.getPickersPopperUtilityClass, classes);
};

const PickersPopperRoot = (0, _styles.styled)(_Popper.default, {
  name: 'MuiPickersPopper',
  slot: 'Root',
  overridesResolver: (_, styles) => styles.root
})(({
  theme
}) => ({
  zIndex: theme.zIndex.modal
}));
const PickersPopperPaper = (0, _styles.styled)(_Paper.default, {
  name: 'MuiPickersPopper',
  slot: 'Paper',
  overridesResolver: (_, styles) => styles.paper
})(({
  ownerState
}) => (0, _extends2.default)({
  transformOrigin: 'top center',
  outline: 0
}, ownerState.placement === 'top' && {
  transformOrigin: 'bottom center'
}));

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
  const movedRef = React.useRef(false);
  const syntheticEventRef = React.useRef(false);
  const nodeRef = React.useRef(null);
  const activatedRef = React.useRef(false);
  React.useEffect(() => {
    if (!active) {
      return undefined;
    } // Ensure that this hook is not "activated" synchronously.
    // https://github.com/facebook/react/issues/20074


    function armClickAwayListener() {
      activatedRef.current = true;
    }

    document.addEventListener('mousedown', armClickAwayListener, true);
    document.addEventListener('touchstart', armClickAwayListener, true);
    return () => {
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

  const handleClickAway = (0, _utils.useEventCallback)(event => {
    if (!activatedRef.current) {
      return;
    } // Given developers can stop the propagation of the synthetic event,
    // we can only be confident with a positive value.


    const insideReactTree = syntheticEventRef.current;
    syntheticEventRef.current = false;
    const doc = (0, _utils.ownerDocument)(nodeRef.current); // 1. IE11 support, which trigger the handleClickAway even after the unbind
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

    let insideDOM; // If not enough, can use https://github.com/DieterHolvoet/event-propagation-path/blob/master/propagationPath.js

    if (event.composedPath) {
      insideDOM = event.composedPath().indexOf(nodeRef.current) > -1;
    } else {
      insideDOM = !doc.documentElement.contains(event.target) || nodeRef.current.contains(event.target);
    }

    if (!insideDOM && !insideReactTree) {
      onClickAway(event);
    }
  }); // Keep track of mouse/touch events that bubbled up through the portal.

  const handleSynthetic = () => {
    syntheticEventRef.current = true;
  };

  React.useEffect(() => {
    if (active) {
      const doc = (0, _utils.ownerDocument)(nodeRef.current);

      const handleTouchMove = () => {
        movedRef.current = true;
      };

      doc.addEventListener('touchstart', handleClickAway);
      doc.addEventListener('touchmove', handleTouchMove);
      return () => {
        doc.removeEventListener('touchstart', handleClickAway);
        doc.removeEventListener('touchmove', handleTouchMove);
      };
    }

    return undefined;
  }, [active, handleClickAway]);
  React.useEffect(() => {
    // TODO This behavior is not tested automatically
    // It's unclear whether this is due to different update semantics in test (batched in act() vs discrete on click).
    // Or if this is a timing related issues due to different Transition components
    // Once we get rid of all the manual scheduling (e.g. setTimeout(update, 0)) we can revisit this code+test.
    if (active) {
      const doc = (0, _utils.ownerDocument)(nodeRef.current);
      doc.addEventListener('click', handleClickAway);
      return () => {
        doc.removeEventListener('click', handleClickAway); // cleanup `handleClickAway`

        syntheticEventRef.current = false;
      };
    }

    return undefined;
  }, [active, handleClickAway]);
  return [nodeRef, handleSynthetic, handleSynthetic];
}

function PickersPopper(inProps) {
  var _components$ActionBar;

  const props = (0, _styles.useThemeProps)({
    props: inProps,
    name: 'MuiPickersPopper'
  });
  const {
    anchorEl,
    children,
    containerRef = null,
    onBlur,
    onClose,
    onClear,
    onAccept,
    onCancel,
    onSetToday,
    open,
    PopperProps,
    role,
    TransitionComponent = _Grow.default,
    TrapFocusProps,
    PaperProps = {},
    components,
    componentsProps
  } = props;
  React.useEffect(() => {
    function handleKeyDown(nativeEvent) {
      // IE11, Edge (prior to using Bink?) use 'Esc'
      if (open && (nativeEvent.key === 'Escape' || nativeEvent.key === 'Esc')) {
        onClose();
      }
    }

    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [onClose, open]);
  const lastFocusedElementRef = React.useRef(null);
  React.useEffect(() => {
    if (role === 'tooltip') {
      return;
    }

    if (open) {
      lastFocusedElementRef.current = (0, _utils2.getActiveElement)(document);
    } else if (lastFocusedElementRef.current && lastFocusedElementRef.current instanceof HTMLElement) {
      // make sure the button is flushed with updated label, before returning focus to it
      // avoids issue, where screen reader could fail to announce selected date after selection
      setTimeout(() => {
        if (lastFocusedElementRef.current instanceof HTMLElement) {
          lastFocusedElementRef.current.focus();
        }
      });
    }
  }, [open, role]);
  const [clickAwayRef, onPaperClick, onPaperTouchStart] = useClickAwayListener(open, onBlur != null ? onBlur : onClose);
  const paperRef = React.useRef(null);
  const handleRef = (0, _utils.useForkRef)(paperRef, containerRef);
  const handlePaperRef = (0, _utils.useForkRef)(handleRef, clickAwayRef);
  const ownerState = props;
  const classes = useUtilityClasses(ownerState);
  const {
    onClick: onPaperClickProp,
    onTouchStart: onPaperTouchStartProp
  } = PaperProps,
        otherPaperProps = (0, _objectWithoutPropertiesLoose2.default)(PaperProps, _excluded);

  const handleKeyDown = event => {
    if (event.key === 'Escape') {
      // stop the propagation to avoid closing parent modal
      event.stopPropagation();
      onClose();
    }
  };

  const ActionBar = (_components$ActionBar = components == null ? void 0 : components.ActionBar) != null ? _components$ActionBar : _PickersActionBar.PickersActionBar;
  const PaperContent = (components == null ? void 0 : components.PaperContent) || React.Fragment;
  return /*#__PURE__*/(0, _jsxRuntime.jsx)(PickersPopperRoot, (0, _extends2.default)({
    transition: true,
    role: role,
    open: open,
    anchorEl: anchorEl,
    onKeyDown: handleKeyDown,
    className: classes.root
  }, PopperProps, {
    children: ({
      TransitionProps,
      placement
    }) => /*#__PURE__*/(0, _jsxRuntime.jsx)(_Unstable_TrapFocus.default, (0, _extends2.default)({
      open: open,
      disableAutoFocus: true // pickers are managing focus position manually
      // without this prop the focus is returned to the button before `aria-label` is updated
      // which would force screen readers to read too old label
      ,
      disableRestoreFocus: true,
      disableEnforceFocus: role === 'tooltip',
      isEnabled: () => true
    }, TrapFocusProps, {
      children: /*#__PURE__*/(0, _jsxRuntime.jsx)(TransitionComponent, (0, _extends2.default)({}, TransitionProps, {
        children: /*#__PURE__*/(0, _jsxRuntime.jsx)(PickersPopperPaper, (0, _extends2.default)({
          tabIndex: -1,
          elevation: 8,
          ref: handlePaperRef,
          onClick: event => {
            onPaperClick(event);

            if (onPaperClickProp) {
              onPaperClickProp(event);
            }
          },
          onTouchStart: event => {
            onPaperTouchStart(event);

            if (onPaperTouchStartProp) {
              onPaperTouchStartProp(event);
            }
          },
          ownerState: (0, _extends2.default)({}, ownerState, {
            placement
          }),
          className: classes.paper
        }, otherPaperProps, {
          children: /*#__PURE__*/(0, _jsxRuntime.jsxs)(PaperContent, (0, _extends2.default)({}, componentsProps == null ? void 0 : componentsProps.paperContent, {
            children: [children, /*#__PURE__*/(0, _jsxRuntime.jsx)(ActionBar, (0, _extends2.default)({
              onAccept: onAccept,
              onClear: onClear,
              onCancel: onCancel,
              onSetToday: onSetToday,
              actions: []
            }, componentsProps == null ? void 0 : componentsProps.actionBar))]
          }))
        }))
      }))
    }))
  }));
}