import _extends from "@babel/runtime/helpers/esm/extends";
import * as React from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { unstable_useId as useId } from '@mui/material/utils';
import { styled, useThemeProps } from '@mui/material/styles';
import { unstable_composeClasses as composeClasses } from '@mui/material';
import { Clock } from './Clock';
import { useUtils, useNow, useLocaleText } from '../internals/hooks/useUtils';
import { buildDeprecatedPropsWarning } from '../internals/utils/warning';
import { getHourNumbers, getMinutesNumbers } from './ClockNumbers';
import { PickersArrowSwitcher } from '../internals/components/PickersArrowSwitcher';
import { convertValueToMeridiem, createIsAfterIgnoreDatePart } from '../internals/utils/time-utils';
import { useViews } from '../internals/hooks/useViews';
import { useMeridiemMode } from '../internals/hooks/date-helpers-hooks';
import { getClockPickerUtilityClass } from './clockPickerClasses';
import { PickerViewRoot } from '../internals/components/PickerViewRoot';
import { jsx as _jsx } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";

var useUtilityClasses = function useUtilityClasses(ownerState) {
  var classes = ownerState.classes;
  var slots = {
    root: ['root'],
    arrowSwitcher: ['arrowSwitcher']
  };
  return composeClasses(slots, getClockPickerUtilityClass, classes);
};

var ClockPickerRoot = styled(PickerViewRoot, {
  name: 'MuiClockPicker',
  slot: 'Root',
  overridesResolver: function overridesResolver(props, styles) {
    return styles.root;
  }
})({
  display: 'flex',
  flexDirection: 'column'
});
var ClockPickerArrowSwitcher = styled(PickersArrowSwitcher, {
  name: 'MuiClockPicker',
  slot: 'ArrowSwitcher',
  overridesResolver: function overridesResolver(props, styles) {
    return styles.arrowSwitcher;
  }
})({
  position: 'absolute',
  right: 12,
  top: 15
});
var deprecatedPropsWarning = buildDeprecatedPropsWarning('Props for translation are deprecated. See https://mui.com/x/react-date-pickers/localization for more information.');
/**
 *
 * API:
 *
 * - [ClockPicker API](https://mui.com/x/api/date-pickers/clock-picker/)
 */

export var ClockPicker = /*#__PURE__*/React.forwardRef(function ClockPicker(inProps, ref) {
  var props = useThemeProps({
    props: inProps,
    name: 'MuiClockPicker'
  });
  var _props$ampm = props.ampm,
      ampm = _props$ampm === void 0 ? false : _props$ampm,
      _props$ampmInClock = props.ampmInClock,
      ampmInClock = _props$ampmInClock === void 0 ? false : _props$ampmInClock,
      autoFocus = props.autoFocus,
      components = props.components,
      componentsProps = props.componentsProps,
      date = props.date,
      disableIgnoringDatePartForTimeValidation = props.disableIgnoringDatePartForTimeValidation,
      getClockLabelTextProp = props.getClockLabelText,
      getHoursClockNumberTextProp = props.getHoursClockNumberText,
      getMinutesClockNumberTextProp = props.getMinutesClockNumberText,
      getSecondsClockNumberTextProp = props.getSecondsClockNumberText,
      leftArrowButtonTextProp = props.leftArrowButtonText,
      maxTime = props.maxTime,
      minTime = props.minTime,
      _props$minutesStep = props.minutesStep,
      minutesStep = _props$minutesStep === void 0 ? 1 : _props$minutesStep,
      rightArrowButtonTextProp = props.rightArrowButtonText,
      shouldDisableTime = props.shouldDisableTime,
      showViewSwitcher = props.showViewSwitcher,
      onChange = props.onChange,
      view = props.view,
      _props$views = props.views,
      views = _props$views === void 0 ? ['hours', 'minutes'] : _props$views,
      openTo = props.openTo,
      onViewChange = props.onViewChange,
      className = props.className,
      disabled = props.disabled,
      readOnly = props.readOnly;
  deprecatedPropsWarning({
    leftArrowButtonText: leftArrowButtonTextProp,
    rightArrowButtonText: rightArrowButtonTextProp,
    getClockLabelText: getClockLabelTextProp,
    getHoursClockNumberText: getHoursClockNumberTextProp,
    getMinutesClockNumberText: getMinutesClockNumberTextProp,
    getSecondsClockNumberText: getSecondsClockNumberTextProp
  });
  var localeText = useLocaleText();
  var leftArrowButtonText = leftArrowButtonTextProp != null ? leftArrowButtonTextProp : localeText.openPreviousView;
  var rightArrowButtonText = rightArrowButtonTextProp != null ? rightArrowButtonTextProp : localeText.openNextView;
  var getClockLabelText = getClockLabelTextProp != null ? getClockLabelTextProp : localeText.clockLabelText;
  var getHoursClockNumberText = getHoursClockNumberTextProp != null ? getHoursClockNumberTextProp : localeText.hoursClockNumberText;
  var getMinutesClockNumberText = getMinutesClockNumberTextProp != null ? getMinutesClockNumberTextProp : localeText.minutesClockNumberText;
  var getSecondsClockNumberText = getSecondsClockNumberTextProp != null ? getSecondsClockNumberTextProp : localeText.secondsClockNumberText;

  var _useViews = useViews({
    view: view,
    views: views,
    openTo: openTo,
    onViewChange: onViewChange,
    onChange: onChange
  }),
      openView = _useViews.openView,
      setOpenView = _useViews.setOpenView,
      nextView = _useViews.nextView,
      previousView = _useViews.previousView,
      handleChangeAndOpenNext = _useViews.handleChangeAndOpenNext;

  var now = useNow();
  var utils = useUtils();
  var dateOrMidnight = React.useMemo(function () {
    return date || utils.setSeconds(utils.setMinutes(utils.setHours(now, 0), 0), 0);
  }, [date, now, utils]);

  var _useMeridiemMode = useMeridiemMode(dateOrMidnight, ampm, handleChangeAndOpenNext),
      meridiemMode = _useMeridiemMode.meridiemMode,
      handleMeridiemChange = _useMeridiemMode.handleMeridiemChange;

  var isTimeDisabled = React.useCallback(function (rawValue, viewType) {
    var isAfter = createIsAfterIgnoreDatePart(disableIgnoringDatePartForTimeValidation, utils);

    var containsValidTime = function containsValidTime(_ref) {
      var start = _ref.start,
          end = _ref.end;

      if (minTime && isAfter(minTime, end)) {
        return false;
      }

      if (maxTime && isAfter(start, maxTime)) {
        return false;
      }

      return true;
    };

    var isValidValue = function isValidValue(value) {
      var step = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 1;

      if (value % step !== 0) {
        return false;
      }

      if (shouldDisableTime) {
        return !shouldDisableTime(value, viewType);
      }

      return true;
    };

    switch (viewType) {
      case 'hours':
        {
          var value = convertValueToMeridiem(rawValue, meridiemMode, ampm);
          var dateWithNewHours = utils.setHours(dateOrMidnight, value);
          var start = utils.setSeconds(utils.setMinutes(dateWithNewHours, 0), 0);
          var end = utils.setSeconds(utils.setMinutes(dateWithNewHours, 59), 59);
          return !containsValidTime({
            start: start,
            end: end
          }) || !isValidValue(value);
        }

      case 'minutes':
        {
          var dateWithNewMinutes = utils.setMinutes(dateOrMidnight, rawValue);

          var _start = utils.setSeconds(dateWithNewMinutes, 0);

          var _end = utils.setSeconds(dateWithNewMinutes, 59);

          return !containsValidTime({
            start: _start,
            end: _end
          }) || !isValidValue(rawValue, minutesStep);
        }

      case 'seconds':
        {
          var dateWithNewSeconds = utils.setSeconds(dateOrMidnight, rawValue);
          var _start2 = dateWithNewSeconds;
          var _end2 = dateWithNewSeconds;
          return !containsValidTime({
            start: _start2,
            end: _end2
          }) || !isValidValue(rawValue);
        }

      default:
        throw new Error('not supported');
    }
  }, [ampm, dateOrMidnight, disableIgnoringDatePartForTimeValidation, maxTime, meridiemMode, minTime, minutesStep, shouldDisableTime, utils]);
  var selectedId = useId();
  var viewProps = React.useMemo(function () {
    switch (openView) {
      case 'hours':
        {
          var handleHoursChange = function handleHoursChange(value, isFinish) {
            var valueWithMeridiem = convertValueToMeridiem(value, meridiemMode, ampm);
            handleChangeAndOpenNext(utils.setHours(dateOrMidnight, valueWithMeridiem), isFinish);
          };

          return {
            onChange: handleHoursChange,
            value: utils.getHours(dateOrMidnight),
            children: getHourNumbers({
              date: date,
              utils: utils,
              ampm: ampm,
              onChange: handleHoursChange,
              getClockNumberText: getHoursClockNumberText,
              isDisabled: function isDisabled(value) {
                return disabled || isTimeDisabled(value, 'hours');
              },
              selectedId: selectedId
            })
          };
        }

      case 'minutes':
        {
          var minutesValue = utils.getMinutes(dateOrMidnight);

          var handleMinutesChange = function handleMinutesChange(value, isFinish) {
            handleChangeAndOpenNext(utils.setMinutes(dateOrMidnight, value), isFinish);
          };

          return {
            value: minutesValue,
            onChange: handleMinutesChange,
            children: getMinutesNumbers({
              utils: utils,
              value: minutesValue,
              onChange: handleMinutesChange,
              getClockNumberText: getMinutesClockNumberText,
              isDisabled: function isDisabled(value) {
                return disabled || isTimeDisabled(value, 'minutes');
              },
              selectedId: selectedId
            })
          };
        }

      case 'seconds':
        {
          var secondsValue = utils.getSeconds(dateOrMidnight);

          var handleSecondsChange = function handleSecondsChange(value, isFinish) {
            handleChangeAndOpenNext(utils.setSeconds(dateOrMidnight, value), isFinish);
          };

          return {
            value: secondsValue,
            onChange: handleSecondsChange,
            children: getMinutesNumbers({
              utils: utils,
              value: secondsValue,
              onChange: handleSecondsChange,
              getClockNumberText: getSecondsClockNumberText,
              isDisabled: function isDisabled(value) {
                return disabled || isTimeDisabled(value, 'seconds');
              },
              selectedId: selectedId
            })
          };
        }

      default:
        throw new Error('You must provide the type for ClockView');
    }
  }, [openView, utils, date, ampm, getHoursClockNumberText, getMinutesClockNumberText, getSecondsClockNumberText, meridiemMode, handleChangeAndOpenNext, dateOrMidnight, isTimeDisabled, selectedId, disabled]);
  var ownerState = props;
  var classes = useUtilityClasses(ownerState);
  return /*#__PURE__*/_jsxs(ClockPickerRoot, {
    ref: ref,
    className: clsx(classes.root, className),
    ownerState: ownerState,
    children: [showViewSwitcher && /*#__PURE__*/_jsx(ClockPickerArrowSwitcher, {
      className: classes.arrowSwitcher,
      leftArrowButtonText: leftArrowButtonText,
      rightArrowButtonText: rightArrowButtonText,
      components: components,
      componentsProps: componentsProps,
      onLeftClick: function onLeftClick() {
        return setOpenView(previousView);
      },
      onRightClick: function onRightClick() {
        return setOpenView(nextView);
      },
      isLeftDisabled: !previousView,
      isRightDisabled: !nextView,
      ownerState: ownerState
    }), /*#__PURE__*/_jsx(Clock, _extends({
      autoFocus: autoFocus,
      date: date,
      ampmInClock: ampmInClock,
      type: openView,
      ampm: ampm,
      getClockLabelText: getClockLabelText,
      minutesStep: minutesStep,
      isTimeDisabled: isTimeDisabled,
      meridiemMode: meridiemMode,
      handleMeridiemChange: handleMeridiemChange,
      selectedId: selectedId,
      disabled: disabled,
      readOnly: readOnly
    }, viewProps))]
  });
});
process.env.NODE_ENV !== "production" ? ClockPicker.propTypes = {
  // ----------------------------- Warning --------------------------------
  // | These PropTypes are generated from the TypeScript type definitions |
  // | To update them edit the TypeScript types and run "yarn proptypes"  |
  // ----------------------------------------------------------------------

  /**
   * 12h/24h view for hour selection clock.
   * @default false
   */
  ampm: PropTypes.bool,

  /**
   * Display ampm controls under the clock (instead of in the toolbar).
   * @default false
   */
  ampmInClock: PropTypes.bool,

  /**
   * Set to `true` if focus should be moved to clock picker.
   */
  autoFocus: PropTypes.bool,

  /**
   * Override or extend the styles applied to the component.
   */
  classes: PropTypes.object,
  className: PropTypes.string,

  /**
   * Overrideable components.
   * @default {}
   */
  components: PropTypes.object,

  /**
   * The props used for each component slot.
   * @default {}
   */
  componentsProps: PropTypes.object,

  /**
   * Selected date @DateIOType.
   */
  date: PropTypes.any,

  /**
   * If `true`, the picker and text field are disabled.
   * @default false
   */
  disabled: PropTypes.bool,

  /**
   * Do not ignore date part when validating min/max time.
   * @default false
   */
  disableIgnoringDatePartForTimeValidation: PropTypes.bool,

  /**
   * Accessible text that helps user to understand which time and view is selected.
   * @template TDate
   * @param {ClockPickerView} view The current view rendered.
   * @param {TDate | null} time The current time.
   * @param {MuiPickersAdapter<TDate>} adapter The current date adapter.
   * @returns {string} The clock label.
   * @deprecated Use the `localeText` prop of `LocalizationProvider` instead, see https://mui.com/x/react-date-pickers/localization/.
   * @default <TDate extends any>(
   *   view: ClockView,
   *   time: TDate | null,
   *   adapter: MuiPickersAdapter<TDate>,
   * ) =>
   *   `Select ${view}. ${
   *     time === null ? 'No time selected' : `Selected time is ${adapter.format(time, 'fullTime')}`
   *   }`
   */
  getClockLabelText: PropTypes.func,

  /**
   * Get clock number aria-text for hours.
   * @param {string} hours The hours to format.
   * @returns {string} the formatted hours text.
   * @default (hours: string) => `${hours} hours`
   * @deprecated Use the `localeText` prop of `LocalizationProvider` instead, see https://mui.com/x/react-date-pickers/localization/.
   */
  getHoursClockNumberText: PropTypes.func,

  /**
   * Get clock number aria-text for minutes.
   * @param {string} minutes The minutes to format.
   * @returns {string} the formatted minutes text.
   * @default (minutes: string) => `${minutes} minutes`
   * @deprecated Use the `localeText` prop of `LocalizationProvider` instead, see https://mui.com/x/react-date-pickers/localization/.
   */
  getMinutesClockNumberText: PropTypes.func,

  /**
   * Get clock number aria-text for seconds.
   * @param {string} seconds The seconds to format.
   * @returns {string} the formatted seconds text.
   * @default (seconds: string) => `${seconds} seconds`
   * @deprecated Use the `localeText` prop of `LocalizationProvider` instead, see https://mui.com/x/react-date-pickers/localization/.
   */
  getSecondsClockNumberText: PropTypes.func,

  /**
   * Left arrow icon aria-label text.
   * @default 'open previous view'
   * @deprecated Use the `localeText` prop of `LocalizationProvider` instead, see https://mui.com/x/react-date-pickers/localization/.
   */
  leftArrowButtonText: PropTypes.string,

  /**
   * Max time acceptable time.
   * For input validation date part of passed object will be ignored if `disableIgnoringDatePartForTimeValidation` not specified.
   */
  maxTime: PropTypes.any,

  /**
   * Min time acceptable time.
   * For input validation date part of passed object will be ignored if `disableIgnoringDatePartForTimeValidation` not specified.
   */
  minTime: PropTypes.any,

  /**
   * Step over minutes.
   * @default 1
   */
  minutesStep: PropTypes.number,

  /**
   * On change callback @DateIOType.
   */
  onChange: PropTypes.func.isRequired,

  /**
   * Callback fired on view change.
   * @param {ClockPickerView} view The new view.
   */
  onViewChange: PropTypes.func,

  /**
   * Initially open view.
   * @default 'hours'
   */
  openTo: PropTypes.oneOf(['hours', 'minutes', 'seconds']),

  /**
   * Make picker read only.
   * @default false
   */
  readOnly: PropTypes.bool,

  /**
   * Right arrow icon aria-label text.
   * @default 'open next view'
   * @deprecated Use the `localeText` prop of `LocalizationProvider` instead, see https://mui.com/x/react-date-pickers/localization/.
   */
  rightArrowButtonText: PropTypes.string,

  /**
   * Dynamically check if time is disabled or not.
   * If returns `false` appropriate time point will ot be acceptable.
   * @param {number} timeValue The value to check.
   * @param {ClockPickerView} clockType The clock type of the timeValue.
   * @returns {boolean} Returns `true` if the time should be disabled
   */
  shouldDisableTime: PropTypes.func,
  showViewSwitcher: PropTypes.bool,

  /**
   * Controlled open view.
   */
  view: PropTypes.oneOf(['hours', 'minutes', 'seconds']),

  /**
   * Views for calendar picker.
   * @default ['hours', 'minutes']
   */
  views: PropTypes.arrayOf(PropTypes.oneOf(['hours', 'minutes', 'seconds']).isRequired)
} : void 0;