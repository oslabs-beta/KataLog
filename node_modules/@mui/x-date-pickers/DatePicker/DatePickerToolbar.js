import _objectWithoutPropertiesLoose from "@babel/runtime/helpers/esm/objectWithoutPropertiesLoose";
import _extends from "@babel/runtime/helpers/esm/extends";
const _excluded = ["parsedValue", "isLandscape", "isMobileKeyboardViewOpen", "onChange", "toggleMobileKeyboardView", "toolbarFormat", "toolbarPlaceholder", "toolbarTitle", "views"];
import * as React from 'react';
import Typography from '@mui/material/Typography';
import { styled, useThemeProps } from '@mui/material/styles';
import { unstable_composeClasses as composeClasses } from '@mui/material';
import { PickersToolbar } from '../internals/components/PickersToolbar';
import { useLocaleText, useUtils } from '../internals/hooks/useUtils';
import { isYearAndMonthViews, isYearOnlyView } from './shared';
import { getDatePickerToolbarUtilityClass } from './datePickerToolbarClasses';
import { jsx as _jsx } from "react/jsx-runtime";

const useUtilityClasses = ownerState => {
  const {
    classes
  } = ownerState;
  const slots = {
    root: ['root'],
    title: ['title']
  };
  return composeClasses(slots, getDatePickerToolbarUtilityClass, classes);
};

const DatePickerToolbarRoot = styled(PickersToolbar, {
  name: 'MuiDatePickerToolbar',
  slot: 'Root',
  overridesResolver: (_, styles) => styles.root
})({});
const DatePickerToolbarTitle = styled(Typography, {
  name: 'MuiDatePickerToolbar',
  slot: 'Title',
  overridesResolver: (_, styles) => styles.title
})(({
  ownerState
}) => _extends({}, ownerState.isLandscape && {
  margin: 'auto 16px auto auto'
}));

/**
 * @ignore - internal component.
 */
export const DatePickerToolbar = /*#__PURE__*/React.forwardRef(function DatePickerToolbar(inProps, ref) {
  const props = useThemeProps({
    props: inProps,
    name: 'MuiDatePickerToolbar'
  });

  const {
    parsedValue,
    isLandscape,
    isMobileKeyboardViewOpen,
    toggleMobileKeyboardView,
    toolbarFormat,
    toolbarPlaceholder = '––',
    toolbarTitle: toolbarTitleProp,
    views
  } = props,
        other = _objectWithoutPropertiesLoose(props, _excluded);

  const utils = useUtils();
  const localeText = useLocaleText();
  const classes = useUtilityClasses(props);
  const toolbarTitle = toolbarTitleProp != null ? toolbarTitleProp : localeText.datePickerDefaultToolbarTitle;
  const dateText = React.useMemo(() => {
    if (!parsedValue) {
      return toolbarPlaceholder;
    }

    if (toolbarFormat) {
      return utils.formatByString(parsedValue, toolbarFormat);
    }

    if (isYearOnlyView(views)) {
      return utils.format(parsedValue, 'year');
    }

    if (isYearAndMonthViews(views)) {
      return utils.format(parsedValue, 'month');
    } // Little localization hack (Google is doing the same for android native pickers):
    // For english localization it is convenient to include weekday into the date "Mon, Jun 1".
    // For other locales using strings like "June 1", without weekday.


    return /en/.test(utils.getCurrentLocaleCode()) ? utils.format(parsedValue, 'normalDateWithWeekday') : utils.format(parsedValue, 'normalDate');
  }, [parsedValue, toolbarFormat, toolbarPlaceholder, utils, views]);
  const ownerState = props;
  return /*#__PURE__*/_jsx(DatePickerToolbarRoot, _extends({
    ref: ref,
    toolbarTitle: toolbarTitle,
    isMobileKeyboardViewOpen: isMobileKeyboardViewOpen,
    toggleMobileKeyboardView: toggleMobileKeyboardView,
    isLandscape: isLandscape,
    className: classes.root
  }, other, {
    children: /*#__PURE__*/_jsx(DatePickerToolbarTitle, {
      variant: "h4",
      align: isLandscape ? 'left' : 'center',
      ownerState: ownerState,
      className: classes.title,
      children: dateText
    })
  }));
});