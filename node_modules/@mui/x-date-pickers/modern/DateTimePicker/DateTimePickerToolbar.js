import _objectWithoutPropertiesLoose from "@babel/runtime/helpers/esm/objectWithoutPropertiesLoose";
import _extends from "@babel/runtime/helpers/esm/extends";
const _excluded = ["ampm", "parsedValue", "isMobileKeyboardViewOpen", "onChange", "openView", "setOpenView", "toggleMobileKeyboardView", "toolbarFormat", "toolbarPlaceholder", "toolbarTitle", "views"];
import * as React from 'react';
import { styled, useThemeProps } from '@mui/material/styles';
import { unstable_composeClasses as composeClasses } from '@mui/material';
import { PickersToolbarText } from '../internals/components/PickersToolbarText';
import { PickersToolbar } from '../internals/components/PickersToolbar';
import { pickersToolbarClasses } from '../internals/components/pickersToolbarClasses';
import { PickersToolbarButton } from '../internals/components/PickersToolbarButton';
import { useLocaleText, useUtils } from '../internals/hooks/useUtils';
import { getDateTimePickerToolbarUtilityClass } from './dateTimePickerToolbarClasses';
import { jsx as _jsx } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";

const useUtilityClasses = ownerState => {
  const {
    classes
  } = ownerState;
  const slots = {
    root: ['root'],
    dateContainer: ['dateContainer'],
    timeContainer: ['timeContainer'],
    separator: ['separator']
  };
  return composeClasses(slots, getDateTimePickerToolbarUtilityClass, classes);
};

const DateTimePickerToolbarRoot = styled(PickersToolbar, {
  name: 'MuiDateTimePickerToolbar',
  slot: 'Root',
  overridesResolver: (props, styles) => styles.root
})(({
  theme
}) => ({
  paddingLeft: 16,
  paddingRight: 16,
  justifyContent: 'space-around',
  position: 'relative',
  [`& .${pickersToolbarClasses.penIconButton}`]: _extends({
    position: 'absolute',
    top: 8
  }, theme.direction === 'rtl' ? {
    left: 8
  } : {
    right: 8
  })
}));
const DateTimePickerToolbarDateContainer = styled('div', {
  name: 'MuiDateTimePickerToolbar',
  slot: 'DateContainer',
  overridesResolver: (props, styles) => styles.dateContainer
})({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'flex-start'
});
const DateTimePickerToolbarTimeContainer = styled('div', {
  name: 'MuiDateTimePickerToolbar',
  slot: 'TimeContainer',
  overridesResolver: (props, styles) => styles.timeContainer
})({
  display: 'flex'
});
const DateTimePickerToolbarSeparator = styled(PickersToolbarText, {
  name: 'MuiDateTimePickerToolbar',
  slot: 'Separator',
  overridesResolver: (props, styles) => styles.separator
})({
  margin: '0 4px 0 2px',
  cursor: 'default'
});
/**
 * @ignore - internal component.
 */

export function DateTimePickerToolbar(inProps) {
  const props = useThemeProps({
    props: inProps,
    name: 'MuiDateTimePickerToolbar'
  });

  const {
    ampm,
    parsedValue,
    isMobileKeyboardViewOpen,
    openView,
    setOpenView,
    toggleMobileKeyboardView,
    toolbarFormat,
    toolbarPlaceholder = '––',
    toolbarTitle: toolbarTitleProp,
    views
  } = props,
        other = _objectWithoutPropertiesLoose(props, _excluded);

  const ownerState = props;
  const utils = useUtils();
  const localeText = useLocaleText();
  const classes = useUtilityClasses(ownerState);
  const toolbarTitle = toolbarTitleProp ?? localeText.dateTimePickerDefaultToolbarTitle;

  const formatHours = time => ampm ? utils.format(time, 'hours12h') : utils.format(time, 'hours24h');

  const dateText = React.useMemo(() => {
    if (!parsedValue) {
      return toolbarPlaceholder;
    }

    if (toolbarFormat) {
      return utils.formatByString(parsedValue, toolbarFormat);
    }

    return utils.format(parsedValue, 'shortDate');
  }, [parsedValue, toolbarFormat, toolbarPlaceholder, utils]);
  return /*#__PURE__*/_jsxs(DateTimePickerToolbarRoot, _extends({
    toolbarTitle: toolbarTitle,
    isMobileKeyboardViewOpen: isMobileKeyboardViewOpen,
    toggleMobileKeyboardView: toggleMobileKeyboardView,
    className: classes.root
  }, other, {
    isLandscape: false,
    ownerState: ownerState,
    children: [/*#__PURE__*/_jsxs(DateTimePickerToolbarDateContainer, {
      className: classes.dateContainer,
      ownerState: ownerState,
      children: [views.includes('year') && /*#__PURE__*/_jsx(PickersToolbarButton, {
        tabIndex: -1,
        variant: "subtitle1",
        onClick: () => setOpenView('year'),
        selected: openView === 'year',
        value: parsedValue ? utils.format(parsedValue, 'year') : '–'
      }), views.includes('day') && /*#__PURE__*/_jsx(PickersToolbarButton, {
        tabIndex: -1,
        variant: "h4",
        onClick: () => setOpenView('day'),
        selected: openView === 'day',
        value: dateText
      })]
    }), /*#__PURE__*/_jsxs(DateTimePickerToolbarTimeContainer, {
      className: classes.timeContainer,
      ownerState: ownerState,
      children: [views.includes('hours') && /*#__PURE__*/_jsx(PickersToolbarButton, {
        variant: "h3",
        onClick: () => setOpenView('hours'),
        selected: openView === 'hours',
        value: parsedValue ? formatHours(parsedValue) : '--'
      }), views.includes('minutes') && /*#__PURE__*/_jsxs(React.Fragment, {
        children: [/*#__PURE__*/_jsx(DateTimePickerToolbarSeparator, {
          variant: "h3",
          value: ":",
          className: classes.separator,
          ownerState: ownerState
        }), /*#__PURE__*/_jsx(PickersToolbarButton, {
          variant: "h3",
          onClick: () => setOpenView('minutes'),
          selected: openView === 'minutes',
          value: parsedValue ? utils.format(parsedValue, 'minutes') : '--'
        })]
      }), views.includes('seconds') && /*#__PURE__*/_jsxs(React.Fragment, {
        children: [/*#__PURE__*/_jsx(DateTimePickerToolbarSeparator, {
          variant: "h3",
          value: ":",
          className: classes.separator,
          ownerState: ownerState
        }), /*#__PURE__*/_jsx(PickersToolbarButton, {
          variant: "h3",
          onClick: () => setOpenView('seconds'),
          selected: openView === 'seconds',
          value: parsedValue ? utils.format(parsedValue, 'seconds') : '--'
        })]
      })]
    })]
  }));
}