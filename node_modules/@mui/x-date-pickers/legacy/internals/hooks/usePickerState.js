import _extends from "@babel/runtime/helpers/esm/extends";
import _slicedToArray from "@babel/runtime/helpers/esm/slicedToArray";
import * as React from 'react';
import { useOpenState } from './useOpenState';
import { useUtils } from './useUtils';
export var usePickerState = function usePickerState(props, valueManager) {
  var onAccept = props.onAccept,
      onChange = props.onChange,
      value = props.value,
      closeOnSelect = props.closeOnSelect;
  var utils = useUtils();

  var _useOpenState = useOpenState(props),
      isOpen = _useOpenState.isOpen,
      setIsOpen = _useOpenState.setIsOpen;

  var parsedDateValue = React.useMemo(function () {
    return valueManager.parseInput(utils, value);
  }, [valueManager, utils, value]);

  var _React$useState = React.useState(parsedDateValue),
      _React$useState2 = _slicedToArray(_React$useState, 2),
      lastValidDateValue = _React$useState2[0],
      setLastValidDateValue = _React$useState2[1];

  var _React$useState3 = React.useState(function () {
    return {
      committed: parsedDateValue,
      draft: parsedDateValue,
      resetFallback: parsedDateValue
    };
  }),
      _React$useState4 = _slicedToArray(_React$useState3, 2),
      dateState = _React$useState4[0],
      setDateState = _React$useState4[1];

  var setDate = React.useCallback(function (params) {
    setDateState(function (prev) {
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
            return _extends({}, prev, {
              draft: params.value,
              committed: params.value
            });
          }

        case 'setDraft':
          {
            return _extends({}, prev, {
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
  React.useEffect(function () {
    if (utils.isValid(parsedDateValue)) {
      setLastValidDateValue(parsedDateValue);
    }
  }, [utils, parsedDateValue]);
  React.useEffect(function () {
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

  var wrapperProps = React.useMemo(function () {
    return {
      open: isOpen,
      onClear: function onClear() {
        // Reset all date in state to the empty value and close picker.
        setDate({
          value: valueManager.emptyValue,
          action: 'acceptAndClose',
          // force `onChange` in cases like input (value) === `Invalid date`
          forceOnChangeCall: !valueManager.areValuesEqual(utils, value, valueManager.emptyValue)
        });
      },
      onAccept: function onAccept() {
        // Set all date in state to equal the current draft value and close picker.
        setDate({
          value: dateState.draft,
          action: 'acceptAndClose',
          // force `onChange` in cases like input (value) === `Invalid date`
          forceOnChangeCall: !valueManager.areValuesEqual(utils, value, parsedDateValue)
        });
      },
      onDismiss: function onDismiss() {
        // Set all dates in state to equal the last committed date.
        // e.g. Reset the state to the last committed value.
        setDate({
          value: dateState.committed,
          action: 'acceptAndClose'
        });
      },
      onCancel: function onCancel() {
        // Set all dates in state to equal the last accepted date and close picker.
        // e.g. Reset the state to the last accepted value
        setDate({
          value: dateState.resetFallback,
          action: 'acceptAndClose'
        });
      },
      onSetToday: function onSetToday() {
        // Set all dates in state to equal today and close picker.
        setDate({
          value: valueManager.getTodayValue(utils),
          action: 'acceptAndClose'
        });
      }
    };
  }, [setDate, isOpen, utils, dateState, valueManager, value, parsedDateValue]); // Mobile keyboard view is a special case.
  // When it's open picker should work like closed, because we are just showing text field

  var _React$useState5 = React.useState(false),
      _React$useState6 = _slicedToArray(_React$useState5, 2),
      isMobileKeyboardViewOpen = _React$useState6[0],
      setMobileKeyboardViewOpen = _React$useState6[1];

  var pickerProps = React.useMemo(function () {
    return {
      parsedValue: dateState.draft,
      isMobileKeyboardViewOpen: isMobileKeyboardViewOpen,
      toggleMobileKeyboardView: function toggleMobileKeyboardView() {
        return setMobileKeyboardViewOpen(!isMobileKeyboardViewOpen);
      },
      onDateChange: function onDateChange(newDate, wrapperVariant) {
        var selectionState = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 'partial';

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
    };
  }, [setDate, isMobileKeyboardViewOpen, dateState.draft, closeOnSelect]);
  var handleInputChange = React.useCallback(function (newParsedValue, keyboardInputValue) {
    var cleanParsedValue = valueManager.valueReducer ? valueManager.valueReducer(utils, lastValidDateValue, newParsedValue) : newParsedValue;
    onChange(cleanParsedValue, keyboardInputValue);
  }, [onChange, valueManager, lastValidDateValue, utils]);
  var inputProps = React.useMemo(function () {
    return {
      onChange: handleInputChange,
      open: isOpen,
      rawValue: value,
      openPicker: function openPicker() {
        return setIsOpen(true);
      }
    };
  }, [handleInputChange, isOpen, value, setIsOpen]);
  var pickerState = {
    pickerProps: pickerProps,
    inputProps: inputProps,
    wrapperProps: wrapperProps
  };
  React.useDebugValue(pickerState, function () {
    return {
      MuiPickerState: {
        dateState: dateState,
        other: pickerState
      }
    };
  });
  return pickerState;
};