"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CalendarOrClockPicker = CalendarOrClockPicker;
exports.MobileKeyboardInputView = void 0;

var _objectWithoutPropertiesLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutPropertiesLoose"));

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var React = _interopRequireWildcard(require("react"));

var _styles = require("@mui/material/styles");

var _material = require("@mui/material");

var _useViews = require("../../hooks/useViews");

var _ClockPicker = require("../../../ClockPicker/ClockPicker");

var _CalendarPicker = require("../../../CalendarPicker/CalendarPicker");

var _KeyboardDateInput = require("../KeyboardDateInput");

var _useIsLandscape = require("../../hooks/useIsLandscape");

var _WrapperVariantContext = require("../wrappers/WrapperVariantContext");

var _PickerViewRoot = require("../PickerViewRoot");

var _useFocusManagement = require("./useFocusManagement");

var _calendarOrClockPickerClasses = require("./calendarOrClockPickerClasses");

var _jsxRuntime = require("react/jsx-runtime");

const _excluded = ["autoFocus", "className", "parsedValue", "DateInputProps", "isMobileKeyboardViewOpen", "onDateChange", "onViewChange", "openTo", "orientation", "showToolbar", "toggleMobileKeyboardView", "ToolbarComponent", "toolbarFormat", "toolbarPlaceholder", "toolbarTitle", "views", "dateRangeIcon", "timeIcon", "hideTabs", "classes"];

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

const useUtilityClasses = ownerState => {
  const {
    classes
  } = ownerState;
  const slots = {
    root: ['root'],
    mobileKeyboardInputView: ['mobileKeyboardInputView']
  };
  return (0, _material.unstable_composeClasses)(slots, _calendarOrClockPickerClasses.getCalendarOrClockPickerUtilityClass, classes);
};

const MobileKeyboardInputView = (0, _styles.styled)('div', {
  name: 'MuiCalendarOrClockPicker',
  slot: 'MobileKeyboardInputView',
  overridesResolver: (_, styles) => styles.mobileKeyboardInputView
})({
  padding: '16px 24px'
});
exports.MobileKeyboardInputView = MobileKeyboardInputView;
const PickerRoot = (0, _styles.styled)('div', {
  name: 'MuiCalendarOrClockPicker',
  slot: 'Root',
  overridesResolver: (_, styles) => styles.root
})(({
  ownerState
}) => (0, _extends2.default)({
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

function CalendarOrClockPicker(inProps) {
  var _other$components, _other$componentsProp;

  const props = (0, _styles.useThemeProps)({
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
        other = (0, _objectWithoutPropertiesLoose2.default)(props, _excluded);
  const TabsComponent = (_other$components = other.components) == null ? void 0 : _other$components.Tabs;
  const isLandscape = (0, _useIsLandscape.useIsLandscape)(views, orientation);
  const wrapperVariant = React.useContext(_WrapperVariantContext.WrapperVariantContext);
  const classes = useUtilityClasses(props);
  const toShowToolbar = showToolbar != null ? showToolbar : wrapperVariant !== 'desktop';
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
  } = (0, _useViews.useViews)({
    view: undefined,
    views,
    openTo,
    onChange: handleDateChange,
    onViewChange: handleViewChange
  });
  const {
    focusedView,
    setFocusedView
  } = (0, _useFocusManagement.useFocusManagement)({
    autoFocus,
    openView
  });
  return /*#__PURE__*/(0, _jsxRuntime.jsxs)(PickerRoot, {
    ownerState: {
      isLandscape
    },
    className: classes.root,
    children: [toShowToolbar && /*#__PURE__*/(0, _jsxRuntime.jsx)(ToolbarComponent, (0, _extends2.default)({}, other, {
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
    })), showTabs && !!TabsComponent && /*#__PURE__*/(0, _jsxRuntime.jsx)(TabsComponent, (0, _extends2.default)({
      dateRangeIcon: dateRangeIcon,
      timeIcon: timeIcon,
      view: openView,
      onChange: setOpenView
    }, (_other$componentsProp = other.componentsProps) == null ? void 0 : _other$componentsProp.tabs)), /*#__PURE__*/(0, _jsxRuntime.jsx)(_PickerViewRoot.PickerViewRoot, {
      children: isMobileKeyboardViewOpen ? /*#__PURE__*/(0, _jsxRuntime.jsx)(MobileKeyboardInputView, {
        className: classes.mobileKeyboardInputView,
        children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_KeyboardDateInput.KeyboardDateInput, (0, _extends2.default)({}, DateInputProps, {
          ignoreInvalidInputs: true,
          disableOpenPicker: true,
          TextFieldProps: MobileKeyboardTextFieldProps
        }))
      }) : /*#__PURE__*/(0, _jsxRuntime.jsxs)(React.Fragment, {
        children: [isDatePickerView(openView) && /*#__PURE__*/(0, _jsxRuntime.jsx)(_CalendarPicker.CalendarPicker, (0, _extends2.default)({
          autoFocus: autoFocus,
          date: parsedValue,
          onViewChange: setOpenView,
          onChange: handleChangeAndOpenNext,
          view: openView // Unclear why the predicate `isDatePickerView` does not imply the casted type
          ,
          views: views.filter(isDatePickerView),
          focusedView: focusedView,
          onFocusedViewChange: setFocusedView
        }, other)), isTimePickerView(openView) && /*#__PURE__*/(0, _jsxRuntime.jsx)(_ClockPicker.ClockPicker, (0, _extends2.default)({}, other, {
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