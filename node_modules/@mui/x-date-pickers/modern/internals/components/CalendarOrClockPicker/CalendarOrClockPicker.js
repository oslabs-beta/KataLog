import _objectWithoutPropertiesLoose from "@babel/runtime/helpers/esm/objectWithoutPropertiesLoose";
import _extends from "@babel/runtime/helpers/esm/extends";
const _excluded = ["autoFocus", "className", "parsedValue", "DateInputProps", "isMobileKeyboardViewOpen", "onDateChange", "onViewChange", "openTo", "orientation", "showToolbar", "toggleMobileKeyboardView", "ToolbarComponent", "toolbarFormat", "toolbarPlaceholder", "toolbarTitle", "views", "dateRangeIcon", "timeIcon", "hideTabs", "classes"];
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

const useUtilityClasses = ownerState => {
  const {
    classes
  } = ownerState;
  const slots = {
    root: ['root'],
    mobileKeyboardInputView: ['mobileKeyboardInputView']
  };
  return composeClasses(slots, getCalendarOrClockPickerUtilityClass, classes);
};

export const MobileKeyboardInputView = styled('div', {
  name: 'MuiCalendarOrClockPicker',
  slot: 'MobileKeyboardInputView',
  overridesResolver: (_, styles) => styles.mobileKeyboardInputView
})({
  padding: '16px 24px'
});
const PickerRoot = styled('div', {
  name: 'MuiCalendarOrClockPicker',
  slot: 'Root',
  overridesResolver: (_, styles) => styles.root
})(({
  ownerState
}) => _extends({
  display: 'flex',
  flexDirection: 'column'
}, ownerState.isLandscape && {
  flexDirection: 'row'
}));
const MobileKeyboardTextFieldProps = {
  fullWidth: true
};

const isDatePickerView = view => view === 'year' || view === 'month' || view === 'day';

const isTimePickerView = view => view === 'hours' || view === 'minutes' || view === 'seconds';

let warnedOnceNotValidOpenTo = false;
export function CalendarOrClockPicker(inProps) {
  const props = useThemeProps({
    props: inProps,
    name: 'MuiCalendarOrClockPicker'
  });

  const {
    autoFocus,
    parsedValue,
    DateInputProps,
    isMobileKeyboardViewOpen,
    onDateChange,
    onViewChange,
    openTo,
    orientation,
    showToolbar,
    toggleMobileKeyboardView,
    ToolbarComponent = () => null,
    toolbarFormat,
    toolbarPlaceholder,
    toolbarTitle,
    views,
    dateRangeIcon,
    timeIcon,
    hideTabs
  } = props,
        other = _objectWithoutPropertiesLoose(props, _excluded);

  const TabsComponent = other.components?.Tabs;
  const isLandscape = useIsLandscape(views, orientation);
  const wrapperVariant = React.useContext(WrapperVariantContext);
  const classes = useUtilityClasses(props);
  const toShowToolbar = showToolbar ?? wrapperVariant !== 'desktop';
  const showTabs = !hideTabs && typeof window !== 'undefined' && window.innerHeight > 667;
  const handleDateChange = React.useCallback((newDate, selectionState) => {
    onDateChange(newDate, wrapperVariant, selectionState);
  }, [onDateChange, wrapperVariant]);
  const handleViewChange = React.useCallback(newView => {
    if (isMobileKeyboardViewOpen) {
      toggleMobileKeyboardView();
    }

    if (onViewChange) {
      onViewChange(newView);
    }
  }, [isMobileKeyboardViewOpen, onViewChange, toggleMobileKeyboardView]);

  if (process.env.NODE_ENV !== 'production') {
    if (!warnedOnceNotValidOpenTo && !views.includes(openTo)) {
      console.warn(`MUI: \`openTo="${openTo}"\` is not a valid prop.`, `It must be an element of \`views=["${views.join('", "')}"]\`.`);
      warnedOnceNotValidOpenTo = true;
    }
  }

  const {
    openView,
    setOpenView,
    handleChangeAndOpenNext
  } = useViews({
    view: undefined,
    views,
    openTo,
    onChange: handleDateChange,
    onViewChange: handleViewChange
  });
  const {
    focusedView,
    setFocusedView
  } = useFocusManagement({
    autoFocus,
    openView
  });
  return /*#__PURE__*/_jsxs(PickerRoot, {
    ownerState: {
      isLandscape
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
    }, other.componentsProps?.tabs)), /*#__PURE__*/_jsx(PickerViewRoot, {
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