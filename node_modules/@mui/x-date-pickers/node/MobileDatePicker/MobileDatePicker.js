"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MobileDatePicker = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _objectWithoutPropertiesLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutPropertiesLoose"));

var React = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _shared = require("../DatePicker/shared");

var _DatePickerToolbar = require("../DatePicker/DatePickerToolbar");

var _MobileWrapper = require("../internals/components/wrappers/MobileWrapper");

var _CalendarOrClockPicker = require("../internals/components/CalendarOrClockPicker");

var _useDateValidation = require("../internals/hooks/validation/useDateValidation");

var _PureDateInput = require("../internals/components/PureDateInput");

var _usePickerState = require("../internals/hooks/usePickerState");

var _jsxRuntime = require("react/jsx-runtime");

const _excluded = ["ToolbarComponent", "value", "onChange", "components", "componentsProps"];

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

/**
 *
 * Demos:
 *
 * - [Date Picker](https://mui.com/x/react-date-pickers/date-picker/)
 *
 * API:
 *
 * - [MobileDatePicker API](https://mui.com/x/api/date-pickers/mobile-date-picker/)
 */
const MobileDatePicker = /*#__PURE__*/React.forwardRef(function MobileDatePicker(inProps, ref) {
  const props = (0, _shared.useDatePickerDefaultizedProps)(inProps, 'MuiMobileDatePicker');
  const validationError = (0, _useDateValidation.useDateValidation)(props) !== null;
  const {
    pickerProps,
    inputProps,
    wrapperProps
  } = (0, _usePickerState.usePickerState)(props, _shared.datePickerValueManager); // Note that we are passing down all the value without spread.
  // It saves us >1kb gzip and make any prop available automatically on any level down.

  const {
    ToolbarComponent = _DatePickerToolbar.DatePickerToolbar,
    components,
    componentsProps
  } = props,
        other = (0, _objectWithoutPropertiesLoose2.default)(props, _excluded);
  const DateInputProps = (0, _extends2.default)({}, inputProps, other, {
    components,
    componentsProps,
    ref,
    validationError
  });
  return /*#__PURE__*/(0, _jsxRuntime.jsx)(_MobileWrapper.MobileWrapper, (0, _extends2.default)({}, other, wrapperProps, {
    DateInputProps: DateInputProps,
    PureDateInputComponent: _PureDateInput.PureDateInput,
    components: components,
    componentsProps: componentsProps,
    children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_CalendarOrClockPicker.CalendarOrClockPicker, (0, _extends2.default)({}, pickerProps, {
      autoFocus: true,
      toolbarTitle: props.label || props.toolbarTitle,
      ToolbarComponent: ToolbarComponent,
      DateInputProps: DateInputProps,
      components: components,
      componentsProps: componentsProps
    }, other))
  }));
});
exports.MobileDatePicker = MobileDatePicker;
process.env.NODE_ENV !== "production" ? MobileDatePicker.propTypes = {
  // ----------------------------- Warning --------------------------------
  // | These PropTypes are generated from the TypeScript type definitions |
  // | To update them edit the TypeScript types and run "yarn proptypes"  |
  // ----------------------------------------------------------------------

  /**
   * Regular expression to detect "accepted" symbols.
   * @default /\dap/gi
   */
  acceptRegex: _propTypes.default.instanceOf(RegExp),
  autoFocus: _propTypes.default.bool,
  children: _propTypes.default.node,

  /**
   * className applied to the root component.
   */
  className: _propTypes.default.string,

  /**
   * If `true` the popup or dialog will immediately close after submitting full date.
   * @default `true` for Desktop, `false` for Mobile (based on the chosen wrapper and `desktopModeMediaQuery` prop).
   */
  closeOnSelect: _propTypes.default.bool,

  /**
   * Overrideable components.
   * @default {}
   */
  components: _propTypes.default.object,

  /**
   * The props used for each component slot.
   * @default {}
   */
  componentsProps: _propTypes.default.object,

  /**
   * Formats the day of week displayed in the calendar header.
   * @param {string} day The day of week provided by the adapter's method `getWeekdays`.
   * @returns {string} The name to display.
   * @default (day) => day.charAt(0).toUpperCase()
   */
  dayOfWeekFormatter: _propTypes.default.func,

  /**
   * Default calendar month displayed when `value={null}`.
   */
  defaultCalendarMonth: _propTypes.default.any,

  /**
   * Props applied to the [`Dialog`](https://mui.com/material-ui/api/dialog/) element.
   */
  DialogProps: _propTypes.default.object,

  /**
   * If `true`, the picker and text field are disabled.
   * @default false
   */
  disabled: _propTypes.default.bool,

  /**
   * If `true` future days are disabled.
   * @default false
   */
  disableFuture: _propTypes.default.bool,

  /**
   * If `true`, today's date is rendering without highlighting with circle.
   * @default false
   */
  disableHighlightToday: _propTypes.default.bool,

  /**
   * Disable mask on the keyboard, this should be used rarely. Consider passing proper mask for your format.
   * @default false
   */
  disableMaskedInput: _propTypes.default.bool,

  /**
   * Do not render open picker button (renders only text field with validation).
   * @default false
   */
  disableOpenPicker: _propTypes.default.bool,

  /**
   * If `true` past days are disabled.
   * @default false
   */
  disablePast: _propTypes.default.bool,

  /**
   * Get aria-label text for control that opens picker dialog. Aria-label text must include selected date. @DateIOType
   * @template TInputDate, TDate
   * @param {TInputDate} date The date from which we want to add an aria-text.
   * @param {MuiPickersAdapter<TDate>} utils The utils to manipulate the date.
   * @returns {string} The aria-text to render inside the dialog.
   * @default (date, utils) => `Choose date, selected date is ${utils.format(utils.date(date), 'fullDate')}`
   */
  getOpenDialogAriaText: _propTypes.default.func,

  /**
   * Get aria-label text for switching between views button.
   * @param {CalendarPickerView} currentView The view from which we want to get the button text.
   * @returns {string} The label of the view.
   * @deprecated Use the `localeText` prop of `LocalizationProvider` instead, see https://mui.com/x/react-date-pickers/localization/.
   */
  getViewSwitchingButtonText: _propTypes.default.func,
  ignoreInvalidInputs: _propTypes.default.bool,

  /**
   * Props to pass to keyboard input adornment.
   */
  InputAdornmentProps: _propTypes.default.object,

  /**
   * Format string.
   */
  inputFormat: _propTypes.default.string,
  InputProps: _propTypes.default.object,

  /**
   * Pass a ref to the `input` element.
   */
  inputRef: _propTypes.default.oneOfType([_propTypes.default.func, _propTypes.default.shape({
    current: _propTypes.default.object
  })]),
  label: _propTypes.default.node,

  /**
   * Left arrow icon aria-label text.
   * @deprecated
   */
  leftArrowButtonText: _propTypes.default.string,

  /**
   * If `true` renders `LoadingComponent` in calendar instead of calendar view.
   * Can be used to preload information and show it in calendar.
   * @default false
   */
  loading: _propTypes.default.bool,

  /**
   * Custom mask. Can be used to override generate from format. (e.g. `__/__/____ __:__` or `__/__/____ __:__ _M`).
   */
  mask: _propTypes.default.string,

  /**
   * Maximal selectable date. @DateIOType
   */
  maxDate: _propTypes.default.any,

  /**
   * Minimal selectable date. @DateIOType
   */
  minDate: _propTypes.default.any,

  /**
   * Callback fired when date is accepted @DateIOType.
   * @template TValue
   * @param {TValue} value The value that was just accepted.
   */
  onAccept: _propTypes.default.func,

  /**
   * Callback fired when the value (the selected date) changes @DateIOType.
   * @template TValue
   * @param {TValue} value The new parsed value.
   * @param {string} keyboardInputValue The current value of the keyboard input.
   */
  onChange: _propTypes.default.func.isRequired,

  /**
   * Callback fired when the popup requests to be closed.
   * Use in controlled mode (see open).
   */
  onClose: _propTypes.default.func,

  /**
   * Callback that fired when input value or new `value` prop validation returns **new** validation error (or value is valid after error).
   * In case of validation error detected `reason` prop return non-null value and `TextField` must be displayed in `error` state.
   * This can be used to render appropriate form error.
   *
   * [Read the guide](https://next.material-ui-pickers.dev/guides/forms) about form integration and error displaying.
   * @DateIOType
   *
   * @template TError, TInputValue
   * @param {TError} reason The reason why the current value is not valid.
   * @param {TInputValue} value The invalid value.
   */
  onError: _propTypes.default.func,

  /**
   * Callback firing on month change @DateIOType.
   * @template TDate
   * @param {TDate} month The new month.
   * @returns {void|Promise} -
   */
  onMonthChange: _propTypes.default.func,

  /**
   * Callback fired when the popup requests to be opened.
   * Use in controlled mode (see open).
   */
  onOpen: _propTypes.default.func,

  /**
   * Callback fired on view change.
   * @param {CalendarPickerView} view The new view.
   */
  onViewChange: _propTypes.default.func,

  /**
   * Callback firing on year change @DateIOType.
   * @template TDate
   * @param {TDate} year The new year.
   */
  onYearChange: _propTypes.default.func,

  /**
   * Control the popup or dialog open state.
   */
  open: _propTypes.default.bool,

  /**
   * Props to pass to keyboard adornment button.
   */
  OpenPickerButtonProps: _propTypes.default.object,

  /**
   * First view to show.
   * Must be a valid option from `views` list
   * @default 'day'
   */
  openTo: _propTypes.default.oneOf(['day', 'month', 'year']),

  /**
   * Force rendering in particular orientation.
   */
  orientation: _propTypes.default.oneOf(['landscape', 'portrait']),

  /**
   * Make picker read only.
   * @default false
   */
  readOnly: _propTypes.default.bool,

  /**
   * Disable heavy animations.
   * @default typeof navigator !== 'undefined' && /(android)/i.test(navigator.userAgent)
   */
  reduceAnimations: _propTypes.default.bool,

  /**
   * Custom renderer for day. Check the [PickersDay](https://mui.com/x/api/date-pickers/pickers-day/) component.
   * @template TDate
   * @param {TDate} day The day to render.
   * @param {Array<TDate | null>} selectedDays The days currently selected.
   * @param {PickersDayProps<TDate>} pickersDayProps The props of the day to render.
   * @returns {JSX.Element} The element representing the day.
   */
  renderDay: _propTypes.default.func,

  /**
   * The `renderInput` prop allows you to customize the rendered input.
   * The `props` argument of this render prop contains props of [TextField](https://mui.com/material-ui/api/text-field/#props) that you need to forward.
   * Pay specific attention to the `ref` and `inputProps` keys.
   * @example ```jsx
   * renderInput={props => <TextField {...props} />}
   * ````
   * @param {MuiTextFieldPropsType} props The props of the input.
   * @returns {React.ReactNode} The node to render as the input.
   */
  renderInput: _propTypes.default.func.isRequired,

  /**
   * Component displaying when passed `loading` true.
   * @returns {React.ReactNode} The node to render when loading.
   * @default () => <span data-mui-test="loading-progress">...</span>
   */
  renderLoading: _propTypes.default.func,

  /**
   * Custom formatter to be passed into Rifm component.
   * @param {string} str The un-formatted string.
   * @returns {string} The formatted string.
   */
  rifmFormatter: _propTypes.default.func,

  /**
   * Right arrow icon aria-label text.
   * @deprecated
   */
  rightArrowButtonText: _propTypes.default.string,

  /**
   * Disable specific date. @DateIOType
   * @template TDate
   * @param {TDate} day The date to test.
   * @returns {boolean} Returns `true` if the date should be disabled.
   */
  shouldDisableDate: _propTypes.default.func,

  /**
   * Disable specific months dynamically.
   * Works like `shouldDisableDate` but for month selection view @DateIOType.
   * @template TDate
   * @param {TDate} month The month to check.
   * @returns {boolean} If `true` the month will be disabled.
   */
  shouldDisableMonth: _propTypes.default.func,

  /**
   * Disable specific years dynamically.
   * Works like `shouldDisableDate` but for year selection view @DateIOType.
   * @template TDate
   * @param {TDate} year The year to test.
   * @returns {boolean} Returns `true` if the year should be disabled.
   */
  shouldDisableYear: _propTypes.default.func,

  /**
   * If `true`, days that have `outsideCurrentMonth={true}` are displayed.
   * @default false
   */
  showDaysOutsideCurrentMonth: _propTypes.default.bool,

  /**
   * If `true`, show the toolbar even in desktop mode.
   */
  showToolbar: _propTypes.default.bool,

  /**
   * Component that will replace default toolbar renderer.
   * @default DatePickerToolbar
   */
  ToolbarComponent: _propTypes.default.elementType,

  /**
   * Date format, that is displaying in toolbar.
   */
  toolbarFormat: _propTypes.default.string,

  /**
   * Mobile picker date value placeholder, displaying if `value` === `null`.
   * @default '–'
   */
  toolbarPlaceholder: _propTypes.default.node,

  /**
   * Mobile picker title, displaying in the toolbar.
   * @default 'Select date'
   */
  toolbarTitle: _propTypes.default.node,

  /**
   * The value of the picker.
   */
  value: _propTypes.default.any,

  /**
   * Array of views to show.
   * @default ['year', 'day']
   */
  views: _propTypes.default.arrayOf(_propTypes.default.oneOf(['day', 'month', 'year']).isRequired)
} : void 0;