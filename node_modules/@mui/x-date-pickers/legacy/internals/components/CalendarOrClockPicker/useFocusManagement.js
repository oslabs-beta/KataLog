import _slicedToArray from "@babel/runtime/helpers/esm/slicedToArray";
import * as React from 'react';
export var useFocusManagement = function useFocusManagement(_ref) {
  var autoFocus = _ref.autoFocus,
      openView = _ref.openView;

  var _React$useState = React.useState(autoFocus ? openView : null),
      _React$useState2 = _slicedToArray(_React$useState, 2),
      focusedView = _React$useState2[0],
      setFocusedView = _React$useState2[1];

  var setFocusedViewCallback = React.useCallback(function (view) {
    return function (newHasFocus) {
      if (newHasFocus) {
        setFocusedView(view);
      } else {
        setFocusedView(function (prevFocusedView) {
          return view === prevFocusedView ? null : prevFocusedView;
        });
      }
    };
  }, []);
  return {
    focusedView: focusedView,
    setFocusedView: setFocusedViewCallback
  };
};