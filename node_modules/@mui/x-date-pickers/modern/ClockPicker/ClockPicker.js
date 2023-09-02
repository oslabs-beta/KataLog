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

const useUtilityClasses = ownerState => {
  const {
    classes
  } = ownerState;
  const slots = {
    root: ['root'],
    arrowSwitcher: ['arrowSwitcher']
  };
  return composeClasses(slots, getClockPickerUtilityClass, classes);
};

const ClockPickerRoot = styled(PickerViewRoot, {
  name: 'MuiClockPicker',
  slot: 'Root',
  overridesResolver: (props, styles) => styles.root
})({
  display: 'flex',
  flexDirection: 'column'
});
const ClockPickerArrowSwitcher = styled(PickersArrowSwitcher, {
  name: 'MuiClockPicker',
  slot: 'ArrowSwitcher',
  overridesResolver: (props, styles) => styles.arrowSwitcher
})({
  position: 'absolute',
  right: 12,
  top: 15
});
const deprecatedPropsWarning = buildDeprecatedPropsWarning('Props for translation are deprecated. See https://mui.com/x/react-date-pickers/localization for more information.');
/**
 *
 * API:
 *
 * - [ClockPicker API](https://mui.com/x/api/date-pickers/clock-picker/)
 */

export const ClockPicker = /*#__PURE__*/React.forwardRef(function ClockPicker(inProps, ref) {
  const props = useThemeProps({
    props: inProps,
    name: 'MuiClockPicker'
  });
  const {
    ampm = false,
    ampmInClock = false,
    autoFocus,
    components,
    componentsProps,
    date,
    disableIgnoringDatePartForTimeValidation,
    getClockLabelText: getClockLabelTextProp,
    getHoursClockNumberText: getHoursClockNumberTextProp,
    getMinutesClockNumberText: getMinutesClockNumberTextProp,
    getSecondsClockNumberText: getSecondsClockNumberTextProp,
    leftArrowButtonText: leftArrowButtonTextProp,
    maxTime,
    minTime,
    minutesStep = 1,
    rightArrowButtonText: rightArrowButtonTextProp,
    shouldDisableTime,
    showViewSwitcher,
    onChange,
    view,
    views = ['hours', 'minutes'],
    openTo,
    onViewChange,
    className,
    disabled,
    readOnly
  } = props;
  deprecatedPropsWarning({
    leftArrowButtonText: leftArrowButtonTextProp,
    rightArrowButtonText: rightArrowButtonTextProp,
    getClockLabelText: getClockLabelTextProp,
    getHoursClockNumberText: getHoursClockNumberTextProp,
    getMinutesClockNumberText: getMinutesClockNumberTextProp,
    getSecondsClockNumberText: getSecondsClockNumberTextProp
  });
  const localeText = useLocaleText();
  const leftArrowButtonText = leftArrowButtonTextProp ?? localeText.openPreviousView;
  const rightArrowButtonText = rightArrowButtonTextProp ?? localeText.openNextView;
  const getClockLabelText = getClockLabelTextProp ?? localeText.clockLabelText;
  const getHoursClockNumberText = getHoursClockNumberTextProp ?? localeText.hoursClockNumberText;
  const getMinutesClockNumberText = getMinutesClockNumberTextProp ?? localeText.minutesClockNumberText;
  const getSecondsClockNumberText = getSecondsClockNumberTextProp ?? localeText.secondsClockNumberText;
  const {
    openView,
    setOpenView,
    nextView,
    previousView,
    handleChangeAndOpenNext
  } = useViews({
    view,
    views,
    openTo,
    onViewChange,
    onChange
  });
  const now = useNow();
  const utils = useUtils();
  const dateOrMidnight = React.useMemo(() => date || utils.setSeconds(utils.setMinutes(utils.setHours(now, 0), 0), 0), [date, now, utils]);
  const {
    meridiemMode,
    handleMeridiemChange
  } = useMeridiemMode(dateOrMidnight, ampm, handleChangeAndOpenNext);
  const isTimeDisabled = React.useCallback((rawValue, viewType) => {
    const isAfter = createIsAfterIgnoreDatePart(disableIgnoringDatePartForTimeValidation, utils);

    const containsValidTime = ({
      start,
      end
    }) => {
      if (minTime && isAfter(minTime, end)) {
        return false;
      }

      if (maxTime && isAfter(start, maxTime)) {
        return false;
      }

      return true;
    };

    const isValidValue = (value, step = 1) => {
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
          const value = convertValueToMeridiem(rawValue, meridiemMode, ampm);
          const dateWithNewHours = utils.setHours(dateOrMidnight, value);
          const start = utils.setSeconds(utils.setMinutes(dateWithNewHours, 0), 0);
          const end = utils.setSeconds(utils.setMinutes(dateWithNewHours, 59), 59);
          return !containsValidTime({
            start,
            end
          }) || !isValidValue(value);
        }

      case 'minutes':
        {
          const dateWithNewMinutes = utils.setMinutes(dateOrMidnight, rawValue);
          const start = utils.setSeconds(dateWithNewMinutes, 0);
          const end = utils.setSeconds(dateWithNewMinutes, 59);
          return !containsValidTime({
            start,
            end
          }) || !isValidValue(rawValue, minutesStep);
        }

      case 'seconds':
        {
          const dateWithNewSeconds = utils.setSeconds(dateOrMidnight, rawValue);
          const start = dateWithNewSeconds;
          const end = dateWithNewSeconds;
          return !containsValidTime({
            start,
            end
          }) || !isValidValue(rawValue);
        }

      default:
        throw new Error('not supported');
    }
  }, [ampm, dateOrMidnight, disableIgnoringDatePartForTimeValidation, maxTime, meridiemMode, minTime, minutesStep, shouldDisableTime, utils]);
  const selectedId = useId();
  const viewProps = React.useMemo(() => {
    switch (openView) {
      case 'hours':
        {
          const handleHoursChange = (value, isFinish) => {
            const valueWithMeridiem = convertValueToMeridiem(value, meridiemMode, ampm);
            handleChangeAndOpenNext(utils.setHours(dateOrMidnight, valueWithMeridiem), isFinish);
          };

          return {
            onChange: handleHoursChange,
            value: utils.getHours(dateOrMidnight),
            children: getHourNumbers({
              date,
              utils,
              ampm,
              onChange: handleHoursChange,
              getClockNumberText: getHoursClockNumberText,
              isDisabled: value => disabled || isTimeDisabled(value, 'hours'),
              selectedId
            })
          };
        }

      case 'minutes':
        {
          const minutesValue = utils.getMinutes(dateOrMidnight);

          const handleMinutesChange = (value, isFinish) => {
            handleChangeAndOpenNext(utils.setMinutes(dateOrMidnight, value), isFinish);
          };

          return {
            value: minutesValue,
            onChange: handleMinutesChange,
            children: getMinutesNumbers({
              utils,
              value: minutesValue,
              onChange: handleMinutesChange,
              getClockNumberText: getMinutesClockNumberText,
              isDisabled: value => disabled || isTimeDisabled(value, 'minutes'),
              selectedId
            })
          };
        }

      case 'seconds':
        {
          const secondsValue = utils.getSeconds(dateOrMidnight);

          const handleSecondsChange = (value, isFinish) => {
            handleChangeAndOpenNext(utils.setSeconds(dateOrMidnight, value), isFinish);
          };

          return {
            value: secondsValue,
            onChange: handleSecondsChange,
            children: getMinutesNumbers({
              utils,
              value: secondsValue,
              onChange: handleSecondsChange,
              getClockNumberText: getSecondsClockNumberText,
              isDisabled: value => disabled || isTimeDisabled(value, 'seconds'),
              selectedId
            })
          };
        }

      default:
        throw new Error('You must provide the type for ClockView');
    }
  }, [openView, utils, date, ampm, getHoursClockNumberText, getMinutesClockNumberText, getSecondsClockNumberText, meridiemMode, handleChangeAndOpenNext, dateOrMidnight, isTimeDisabled, selectedId, disabled]);
  const ownerState = props;
  const classes = useUtilityClasses(ownerState);
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
      onLeftClick: () => setOpenView(previousView),
      onRightClick: () => setOpenView(nextView),
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