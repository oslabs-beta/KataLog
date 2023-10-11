"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PickersActionBar = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _objectWithoutPropertiesLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutPropertiesLoose"));

var React = _interopRequireWildcard(require("react"));

var _Button = _interopRequireDefault(require("@mui/material/Button"));

var _DialogActions = _interopRequireDefault(require("@mui/material/DialogActions"));

var _useUtils = require("../internals/hooks/useUtils");

var _WrapperVariantContext = require("../internals/components/wrappers/WrapperVariantContext");

var _jsxRuntime = require("react/jsx-runtime");

const _excluded = ["onAccept", "onClear", "onCancel", "onSetToday", "actions"];

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

const PickersActionBar = props => {
  const {
    onAccept,
    onClear,
    onCancel,
    onSetToday,
    actions
  } = props,
        other = (0, _objectWithoutPropertiesLoose2.default)(props, _excluded);
  const wrapperVariant = React.useContext(_WrapperVariantContext.WrapperVariantContext);
  const localeText = (0, _useUtils.useLocaleText)();
  const actionsArray = typeof actions === 'function' ? actions(wrapperVariant) : actions;

  if (actionsArray == null || actionsArray.length === 0) {
    return null;
  }

  const buttons = actionsArray == null ? void 0 : actionsArray.map(actionType => {
    switch (actionType) {
      case 'clear':
        return /*#__PURE__*/(0, _jsxRuntime.jsx)(_Button.default, {
          onClick: onClear,
          children: localeText.clearButtonLabel
        }, actionType);

      case 'cancel':
        return /*#__PURE__*/(0, _jsxRuntime.jsx)(_Button.default, {
          onClick: onCancel,
          children: localeText.cancelButtonLabel
        }, actionType);

      case 'accept':
        return /*#__PURE__*/(0, _jsxRuntime.jsx)(_Button.default, {
          onClick: onAccept,
          children: localeText.okButtonLabel
        }, actionType);

      case 'today':
        return /*#__PURE__*/(0, _jsxRuntime.jsx)(_Button.default, {
          onClick: onSetToday,
          children: localeText.todayButtonLabel
        }, actionType);

      default:
        return null;
    }
  });
  return /*#__PURE__*/(0, _jsxRuntime.jsx)(_DialogActions.default, (0, _extends2.default)({}, other, {
    children: buttons
  }));
};

exports.PickersActionBar = PickersActionBar;