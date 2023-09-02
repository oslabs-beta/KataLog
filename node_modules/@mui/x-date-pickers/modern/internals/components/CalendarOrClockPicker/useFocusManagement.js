import * as React from 'react';
export const useFocusManagement = ({
  autoFocus,
  openView
}) => {
  const [focusedView, setFocusedView] = React.useState(autoFocus ? openView : null);
  const setFocusedViewCallback = React.useCallback(view => newHasFocus => {
    if (newHasFocus) {
      setFocusedView(view);
    } else {
      setFocusedView(prevFocusedView => view === prevFocusedView ? null : prevFocusedView);
    }
  }, []);
  return {
    focusedView,
    setFocusedView: setFocusedViewCallback
  };
};