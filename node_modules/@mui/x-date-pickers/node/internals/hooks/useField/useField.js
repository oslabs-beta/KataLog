"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useField = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _objectWithoutPropertiesLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutPropertiesLoose"));

var React = _interopRequireWildcard(require("react"));

var _useEnhancedEffect = _interopRequireDefault(require("@mui/utils/useEnhancedEffect"));

var _useEventCallback = _interopRequireDefault(require("@mui/utils/useEventCallback"));

var _useValidation = require("../validation/useValidation");

var _useUtils = require("../useUtils");

var _useField = require("./useField.utils");

const _excluded = ["onClick", "onKeyDown", "onFocus", "onBlur"];

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

const useField = params => {
  const utils = (0, _useUtils.useUtils)();

  if (!utils.formatTokenMap) {
    throw new Error('This adapter is not compatible with the field components');
  }

  const inputRef = React.useRef(null);
  const {
    internalProps: {
      value: valueProp,
      defaultValue,
      onChange,
      format = utils.formats.keyboardDate,
      readOnly = false
    },
    forwardedProps: {
      onClick,
      onKeyDown,
      onFocus,
      onBlur
    },
    valueManager,
    fieldValueManager,
    validator
  } = params,
        otherForwardedProps = (0, _objectWithoutPropertiesLoose2.default)(params.forwardedProps, _excluded);
  const firstDefaultValue = React.useRef(defaultValue);
  const focusTimeoutRef = React.useRef(undefined);
  const valueParsed = React.useMemo(() => {
    var _ref, _firstDefaultValue$cu;

    // TODO: Avoid this type casting, the emptyValues are both valid TDate and TInputDate
    const value = (_ref = (_firstDefaultValue$cu = firstDefaultValue.current) != null ? _firstDefaultValue$cu : valueProp) != null ? _ref : valueManager.emptyValue;
    return valueManager.parseInput(utils, value);
  }, [valueProp, valueManager, utils]);
  const [state, setState] = React.useState(() => {
    const sections = fieldValueManager.getSectionsFromValue(utils, null, valueParsed, format);
    return {
      sections,
      valueParsed,
      valueStr: fieldValueManager.getValueStrFromSections(sections),
      selectedSectionIndexes: null
    };
  });

  const updateSections = sections => {
    const {
      value: newValueParsed,
      shouldPublish
    } = fieldValueManager.getValueFromSections(utils, state.sections, sections, format);
    setState(prevState => (0, _extends2.default)({}, prevState, {
      sections,
      valueStr: fieldValueManager.getValueStrFromSections(sections),
      valueParsed: newValueParsed
    }));

    if (onChange && shouldPublish) {
      onChange(newValueParsed);
    }
  };

  const updateSelectedSections = (start, end) => {
    setState(prevState => (0, _extends2.default)({}, prevState, {
      selectedSectionIndexes: start == null ? null : {
        start,
        end: end != null ? end : start
      },
      selectedSectionQuery: null
    }));
  };

  const handleInputClick = (0, _useEventCallback.default)((...args) => {
    onClick == null ? void 0 : onClick(...args);

    if (state.sections.length === 0) {
      return;
    }

    const nextSectionIndex = state.sections.findIndex(section => {
      var _inputRef$current$sel, _inputRef$current;

      return section.start > ((_inputRef$current$sel = (_inputRef$current = inputRef.current) == null ? void 0 : _inputRef$current.selectionStart) != null ? _inputRef$current$sel : 0);
    });
    const sectionIndex = nextSectionIndex === -1 ? state.sections.length - 1 : nextSectionIndex - 1;
    updateSelectedSections(sectionIndex);
  });
  const handleInputFocus = (0, _useEventCallback.default)((...args) => {
    onFocus == null ? void 0 : onFocus(...args);
    focusTimeoutRef.current = setTimeout(() => {
      var _inputRef$current$sel2, _inputRef$current2, _inputRef$current$sel3, _inputRef$current3;

      if (((_inputRef$current$sel2 = (_inputRef$current2 = inputRef.current) == null ? void 0 : _inputRef$current2.selectionEnd) != null ? _inputRef$current$sel2 : 0) - ((_inputRef$current$sel3 = (_inputRef$current3 = inputRef.current) == null ? void 0 : _inputRef$current3.selectionStart) != null ? _inputRef$current$sel3 : 0) === 0) {
        handleInputClick();
      } else {
        updateSelectedSections(0, state.sections.length - 1);
      }
    });
  });
  const handleInputBlur = (0, _useEventCallback.default)((...args) => {
    onBlur == null ? void 0 : onBlur(...args);
    updateSelectedSections();
  });
  const handleInputKeyDown = (0, _useEventCallback.default)(event => {
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

          const resetSections = (startIndex, endIndex) => {
            let sections = state.sections;

            for (let i = startIndex; i <= endIndex; i += 1) {
              sections = (0, _useField.setSectionValue)(sections, i, '');
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

          const activeSection = state.sections[state.selectedSectionIndexes.start];
          const activeDate = fieldValueManager.getActiveDateFromActiveSection(state.valueParsed, activeSection); // The date is not valid, we have to increment the section value rather than the date

          if (!utils.isValid(activeDate.value)) {
            const newSectionValue = (0, _useField.adjustInvalidDateSectionValue)(utils, activeSection, event.key);
            updateSections((0, _useField.setSectionValue)(state.sections, state.selectedSectionIndexes.start, newSectionValue));
          } else {
            const newDate = (0, _useField.adjustDateSectionValue)(utils, activeDate.value, activeSection.dateSectionName, event.key);
            const newValue = activeDate.update(newDate);
            const sections = fieldValueManager.getSectionsFromValue(utils, state.sections, newValue, format);
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

          const activeSection = state.sections[state.selectedSectionIndexes.start];
          const activeDate = fieldValueManager.getActiveDateFromActiveSection(state.valueParsed, activeSection);
          const boundaries = (0, _useField.getSectionValueNumericBoundaries)(utils, (_activeDate$value = activeDate.value) != null ? _activeDate$value : utils.date(), activeSection.dateSectionName);
          const concatenatedSectionValue = `${activeSection.value}${event.key}`;
          const newSectionValue = Number(concatenatedSectionValue) > boundaries.maximum ? event.key : concatenatedSectionValue;
          updateSections((0, _useField.setSectionValue)(state.sections, state.selectedSectionIndexes.start, (0, _useField.cleanTrailingZeroInNumericSectionValue)(newSectionValue, boundaries.maximum)));
          return;
        }
      // Apply full letter editing on the selected section value

      case event.key.length === 1:
        {
          var _activeSection$query;

          event.preventDefault();

          if (readOnly || state.selectedSectionIndexes == null) {
            return;
          }

          const activeSection = state.sections[state.selectedSectionIndexes.start]; // TODO: Do not hardcode the compatible formatValue

          if (activeSection.formatValue !== 'MMMM') {
            return;
          }

          const newQuery = event.key.toLowerCase();
          const concatenatedQuery = `${(_activeSection$query = activeSection.query) != null ? _activeSection$query : ''}${newQuery}`;
          const matchingMonthsWithConcatenatedQuery = (0, _useField.getMonthsMatchingQuery)(utils, activeSection.formatValue, concatenatedQuery);

          if (matchingMonthsWithConcatenatedQuery.length > 0) {
            updateSections((0, _useField.setSectionValue)(state.sections, state.selectedSectionIndexes.start, matchingMonthsWithConcatenatedQuery[0], concatenatedQuery));
          } else {
            const matchingMonthsWithNewQuery = (0, _useField.getMonthsMatchingQuery)(utils, activeSection.formatValue, newQuery);

            if (matchingMonthsWithNewQuery.length > 0) {
              updateSections((0, _useField.setSectionValue)(state.sections, state.selectedSectionIndexes.start, matchingMonthsWithNewQuery[0], newQuery));
            }
          }
        }
    }
  });
  (0, _useEnhancedEffect.default)(() => {
    if (!inputRef.current || state.selectedSectionIndexes == null) {
      return;
    }

    const updateSelectionRangeIfChanged = (selectionStart, selectionEnd) => {
      if (selectionStart !== inputRef.current.selectionStart || selectionEnd !== inputRef.current.selectionEnd) {
        inputRef.current.setSelectionRange(selectionStart, selectionEnd);
      }
    };

    const firstSelectedSection = state.sections[state.selectedSectionIndexes.start];
    const lastSelectedSection = state.sections[state.selectedSectionIndexes.end];
    updateSelectionRangeIfChanged(firstSelectedSection.start, lastSelectedSection.start + (0, _useField.getSectionVisibleValue)(lastSelectedSection).length);
  });
  React.useEffect(() => {
    if (!valueManager.areValuesEqual(utils, state.valueParsed, valueParsed)) {
      const sections = fieldValueManager.getSectionsFromValue(utils, state.sections, valueParsed, format);
      setState(prevState => (0, _extends2.default)({}, prevState, {
        valueParsed,
        valueStr: fieldValueManager.getValueStrFromSections(sections),
        sections
      }));
    }
  }, [valueParsed]); // eslint-disable-line react-hooks/exhaustive-deps
  // TODO: Make validation work with TDate instead of TInputDate

  const validationError = (0, _useValidation.useValidation)((0, _extends2.default)({}, params.internalProps, {
    value: state.valueParsed
  }), validator, fieldValueManager.isSameError);
  const inputError = React.useMemo(() => fieldValueManager.hasError(validationError), [fieldValueManager, validationError]);
  React.useEffect(() => {
    return () => window.clearTimeout(focusTimeoutRef.current);
  }, []);
  return {
    inputProps: (0, _extends2.default)({}, otherForwardedProps, {
      value: state.valueStr,
      onClick: handleInputClick,
      onFocus: handleInputFocus,
      onBlur: handleInputBlur,
      onKeyDown: handleInputKeyDown,
      error: inputError
    }),
    inputRef
  };
};

exports.useField = useField;