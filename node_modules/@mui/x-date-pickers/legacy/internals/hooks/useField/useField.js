import _toConsumableArray from "@babel/runtime/helpers/esm/toConsumableArray";
import _extends from "@babel/runtime/helpers/esm/extends";
import _slicedToArray from "@babel/runtime/helpers/esm/slicedToArray";
import _objectWithoutProperties from "@babel/runtime/helpers/esm/objectWithoutProperties";
var _excluded = ["onClick", "onKeyDown", "onFocus", "onBlur"];
import * as React from 'react';
import useEnhancedEffect from '@mui/utils/useEnhancedEffect';
import useEventCallback from '@mui/utils/useEventCallback';
import { useValidation } from '../validation/useValidation';
import { useUtils } from '../useUtils';
import { cleanTrailingZeroInNumericSectionValue, getMonthsMatchingQuery, getSectionValueNumericBoundaries, getSectionVisibleValue, adjustDateSectionValue, adjustInvalidDateSectionValue, setSectionValue } from './useField.utils';
export var useField = function useField(params) {
  var utils = useUtils();

  if (!utils.formatTokenMap) {
    throw new Error('This adapter is not compatible with the field components');
  }

  var inputRef = React.useRef(null);

  var _params$internalProps = params.internalProps,
      valueProp = _params$internalProps.value,
      defaultValue = _params$internalProps.defaultValue,
      onChange = _params$internalProps.onChange,
      _params$internalProps2 = _params$internalProps.format,
      format = _params$internalProps2 === void 0 ? utils.formats.keyboardDate : _params$internalProps2,
      _params$internalProps3 = _params$internalProps.readOnly,
      readOnly = _params$internalProps3 === void 0 ? false : _params$internalProps3,
      _params$forwardedProp = params.forwardedProps,
      onClick = _params$forwardedProp.onClick,
      onKeyDown = _params$forwardedProp.onKeyDown,
      onFocus = _params$forwardedProp.onFocus,
      onBlur = _params$forwardedProp.onBlur,
      otherForwardedProps = _objectWithoutProperties(_params$forwardedProp, _excluded),
      valueManager = params.valueManager,
      fieldValueManager = params.fieldValueManager,
      validator = params.validator;

  var firstDefaultValue = React.useRef(defaultValue);
  var focusTimeoutRef = React.useRef(undefined);
  var valueParsed = React.useMemo(function () {
    var _ref, _firstDefaultValue$cu;

    // TODO: Avoid this type casting, the emptyValues are both valid TDate and TInputDate
    var value = (_ref = (_firstDefaultValue$cu = firstDefaultValue.current) != null ? _firstDefaultValue$cu : valueProp) != null ? _ref : valueManager.emptyValue;
    return valueManager.parseInput(utils, value);
  }, [valueProp, valueManager, utils]);

  var _React$useState = React.useState(function () {
    var sections = fieldValueManager.getSectionsFromValue(utils, null, valueParsed, format);
    return {
      sections: sections,
      valueParsed: valueParsed,
      valueStr: fieldValueManager.getValueStrFromSections(sections),
      selectedSectionIndexes: null
    };
  }),
      _React$useState2 = _slicedToArray(_React$useState, 2),
      state = _React$useState2[0],
      setState = _React$useState2[1];

  var updateSections = function updateSections(sections) {
    var _fieldValueManager$ge = fieldValueManager.getValueFromSections(utils, state.sections, sections, format),
        newValueParsed = _fieldValueManager$ge.value,
        shouldPublish = _fieldValueManager$ge.shouldPublish;

    setState(function (prevState) {
      return _extends({}, prevState, {
        sections: sections,
        valueStr: fieldValueManager.getValueStrFromSections(sections),
        valueParsed: newValueParsed
      });
    });

    if (onChange && shouldPublish) {
      onChange(newValueParsed);
    }
  };

  var updateSelectedSections = function updateSelectedSections(start, end) {
    setState(function (prevState) {
      return _extends({}, prevState, {
        selectedSectionIndexes: start == null ? null : {
          start: start,
          end: end != null ? end : start
        },
        selectedSectionQuery: null
      });
    });
  };

  var handleInputClick = useEventCallback(function () {
    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    onClick == null ? void 0 : onClick.apply(void 0, _toConsumableArray(args));

    if (state.sections.length === 0) {
      return;
    }

    var nextSectionIndex = state.sections.findIndex(function (section) {
      var _inputRef$current$sel, _inputRef$current;

      return section.start > ((_inputRef$current$sel = (_inputRef$current = inputRef.current) == null ? void 0 : _inputRef$current.selectionStart) != null ? _inputRef$current$sel : 0);
    });
    var sectionIndex = nextSectionIndex === -1 ? state.sections.length - 1 : nextSectionIndex - 1;
    updateSelectedSections(sectionIndex);
  });
  var handleInputFocus = useEventCallback(function () {
    for (var _len2 = arguments.length, args = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
      args[_key2] = arguments[_key2];
    }

    onFocus == null ? void 0 : onFocus.apply(void 0, _toConsumableArray(args));
    focusTimeoutRef.current = setTimeout(function () {
      var _inputRef$current$sel2, _inputRef$current2, _inputRef$current$sel3, _inputRef$current3;

      if (((_inputRef$current$sel2 = (_inputRef$current2 = inputRef.current) == null ? void 0 : _inputRef$current2.selectionEnd) != null ? _inputRef$current$sel2 : 0) - ((_inputRef$current$sel3 = (_inputRef$current3 = inputRef.current) == null ? void 0 : _inputRef$current3.selectionStart) != null ? _inputRef$current$sel3 : 0) === 0) {
        handleInputClick();
      } else {
        updateSelectedSections(0, state.sections.length - 1);
      }
    });
  });
  var handleInputBlur = useEventCallback(function () {
    for (var _len3 = arguments.length, args = new Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
      args[_key3] = arguments[_key3];
    }

    onBlur == null ? void 0 : onBlur.apply(void 0, _toConsumableArray(args));
    updateSelectedSections();
  });
  var handleInputKeyDown = useEventCallback(function (event) {
    onKeyDown == null ? void 0 : onKeyDown(event);

    if (!inputRef.current || state.sections.length === 0) {
      return;
    } // eslint-disable-next-line default-case


    switch (true) {
      // Select all
      case event.key === 'a' && (event.ctrlKey || event.metaKey):
        {
          event.preventDefault();
          updateSelectedSections(0, state.sections.length - 1);
          return;
        }
      // Move selection to next section

      case event.key === 'ArrowRight':
        {
          event.preventDefault();

          if (state.selectedSectionIndexes == null) {
            updateSelectedSections(0);
          } else if (state.selectedSectionIndexes.start < state.sections.length - 1) {
            updateSelectedSections(state.selectedSectionIndexes.start + 1);
          } else if (state.selectedSectionIndexes.start !== state.selectedSectionIndexes.end) {
            updateSelectedSections(state.selectedSectionIndexes.end);
          }

          return;
        }
      // Move selection to previous section

      case event.key === 'ArrowLeft':
        {
          event.preventDefault();

          if (state.selectedSectionIndexes == null) {
            updateSelectedSections(state.sections.length - 1);
          } else if (state.selectedSectionIndexes.start !== state.selectedSectionIndexes.end) {
            updateSelectedSections(state.selectedSectionIndexes.start);
          } else if (state.selectedSectionIndexes.start > 0) {
            updateSelectedSections(state.selectedSectionIndexes.start - 1);
          }

          return;
        }
      // Reset the value of the selected section

      case ['Backspace', 'Delete'].includes(event.key):
        {
          event.preventDefault();

          if (readOnly) {
            return;
          }

          var resetSections = function resetSections(startIndex, endIndex) {
            var sections = state.sections;

            for (var i = startIndex; i <= endIndex; i += 1) {
              sections = setSectionValue(sections, i, '');
            }

            return sections;
          };

          if (state.selectedSectionIndexes == null) {
            updateSections(resetSections(0, state.sections.length));
          } else {
            updateSections(resetSections(state.selectedSectionIndexes.start, state.selectedSectionIndexes.end));
          }

          break;
        }
      // Increment / decrement the selected section value

      case ['ArrowUp', 'ArrowDown', 'Home', 'End', 'PageUp', 'PageDown'].includes(event.key):
        {
          event.preventDefault();

          if (readOnly || state.selectedSectionIndexes == null) {
            return;
          }

          var activeSection = state.sections[state.selectedSectionIndexes.start];
          var activeDate = fieldValueManager.getActiveDateFromActiveSection(state.valueParsed, activeSection); // The date is not valid, we have to increment the section value rather than the date

          if (!utils.isValid(activeDate.value)) {
            var newSectionValue = adjustInvalidDateSectionValue(utils, activeSection, event.key);
            updateSections(setSectionValue(state.sections, state.selectedSectionIndexes.start, newSectionValue));
          } else {
            var newDate = adjustDateSectionValue(utils, activeDate.value, activeSection.dateSectionName, event.key);
            var newValue = activeDate.update(newDate);
            var sections = fieldValueManager.getSectionsFromValue(utils, state.sections, newValue, format);
            updateSections(sections);
          }

          return;
        }
      // Apply numeric editing on the selected section value

      case !Number.isNaN(Number(event.key)):
        {
          var _activeDate$value;

          event.preventDefault();

          if (readOnly || state.selectedSectionIndexes == null) {
            return;
          }

          var _activeSection = state.sections[state.selectedSectionIndexes.start];

          var _activeDate = fieldValueManager.getActiveDateFromActiveSection(state.valueParsed, _activeSection);

          var boundaries = getSectionValueNumericBoundaries(utils, (_activeDate$value = _activeDate.value) != null ? _activeDate$value : utils.date(), _activeSection.dateSectionName);
          var concatenatedSectionValue = "".concat(_activeSection.value).concat(event.key);

          var _newSectionValue = Number(concatenatedSectionValue) > boundaries.maximum ? event.key : concatenatedSectionValue;

          updateSections(setSectionValue(state.sections, state.selectedSectionIndexes.start, cleanTrailingZeroInNumericSectionValue(_newSectionValue, boundaries.maximum)));
          return;
        }
      // Apply full letter editing on the selected section value

      case event.key.length === 1:
        {
          var _activeSection2$query;

          event.preventDefault();

          if (readOnly || state.selectedSectionIndexes == null) {
            return;
          }

          var _activeSection2 = state.sections[state.selectedSectionIndexes.start]; // TODO: Do not hardcode the compatible formatValue

          if (_activeSection2.formatValue !== 'MMMM') {
            return;
          }

          var newQuery = event.key.toLowerCase();
          var concatenatedQuery = "".concat((_activeSection2$query = _activeSection2.query) != null ? _activeSection2$query : '').concat(newQuery);
          var matchingMonthsWithConcatenatedQuery = getMonthsMatchingQuery(utils, _activeSection2.formatValue, concatenatedQuery);

          if (matchingMonthsWithConcatenatedQuery.length > 0) {
            updateSections(setSectionValue(state.sections, state.selectedSectionIndexes.start, matchingMonthsWithConcatenatedQuery[0], concatenatedQuery));
          } else {
            var matchingMonthsWithNewQuery = getMonthsMatchingQuery(utils, _activeSection2.formatValue, newQuery);

            if (matchingMonthsWithNewQuery.length > 0) {
              updateSections(setSectionValue(state.sections, state.selectedSectionIndexes.start, matchingMonthsWithNewQuery[0], newQuery));
            }
          }
        }
    }
  });
  useEnhancedEffect(function () {
    if (!inputRef.current || state.selectedSectionIndexes == null) {
      return;
    }

    var updateSelectionRangeIfChanged = function updateSelectionRangeIfChanged(selectionStart, selectionEnd) {
      if (selectionStart !== inputRef.current.selectionStart || selectionEnd !== inputRef.current.selectionEnd) {
        inputRef.current.setSelectionRange(selectionStart, selectionEnd);
      }
    };

    var firstSelectedSection = state.sections[state.selectedSectionIndexes.start];
    var lastSelectedSection = state.sections[state.selectedSectionIndexes.end];
    updateSelectionRangeIfChanged(firstSelectedSection.start, lastSelectedSection.start + getSectionVisibleValue(lastSelectedSection).length);
  });
  React.useEffect(function () {
    if (!valueManager.areValuesEqual(utils, state.valueParsed, valueParsed)) {
      var sections = fieldValueManager.getSectionsFromValue(utils, state.sections, valueParsed, format);
      setState(function (prevState) {
        return _extends({}, prevState, {
          valueParsed: valueParsed,
          valueStr: fieldValueManager.getValueStrFromSections(sections),
          sections: sections
        });
      });
    }
  }, [valueParsed]); // eslint-disable-line react-hooks/exhaustive-deps
  // TODO: Make validation work with TDate instead of TInputDate

  var validationError = useValidation(_extends({}, params.internalProps, {
    value: state.valueParsed
  }), validator, fieldValueManager.isSameError);
  var inputError = React.useMemo(function () {
    return fieldValueManager.hasError(validationError);
  }, [fieldValueManager, validationError]);
  React.useEffect(function () {
    return function () {
      return window.clearTimeout(focusTimeoutRef.current);
    };
  }, []);
  return {
    inputProps: _extends({}, otherForwardedProps, {
      value: state.valueStr,
      onClick: handleInputClick,
      onFocus: handleInputFocus,
      onBlur: handleInputBlur,
      onKeyDown: handleInputKeyDown,
      error: inputError
    }),
    inputRef: inputRef
  };
};