"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DatePickerToolbar = void 0;

var _objectWithoutPropertiesLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutPropertiesLoose"));

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var React = _interopRequireWildcard(require("react"));

var _Typography = _interopRequireDefault(require("@mui/material/Typography"));

var _styles = require("@mui/material/styles");

var _material = require("@mui/material");

var _PickersToolbar = require("../internals/components/PickersToolbar");

var _useUtils = require("../internals/hooks/useUtils");

var _shared = require("./shared");

var _datePickerToolbarClasses = require("./datePickerToolbarClasses");

var _jsxRuntime = require("react/jsx-runtime");

const _excluded = ["parsedValue", "isLandscape", "isMobileKeyboardViewOpen", "onChange", "toggleMobileKeyboardView", "toolbarFormat", "toolbarPlaceholder", "toolbarTitle", "views"];

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

const useUtilityClasses = ownerState => {
  const {
    classes
  } = ownerState;
  const slots = {
    root: ['root'],
    title: ['title']
  };
  return (0, _material.unstable_composeClasses)(slots, _datePickerToolbarClasses.getDatePickerToolbarUtilityClass, classes);
};

const DatePickerToolbarRoot = (0, _styles.styled)(_PickersToolbar.PickersToolbar, {
  name: 'MuiDatePickerToolbar',
  slot: 'Root',
  overridesResolver: (_, styles) => styles.root
})({});
const DatePickerToolbarTitle = (0, _styles.styled)(_Typography.default, {
  name: 'MuiDatePickerToolbar',
  slot: 'Title',
  overridesResolver: (_, styles) => styles.title
})(({
  ownerState
}) => (0, _extends2.default)({}, ownerState.isLandscape && {
  margin: 'auto 16px auto auto'
}));

/**
 * @ignore - internal component.
 */
const DatePickerToolbar = /*#__PURE__*/React.forwardRef(function DatePickerToolbar(inProps, ref) {
  const props = (0, _styles.useThemeProps)({
    props: inProps,
    name: 'MuiDatePickerToolbar'
  });
  const {
    parsedValue,
    isLandscape,
    isMobileKeyboardViewOpen,
    toggleMobileKeyboardView,
    toolbarFormat,
    toolbarPlaceholder = '––',
    toolbarTitle: toolbarTitleProp,
    views
  } = props,
        other = (0, _objectWithoutPropertiesLoose2.default)(props, _excluded);
  const utils = (0, _useUtils.useUtils)();
  const localeText = (0, _useUtils.useLocaleText)();
  const classes = useUtilityClasses(props);
  const toolbarTitle = toolbarTitleProp != null ? toolbarTitleProp : localeText.datePickerDefaultToolbarTitle;
  const dateText = React.useMemo(() => {
    if (!parsedValue) {
      return toolbarPlaceholder;
    }

    if (toolbarFormat) {
      return utils.formatByString(parsedValue, toolbarFormat);
    }

    if ((0, _shared.isYearOnlyView)(views)) {
      return utils.format(parsedValue, 'year');
    }

    if ((0, _shared.isYearAndMonthViews)(views)) {
      return utils.format(parsedValue, 'month');
    } // Little localization hack (Google is doing the same for android native pickers):
    // For english localization it is convenient to include weekday into the date "Mon, Jun 1".
    // For other locales using strings like "June 1", without weekday.


    return /en/.test(utils.getCurrentLocaleCode()) ? utils.format(parsedValue, 'normalDateWithWeekday') : utils.format(parsedValue, 'normalDate');
  }, [parsedValue, toolbarFormat, toolbarPlaceholder, utils, views]);
  const ownerState = props;
  return /*#__PURE__*/(0, _jsxRuntime.jsx)(DatePickerToolbarRoot, (0, _extends2.default)({
    ref: ref,
    toolbarTitle: toolbarTitle,
    isMobileKeyboardViewOpen: isMobileKeyboardViewOpen,
    toggleMobileKeyboardView: toggleMobileKeyboardView,
    isLandscape: isLandscape,
    className: classes.root
  }, other, {
    children: /*#__PURE__*/(0, _jsxRuntime.jsx)(DatePickerToolbarTitle, {
      variant: "h4",
      align: isLandscape ? 'left' : 'center',
      ownerState: ownerState,
      className: classes.title,
      children: dateText
    })
  }));
});
exports.DatePickerToolbar = DatePickerToolbar;