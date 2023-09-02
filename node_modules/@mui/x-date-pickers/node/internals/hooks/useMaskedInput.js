"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useMaskedInput = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var React = _interopRequireWildcard(require("react"));

var _rifm = require("rifm");

var _useUtils = require("./useUtils");

var _textFieldHelper = require("../utils/text-field-helper");

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

const useMaskedInput = ({
  acceptRegex = /[\d]/gi,
  disabled,
  disableMaskedInput,
  ignoreInvalidInputs,
  inputFormat,
  inputProps,
  label,
  mask,
  onChange,
  rawValue,
  readOnly,
  rifmFormatter,
  TextFieldProps,
  validationError
}) => {
  const utils = (0, _useUtils.useUtils)();
  const formatHelperText = utils.getFormatHelperText(inputFormat);
  const {
    shouldUseMaskedInput,
    maskToUse
  } = React.useMemo(() => {
    // formatting of dates is a quite slow thing, so do not make useless .format calls
    if (disableMaskedInput) {
      return {
        shouldUseMaskedInput: false,
        maskToUse: ''
      };
    }

    const computedMaskToUse = (0, _textFieldHelper.getMaskFromCurrentFormat)(mask, inputFormat, acceptRegex, utils);
    return {
      shouldUseMaskedInput: (0, _textFieldHelper.checkMaskIsValidForCurrentFormat)(computedMaskToUse, inputFormat, acceptRegex, utils),
      maskToUse: computedMaskToUse
    };
  }, [acceptRegex, disableMaskedInput, inputFormat, mask, utils]);
  const formatter = React.useMemo(() => shouldUseMaskedInput && maskToUse ? (0, _textFieldHelper.maskedDateFormatter)(maskToUse, acceptRegex) : st => st, [acceptRegex, maskToUse, shouldUseMaskedInput]); // TODO: Implement with controlled vs uncontrolled `rawValue`

  const parsedValue = rawValue === null ? null : utils.date(rawValue); // Track the value of the input

  const [innerInputValue, setInnerInputValue] = React.useState(parsedValue); // control the input text

  const [innerDisplayedInputValue, setInnerDisplayedInputValue] = React.useState((0, _textFieldHelper.getDisplayDate)(utils, rawValue, inputFormat)); // Inspired from autocomplete: https://github.com/mui/material-ui/blob/2c89d036dc2e16f100528f161600dffc83241768/packages/mui-base/src/AutocompleteUnstyled/useAutocomplete.js#L185:L201

  const prevRawValue = React.useRef();
  const prevLocale = React.useRef(utils.locale);
  const prevInputFormat = React.useRef(inputFormat);
  React.useEffect(() => {
    const rawValueHasChanged = rawValue !== prevRawValue.current;
    const localeHasChanged = utils.locale !== prevLocale.current;
    const inputFormatHasChanged = inputFormat !== prevInputFormat.current;
    prevRawValue.current = rawValue;
    prevLocale.current = utils.locale;
    prevInputFormat.current = inputFormat;

    if (!rawValueHasChanged && !localeHasChanged && !inputFormatHasChanged) {
      return;
    }

    const newParsedValue = rawValue === null ? null : utils.date(rawValue);
    const isAcceptedValue = rawValue === null || utils.isValid(newParsedValue);
    let innerEqualsParsed = innerInputValue === null && newParsedValue === null; // equal by being both null

    if (innerInputValue !== null && newParsedValue !== null) {
      const areEqual = utils.isEqual(innerInputValue, newParsedValue);

      if (areEqual) {
        innerEqualsParsed = true;
      } else {
        const diff = Math.abs(utils.getDiff(innerInputValue, newParsedValue)); // diff in ms

        innerEqualsParsed = diff === 0 ? areEqual // if no diff, use equal to test the time-zone
        : diff < 1000; // accept a difference bellow 1s
      }
    }

    if (!localeHasChanged && !inputFormatHasChanged && (!isAcceptedValue || innerEqualsParsed)) {
      return;
    } // When dev set a new valid value, we trust them


    const newDisplayDate = (0, _textFieldHelper.getDisplayDate)(utils, rawValue, inputFormat);
    setInnerInputValue(newParsedValue);
    setInnerDisplayedInputValue(newDisplayDate);
  }, [utils, rawValue, inputFormat, innerInputValue]);

  const handleChange = text => {
    const finalString = text === '' || text === mask ? '' : text;
    setInnerDisplayedInputValue(finalString);
    const date = finalString === null ? null : utils.parse(finalString, inputFormat);

    if (ignoreInvalidInputs && !utils.isValid(date)) {
      return;
    }

    setInnerInputValue(date);
    onChange(date, finalString || undefined);
  };

  const rifmProps = (0, _rifm.useRifm)({
    value: innerDisplayedInputValue,
    onChange: handleChange,
    format: rifmFormatter || formatter
  });
  const inputStateArgs = shouldUseMaskedInput ? rifmProps : {
    value: innerDisplayedInputValue,
    onChange: event => {
      handleChange(event.currentTarget.value);
    }
  };
  return (0, _extends2.default)({
    label,
    disabled,
    error: validationError,
    inputProps: (0, _extends2.default)({}, inputStateArgs, {
      disabled,
      placeholder: formatHelperText,
      readOnly,
      type: shouldUseMaskedInput ? 'tel' : 'text'
    }, inputProps)
  }, TextFieldProps);
};

exports.useMaskedInput = useMaskedInput;