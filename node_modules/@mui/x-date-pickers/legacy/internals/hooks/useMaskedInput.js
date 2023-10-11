import _extends from "@babel/runtime/helpers/esm/extends";
import _slicedToArray from "@babel/runtime/helpers/esm/slicedToArray";
import * as React from 'react';
import { useRifm } from 'rifm';
import { useUtils } from './useUtils';
import { maskedDateFormatter, getDisplayDate, checkMaskIsValidForCurrentFormat, getMaskFromCurrentFormat } from '../utils/text-field-helper';
export var useMaskedInput = function useMaskedInput(_ref) {
  var _ref$acceptRegex = _ref.acceptRegex,
      acceptRegex = _ref$acceptRegex === void 0 ? /[\d]/gi : _ref$acceptRegex,
      disabled = _ref.disabled,
      disableMaskedInput = _ref.disableMaskedInput,
      ignoreInvalidInputs = _ref.ignoreInvalidInputs,
      inputFormat = _ref.inputFormat,
      inputProps = _ref.inputProps,
      label = _ref.label,
      mask = _ref.mask,
      onChange = _ref.onChange,
      rawValue = _ref.rawValue,
      readOnly = _ref.readOnly,
      rifmFormatter = _ref.rifmFormatter,
      TextFieldProps = _ref.TextFieldProps,
      validationError = _ref.validationError;
  var utils = useUtils();
  var formatHelperText = utils.getFormatHelperText(inputFormat);

  var _React$useMemo = React.useMemo(function () {
    // formatting of dates is a quite slow thing, so do not make useless .format calls
    if (disableMaskedInput) {
      return {
        shouldUseMaskedInput: false,
        maskToUse: ''
      };
    }

    var computedMaskToUse = getMaskFromCurrentFormat(mask, inputFormat, acceptRegex, utils);
    return {
      shouldUseMaskedInput: checkMaskIsValidForCurrentFormat(computedMaskToUse, inputFormat, acceptRegex, utils),
      maskToUse: computedMaskToUse
    };
  }, [acceptRegex, disableMaskedInput, inputFormat, mask, utils]),
      shouldUseMaskedInput = _React$useMemo.shouldUseMaskedInput,
      maskToUse = _React$useMemo.maskToUse;

  var formatter = React.useMemo(function () {
    return shouldUseMaskedInput && maskToUse ? maskedDateFormatter(maskToUse, acceptRegex) : function (st) {
      return st;
    };
  }, [acceptRegex, maskToUse, shouldUseMaskedInput]); // TODO: Implement with controlled vs uncontrolled `rawValue`

  var parsedValue = rawValue === null ? null : utils.date(rawValue); // Track the value of the input

  var _React$useState = React.useState(parsedValue),
      _React$useState2 = _slicedToArray(_React$useState, 2),
      innerInputValue = _React$useState2[0],
      setInnerInputValue = _React$useState2[1]; // control the input text


  var _React$useState3 = React.useState(getDisplayDate(utils, rawValue, inputFormat)),
      _React$useState4 = _slicedToArray(_React$useState3, 2),
      innerDisplayedInputValue = _React$useState4[0],
      setInnerDisplayedInputValue = _React$useState4[1]; // Inspired from autocomplete: https://github.com/mui/material-ui/blob/2c89d036dc2e16f100528f161600dffc83241768/packages/mui-base/src/AutocompleteUnstyled/useAutocomplete.js#L185:L201


  var prevRawValue = React.useRef();
  var prevLocale = React.useRef(utils.locale);
  var prevInputFormat = React.useRef(inputFormat);
  React.useEffect(function () {
    var rawValueHasChanged = rawValue !== prevRawValue.current;
    var localeHasChanged = utils.locale !== prevLocale.current;
    var inputFormatHasChanged = inputFormat !== prevInputFormat.current;
    prevRawValue.current = rawValue;
    prevLocale.current = utils.locale;
    prevInputFormat.current = inputFormat;

    if (!rawValueHasChanged && !localeHasChanged && !inputFormatHasChanged) {
      return;
    }

    var newParsedValue = rawValue === null ? null : utils.date(rawValue);
    var isAcceptedValue = rawValue === null || utils.isValid(newParsedValue);
    var innerEqualsParsed = innerInputValue === null && newParsedValue === null; // equal by being both null

    if (innerInputValue !== null && newParsedValue !== null) {
      var areEqual = utils.isEqual(innerInputValue, newParsedValue);

      if (areEqual) {
        innerEqualsParsed = true;
      } else {
        var diff = Math.abs(utils.getDiff(innerInputValue, newParsedValue)); // diff in ms

        innerEqualsParsed = diff === 0 ? areEqual // if no diff, use equal to test the time-zone
        : diff < 1000; // accept a difference bellow 1s
      }
    }

    if (!localeHasChanged && !inputFormatHasChanged && (!isAcceptedValue || innerEqualsParsed)) {
      return;
    } // When dev set a new valid value, we trust them


    var newDisplayDate = getDisplayDate(utils, rawValue, inputFormat);
    setInnerInputValue(newParsedValue);
    setInnerDisplayedInputValue(newDisplayDate);
  }, [utils, rawValue, inputFormat, innerInputValue]);

  var handleChange = function handleChange(text) {
    var finalString = text === '' || text === mask ? '' : text;
    setInnerDisplayedInputValue(finalString);
    var date = finalString === null ? null : utils.parse(finalString, inputFormat);

    if (ignoreInvalidInputs && !utils.isValid(date)) {
      return;
    }

    setInnerInputValue(date);
    onChange(date, finalString || undefined);
  };

  var rifmProps = useRifm({
    value: innerDisplayedInputValue,
    onChange: handleChange,
    format: rifmFormatter || formatter
  });
  var inputStateArgs = shouldUseMaskedInput ? rifmProps : {
    value: innerDisplayedInputValue,
    onChange: function onChange(event) {
      handleChange(event.currentTarget.value);
    }
  };
  return _extends({
    label: label,
    disabled: disabled,
    error: validationError,
    inputProps: _extends({}, inputStateArgs, {
      disabled: disabled,
      placeholder: formatHelperText,
      readOnly: readOnly,
      type: shouldUseMaskedInput ? 'tel' : 'text'
    }, inputProps)
  }, TextFieldProps);
};