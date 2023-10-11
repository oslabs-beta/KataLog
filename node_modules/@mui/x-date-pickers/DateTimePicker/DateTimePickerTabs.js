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

const viewToTab = openView => {
  if (['day', 'month', 'year'].includes(openView)) {
    return 'date';
  }

  return 'time';
};

const tabToView = tab => {
  if (tab === 'date') {
    return 'day';
  }

  return 'hours';
};

const useUtilityClasses = ownerState => {
  const {
    classes
  } = ownerState;
  const slots = {
    root: ['root']
  };
  return composeClasses(slots, getDateTimePickerTabsUtilityClass, classes);
};

const DateTimePickerTabsRoot = styled(Tabs, {
  name: 'MuiDateTimePickerTabs',
  slot: 'Root',
  overridesResolver: (_, styles) => styles.root
})(({
  ownerState,
  theme
}) => _extends({
  boxShadow: `0 -1px 0 0 inset ${theme.palette.divider}`
}, ownerState.wrapperVariant === 'desktop' && {
  order: 1,
  boxShadow: `0 1px 0 0 inset ${theme.palette.divider}`,
  [`& .${tabsClasses.indicator}`]: {
    bottom: 'auto',
    top: 0
  }
}));

const DateTimePickerTabs = function DateTimePickerTabs(inProps) {
  const props = useThemeProps({
    props: inProps,
    name: 'MuiDateTimePickerTabs'
  });
  const {
    dateRangeIcon = /*#__PURE__*/_jsx(DateRange, {}),
    onChange,
    timeIcon = /*#__PURE__*/_jsx(Time, {}),
    view
  } = props;
  const localeText = useLocaleText();
  const wrapperVariant = React.useContext(WrapperVariantContext);

  const ownerState = _extends({}, props, {
    wrapperVariant
  });

  const classes = useUtilityClasses(ownerState);

  const handleChange = (event, value) => {
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