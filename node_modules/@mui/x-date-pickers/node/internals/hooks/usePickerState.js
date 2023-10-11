"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.usePickerState = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var React = _interopRequireWildcard(require("react"));

var _useOpenState = require("./useOpenState");

var _useUtils = require("./useUtils");

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

const usePickerState = (props, valueManager) => {
  const {
    onAccept,
    onChange,
    value,
    closeOnSelect
  } = props;
  const utils = (0, _useUtils.useUtils)();
  const {
    isOpen,
    setIsOpen
  } = (0, _useOpenState.useOpenState)(props);
  const parsedDateValue = React.useMemo(() => valueManager.parseInput(utils, value), [valueManager, utils, value]);
  const [lastValidDateValue, setLastValidDateValue] = React.useState(parsedDateValue);
  const [dateState, setDateState] = React.useState(() => ({
    committed: parsedDateValue,
    draft: parsedDateValue,
    resetFallback: parsedDateValue
  }));
  const setDate = React.useCallback(params => {
    setDateState(prev => {
      switch (params.action) {
        case 'setAll':
        case 'acceptAndClose':
          {
            return {
              draft: params.value,
              committed: params.value,
              resetFallback: params.value
            };
          }

        case 'setCommitted':
          {
            return (0, _extends2.default)({}, prev, {
              draft: params.value,
              committed: params.value
            });
          }

        case 'setDraft':
          {
            return (0, _extends2.default)({}, prev, {
              draft: params.value
            });
          }

        default:
          {
            return prev;
          }
      }
    });

    if (params.forceOnChangeCall || !params.skipOnChangeCall && !valueManager.areValuesEqual(utils, dateState.committed, params.value)) {
      onChange(params.value);
    }

    if (params.action === 'acceptAndClose') {
      setIsOpen(false);

      if (onAccept && !valueManager.areValuesEqual(utils, dateState.resetFallback, params.value)) {
        onAccept(params.value);
      }
    }
  }, [onAccept, onChange, setIsOpen, dateState, utils, valueManager]);
  React.useEffect(() => {
    if (utils.isValid(parsedDateValue)) {
      setLastValidDateValue(parsedDateValue);
    }
  }, [utils, parsedDateValue]);
  React.useEffect(() => {
    if (isOpen) {
      // Update all dates in state to equal the current prop value
      setDate({
        action: 'setAll',
        value: parsedDateValue,
        skipOnChangeCall: true
      });
    }
  }, [isOpen]); // eslint-disable-line react-hooks/exhaustive-deps
  // Set the draft and committed date to equal the new prop value.

  if (!valueManager.areValuesEqual(utils, dateState.committed, parsedDateValue)) {
    setDate({
      action: 'setCommitted',
      value: parsedDateValue,
      skipOnChangeCall: true
    });
  }

  const wrapperProps = React.useMemo(() => ({
    open: isOpen,
    onClear: () => {
      // Reset all date in state to the empty value and close picker.
      setDate({
        value: valueManager.emptyValue,
        action: 'acceptAndClose',
        // force `onChange` in cases like input (value) === `Invalid date`
        forceOnChangeCall: !valueManager.areValuesEqual(utils, value, valueManager.emptyValue)
      });
    },
    onAccept: () => {
      // Set all date in state to equal the current draft value and close picker.
      setDate({
        value: dateState.draft,
        action: 'acceptAndClose',
        // force `onChange` in cases like input (value) === `Invalid date`
        forceOnChangeCall: !valueManager.areValuesEqual(utils, value, parsedDateValue)
      });
    },
    onDismiss: () => {
      // Set all dates in state to equal the last committed date.
      // e.g. Reset the state to the last committed value.
      setDate({
        value: dateState.committed,
        action: 'acceptAndClose'
      });
    },
    onCancel: () => {
      // Set all dates in state to equal the last accepted date and close picker.
      // e.g. Reset the state to the last accepted value
      setDate({
        value: dateState.resetFallback,
        action: 'acceptAndClose'
      });
    },
    onSetToday: () => {
      // Set all dates in state to equal today and close picker.
      setDate({
        value: valueManager.getTodayValue(utils),
        action: 'acceptAndClose'
      });
    }
  }), [setDate, isOpen, utils, dateState, valueManager, value, parsedDateValue]); // Mobile keyboard view is a special case.
  // When it's open picker should work like closed, because we are just showing text field

  const [isMobileKeyboardViewOpen, setMobileKeyboardViewOpen] = React.useState(false);
  const pickerProps = React.useMemo(() => ({
    parsedValue: dateState.draft,
    isMobileKeyboardViewOpen,
    toggleMobileKeyboardView: () => setMobileKeyboardViewOpen(!isMobileKeyboardViewOpen),
    onDateChange: (newDate, wrapperVariant, selectionState = 'partial') => {
      switch (selectionState) {
        case 'shallow':
          {
            // Update the `draft` state but do not fire `onChange`
            return setDate({
              action: 'setDraft',
              value: newDate,
              skipOnChangeCall: true
            });
          }

        case 'partial':
          {
            // Update the `draft` state and fire `onChange`
            return setDate({
              action: 'setDraft',
              value: newDate
            });
          }

        case 'finish':
          {
            if (closeOnSelect != null ? closeOnSelect : wrapperVariant === 'desktop') {
              // Set all dates in state to equal the new date and close picker.
              return setDate({
                value: newDate,
                action: 'acceptAndClose'
              });
            } // Updates the `committed` state and fire `onChange`


            return setDate({
              value: newDate,
              action: 'setCommitted'
            });
          }

        default:
          {
            throw new Error('MUI: Invalid selectionState passed to `onDateChange`');
          }
      }
    }
  }), [setDate, isMobileKeyboardViewOpen, dateState.draft, closeOnSelect]);
  const handleInputChange = React.useCallback((newParsedValue, keyboardInputValue) => {
    const cleanParsedValue = valueManager.valueReducer ? valueManager.valueReducer(utils, lastValidDateValue, newParsedValue) : newParsedValue;
    onChange(cleanParsedValue, keyboardInputValue);
  }, [onChange, valueManager, lastValidDateValue, utils]);
  const inputProps = React.useMemo(() => ({
    onChange: handleInputChange,
    open: isOpen,
    rawValue: value,
    openPicker: () => setIsOpen(true)
  }), [handleInputChange, isOpen, value, setIsOpen]);
  const pickerState = {
    pickerProps,
    inputProps,
    wrapperProps
  };
  React.useDebugValue(pickerState, () => ({
    MuiPickerState: {
      dateState,
      other: pickerState
    }
  }));
  return pickerState;
};

exports.usePickerState = usePickerState;