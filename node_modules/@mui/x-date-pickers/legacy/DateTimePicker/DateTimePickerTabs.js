import _defineProperty from "@babel/runtime/helpers/esm/defineProperty";
import _extends from "@babel/runtime/helpers/esm/extends";
import * as React from 'react';
import PropTypes from 'prop-types';
import Tab from '@mui/material/Tab';
import Tabs, { tabsClasses } from '@mui/material/Tabs';
import { styled, useThemeProps } from '@mui/material/styles';
import { unstable_composeClasses as composeClasses } from '@mui/material';
import { Time, DateRange } from '../internals/components/icons';
import { WrapperVariantContext } from '../internals/components/wrappers/WrapperVariantContext';
import { useLocaleText } from '../internals/hooks/useUtils';
import { getDateTimePickerTabsUtilityClass } from './dateTimePickerTabsClasses';
import { jsx as _jsx } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";

var viewToTab = function viewToTab(openView) {
  if (['day', 'month', 'year'].includes(openView)) {
    return 'date';
  }

  return 'time';
};

var tabToView = function tabToView(tab) {
  if (tab === 'date') {
    return 'day';
  }

  return 'hours';
};

var useUtilityClasses = function useUtilityClasses(ownerState) {
  var classes = ownerState.classes;
  var slots = {
    root: ['root']
  };
  return composeClasses(slots, getDateTimePickerTabsUtilityClass, classes);
};

var DateTimePickerTabsRoot = styled(Tabs, {
  name: 'MuiDateTimePickerTabs',
  slot: 'Root',
  overridesResolver: function overridesResolver(_, styles) {
    return styles.root;
  }
})(function (_ref) {
  var ownerState = _ref.ownerState,
      theme = _ref.theme;
  return _extends({
    boxShadow: "0 -1px 0 0 inset ".concat(theme.palette.divider)
  }, ownerState.wrapperVariant === 'desktop' && _defineProperty({
    order: 1,
    boxShadow: "0 1px 0 0 inset ".concat(theme.palette.divider)
  }, "& .".concat(tabsClasses.indicator), {
    bottom: 'auto',
    top: 0
  }));
});

var DateTimePickerTabs = function DateTimePickerTabs(inProps) {
  var props = useThemeProps({
    props: inProps,
    name: 'MuiDateTimePickerTabs'
  });
  var _props$dateRangeIcon = props.dateRangeIcon,
      dateRangeIcon = _props$dateRangeIcon === void 0 ? /*#__PURE__*/_jsx(DateRange, {}) : _props$dateRangeIcon,
      onChange = props.onChange,
      _props$timeIcon = props.timeIcon,
      timeIcon = _props$timeIcon === void 0 ? /*#__PURE__*/_jsx(Time, {}) : _props$timeIcon,
      view = props.view;
  var localeText = useLocaleText();
  var wrapperVariant = React.useContext(WrapperVariantContext);

  var ownerState = _extends({}, props, {
    wrapperVariant: wrapperVariant
  });

  var classes = useUtilityClasses(ownerState);

  var handleChange = function handleChange(event, value) {
    onChange(tabToView(value));
  };

  return /*#__PURE__*/_jsxs(DateTimePickerTabsRoot, {
    ownerState: ownerState,
    variant: "fullWidth",
    value: viewToTab(view),
    onChange: handleChange,
    className: classes.root,
    children: [/*#__PURE__*/_jsx(Tab, {
      value: "date",
      "aria-label": localeText.dateTableLabel,
      icon: /*#__PURE__*/_jsx(React.Fragment, {
        children: dateRangeIcon
      })
    }), /*#__PURE__*/_jsx(Tab, {
      value: "time",
      "aria-label": localeText.timeTableLabel,
      icon: /*#__PURE__*/_jsx(React.Fragment, {
        children: timeIcon
      })
    })]
  });
};

process.env.NODE_ENV !== "production" ? DateTimePickerTabs.propTypes = {
  // ----------------------------- Warning --------------------------------
  // | These PropTypes are generated from the TypeScript type definitions |
  // | To update them edit the TypeScript types and run "yarn proptypes"  |
  // ----------------------------------------------------------------------

  /**
   * Override or extend the styles applied to the component.
   */
  classes: PropTypes.object,

  /**
   * Date tab icon.
   * @default DateRange
   */
  dateRangeIcon: PropTypes.node,

  /**
   * Callback called when tab is clicked
   * @param {CalendarOrClockPickerView} view Picker view that was clicked
   */
  onChange: PropTypes.func.isRequired,

  /**
   * Time tab icon.
   * @default Time
   */
  timeIcon: PropTypes.node,

  /**
   * Open picker view
   */
  view: PropTypes.oneOf(['day', 'hours', 'minutes', 'month', 'seconds', 'year']).isRequired
} : void 0;
export { DateTimePickerTabs };