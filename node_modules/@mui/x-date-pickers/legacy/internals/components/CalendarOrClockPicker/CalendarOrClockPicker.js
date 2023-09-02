import _objectWithoutProperties from "@babel/runtime/helpers/esm/objectWithoutProperties";
import _extends from "@babel/runtime/helpers/esm/extends";
var _excluded = ["autoFocus", "className", "parsedValue", "DateInputProps", "isMobileKeyboardViewOpen", "onDateChange", "onViewChange", "openTo", "orientation", "showToolbar", "toggleMobileKeyboardView", "ToolbarComponent", "toolbarFormat", "toolbarPlaceholder", "toolbarTitle", "views", "dateRangeIcon", "timeIcon", "hideTabs", "classes"];
import * as React from 'react';
import { styled, useThemeProps } from '@mui/material/styles';
import { unstable_composeClasses as composeClasses } from '@mui/material';
import { useViews } from '../../hooks/useViews';
import { ClockPicker } from '../../../ClockPicker/ClockPicker';
import { CalendarPicker } from '../../../CalendarPicker/CalendarPicker';
import { KeyboardDateInput } from '../KeyboardDateInput';
import { useIsLandscape } from '../../hooks/useIsLandscape';
import { WrapperVariantContext } from '../wrappers/WrapperVariantContext';
import { PickerViewRoot } from '../PickerViewRoot';
import { useFocusManagement } from './useFocusManagement';
import { getCalendarOrClockPickerUtilityClass } from './calendarOrClockPickerClasses';
import { jsx as _jsx } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";

var useUtilityClasses = function useUtilityClasses(ownerState) {
  var classes = ownerState.classes;
  var slots = {
    root: ['root'],
    mobileKeyboardInputView: ['mobileKeyboardInputView']
  };
  return composeClasses(slots, getCalendarOrClockPickerUtilityClass, classes);
};

export var MobileKeyboardInputView = styled('div', {
  name: 'MuiCalendarOrClockPicker',
  slot: 'MobileKeyboardInputView',
  overridesResolver: function overridesResolver(_, styles) {
    return styles.mobileKeyboardInputView;
  }
})({
  padding: '16px 24px'
});
var PickerRoot = styled('div', {
  name: 'MuiCalendarOrClockPicker',
  slot: 'Root',
  overridesResolver: function overridesResolver(_, styles) {
    return styles.root;
  }
})(function (_ref) {
  var ownerState = _ref.ownerState;
  return _extends({
    display: 'flex',
    flexDirection: 'column'
  }, ownerState.isLandscape && {
    flexDirection: 'row'
  });
});
var MobileKeyboardTextFieldProps = {
  fullWidth: true
};

var isDatePickerView = function isDatePickerView(view) {
  return view === 'year' || view === 'month' || view === 'day';
};

var isTimePickerView = function isTimePickerView(view) {
  return view === 'hours' || view === 'minutes' || view === 'seconds';
};

var warnedOnceNotValidOpenTo = false;
export function CalendarOrClockPicker(inProps) {
  var _other$components, _other$componentsProp;

  var props = useThemeProps({
    props: inProps,
    name: 'MuiCalendarOrClockPicker'
  });

  var autoFocus = props.autoFocus,
      className = props.className,
      parsedValue = props.parsedValue,
      DateInputProps = props.DateInputProps,
      isMobileKeyboardViewOpen = props.isMobileKeyboardViewOpen,
      onDateChange = props.onDateChange,
      onViewChange = props.onViewChange,
      openTo = props.openTo,
      orientation = props.orientation,
      showToolbar = props.showToolbar,
      toggleMobileKeyboardView = props.toggleMobileKeyboardView,
      _props$ToolbarCompone = props.ToolbarComponent,
      ToolbarComponent = _props$ToolbarCompone === void 0 ? function () {
    return null;
  } : _props$ToolbarCompone,
      toolbarFormat = props.toolbarFormat,
      toolbarPlaceholder = props.toolbarPlaceholder,
      toolbarTitle = props.toolbarTitle,
      views = props.views,
      dateRangeIcon = props.dateRangeIcon,
      timeIcon = props.timeIcon,
      hideTabs = props.hideTabs,
      providedClasses = props.classes,
      other = _objectWithoutProperties(props, _excluded);

  var TabsComponent = (_other$components = other.components) == null ? void 0 : _other$components.Tabs;
  var isLandscape = useIsLandscape(views, orientation);
  var wrapperVariant = React.useContext(WrapperVariantContext);
  var classes = useUtilityClasses(props);
  var toShowToolbar = showToolbar != null ? showToolbar : wrapperVariant !== 'desktop';
  var showTabs = !hideTabs && typeof window !== 'undefined' && window.innerHeight > 667;
  var handleDateChange = React.useCallback(function (newDate, selectionState) {
    onDateChange(newDate, wrapperVariant, selectionState);
  }, [onDateChange, wrapperVariant]);
  var handleViewChange = React.useCallback(function (newView) {
    if (isMobileKeyboardViewOpen) {
      toggleMobileKeyboardView();
    }

    if (onViewChange) {
      onViewChange(newView);
    }
  }, [isMobileKeyboardViewOpen, onViewChange, toggleMobileKeyboardView]);

  if (process.env.NODE_ENV !== 'production') {
    if (!warnedOnceNotValidOpenTo && !views.includes(openTo)) {
      console.warn("MUI: `openTo=\"".concat(openTo, "\"` is not a valid prop."), "It must be an element of `views=[\"".concat(views.join('", "'), "\"]`."));
      warnedOnceNotValidOpenTo = true;
    }
  }

  var _useViews = useViews({
    view: undefined,
    views: views,
    openTo: openTo,
    onChange: handleDateChange,
    onViewChange: handleViewChange
  }),
      openView = _useViews.openView,
      setOpenView = _useViews.setOpenView,
      handleChangeAndOpenNext = _useViews.handleChangeAndOpenNext;

  var _useFocusManagement = useFocusManagement({
    autoFocus: autoFocus,
    openView: openView
  }),
      focusedView = _useFocusManagement.focusedView,
      setFocusedView = _useFocusManagement.setFocusedView;

  return /*#__PURE__*/_jsxs(PickerRoot, {
    ownerState: {
      isLandscape: isLandscape
    },
    className: classes.root,
    children: [toShowToolbar && /*#__PURE__*/_jsx(ToolbarComponent, _extends({}, other, {
      views: views,
      isLandscape: isLandscape,
      parsedValue: parsedValue,
      onChange: handleDateChange,
      setOpenView: setOpenView,
      openView: openView,
      toolbarTitle: toolbarTitle,
      toolbarFormat: toolbarFormat,
      toolbarPlaceholder: toolbarPlaceholder,
      isMobileKeyboardViewOpen: isMobileKeyboardViewOpen,
      toggleMobileKeyboardView: toggleMobileKeyboardView
    })), showTabs && !!TabsComponent && /*#__PURE__*/_jsx(TabsComponent, _extends({
      dateRangeIcon: dateRangeIcon,
      timeIcon: timeIcon,
      view: openView,
      onChange: setOpenView
    }, (_other$componentsProp = other.componentsProps) == null ? void 0 : _other$componentsProp.tabs)), /*#__PURE__*/_jsx(PickerViewRoot, {
      children: isMobileKeyboardViewOpen ? /*#__PURE__*/_jsx(MobileKeyboardInputView, {
        className: classes.mobileKeyboardInputView,
        children: /*#__PURE__*/_jsx(KeyboardDateInput, _extends({}, DateInputProps, {
          ignoreInvalidInputs: true,
          disableOpenPicker: true,
          TextFieldProps: MobileKeyboardTextFieldProps
        }))
      }) : /*#__PURE__*/_jsxs(React.Fragment, {
        children: [isDatePickerView(openView) && /*#__PURE__*/_jsx(CalendarPicker, _extends({
          autoFocus: autoFocus,
          date: parsedValue,
          onViewChange: setOpenView,
          onChange: handleChangeAndOpenNext,
          view: openView // Unclear why the predicate `isDatePickerView` does not imply the casted type
          ,
          views: views.filter(isDatePickerView),
          focusedView: focusedView,
          onFocusedViewChange: setFocusedView
        }, other)), isTimePickerView(openView) && /*#__PURE__*/_jsx(ClockPicker, _extends({}, other, {
          autoFocus: autoFocus,
          date: parsedValue,
          view: openView // Unclear why the predicate `isDatePickerView` does not imply the casted type
          ,
          views: views.filter(isTimePickerView),
          onChange: handleChangeAndOpenNext,
          onViewChange: setOpenView,
          showViewSwitcher: wrapperVariant === 'desktop'
        }))]
      })
    })]
  });
}