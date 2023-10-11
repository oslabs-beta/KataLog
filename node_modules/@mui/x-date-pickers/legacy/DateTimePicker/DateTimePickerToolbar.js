import _objectWithoutProperties from "@babel/runtime/helpers/esm/objectWithoutProperties";
import _defineProperty from "@babel/runtime/helpers/esm/defineProperty";
import _extends from "@babel/runtime/helpers/esm/extends";
var _excluded = ["ampm", "parsedValue", "isMobileKeyboardViewOpen", "onChange", "openView", "setOpenView", "toggleMobileKeyboardView", "toolbarFormat", "toolbarPlaceholder", "toolbarTitle", "views"];
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

var useUtilityClasses = function useUtilityClasses(ownerState) {
  var classes = ownerState.classes;
  var slots = {
    root: ['root'],
    dateContainer: ['dateContainer'],
    timeContainer: ['timeContainer'],
    separator: ['separator']
  };
  return composeClasses(slots, getDateTimePickerToolbarUtilityClass, classes);
};

var DateTimePickerToolbarRoot = styled(PickersToolbar, {
  name: 'MuiDateTimePickerToolbar',
  slot: 'Root',
  overridesResolver: function overridesResolver(props, styles) {
    return styles.root;
  }
})(function (_ref) {
  var theme = _ref.theme;
  return _defineProperty({
    paddingLeft: 16,
    paddingRight: 16,
    justifyContent: 'space-around',
    position: 'relative'
  }, "& .".concat(pickersToolbarClasses.penIconButton), _extends({
    position: 'absolute',
    top: 8
  }, theme.direction === 'rtl' ? {
    left: 8
  } : {
    right: 8
  }));
});
var DateTimePickerToolbarDateContainer = styled('div', {
  name: 'MuiDateTimePickerToolbar',
  slot: 'DateContainer',
  overridesResolver: function overridesResolver(props, styles) {
    return styles.dateContainer;
  }
})({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'flex-start'
});
var DateTimePickerToolbarTimeContainer = styled('div', {
  name: 'MuiDateTimePickerToolbar',
  slot: 'TimeContainer',
  overridesResolver: function overridesResolver(props, styles) {
    return styles.timeContainer;
  }
})({
  display: 'flex'
});
var DateTimePickerToolbarSeparator = styled(PickersToolbarText, {
  name: 'MuiDateTimePickerToolbar',
  slot: 'Separator',
  overridesResolver: function overridesResolver(props, styles) {
    return styles.separator;
  }
})({
  margin: '0 4px 0 2px',
  cursor: 'default'
});
/**
 * @ignore - internal component.
 */

export function DateTimePickerToolbar(inProps) {
  var props = useThemeProps({
    props: inProps,
    name: 'MuiDateTimePickerToolbar'
  });

  var ampm = props.ampm,
      parsedValue = props.parsedValue,
      isMobileKeyboardViewOpen = props.isMobileKeyboardViewOpen,
      onChange = props.onChange,
      openView = props.openView,
      setOpenView = props.setOpenView,
      toggleMobileKeyboardView = props.toggleMobileKeyboardView,
      toolbarFormat = props.toolbarFormat,
      _props$toolbarPlaceho = props.toolbarPlaceholder,
      toolbarPlaceholder = _props$toolbarPlaceho === void 0 ? '––' : _props$toolbarPlaceho,
      toolbarTitleProp = props.toolbarTitle,
      views = props.views,
      other = _objectWithoutProperties(props, _excluded);

  var ownerState = props;
  var utils = useUtils();
  var localeText = useLocaleText();
  var classes = useUtilityClasses(ownerState);
  var toolbarTitle = toolbarTitleProp != null ? toolbarTitleProp : localeText.dateTimePickerDefaultToolbarTitle;

  var formatHours = function formatHours(time) {
    return ampm ? utils.format(time, 'hours12h') : utils.format(time, 'hours24h');
  };

  var dateText = React.useMemo(function () {
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
        onClick: function onClick() {
          return setOpenView('year');
        },
        selected: openView === 'year',
        value: parsedValue ? utils.format(parsedValue, 'year') : '–'
      }), views.includes('day') && /*#__PURE__*/_jsx(PickersToolbarButton, {
        tabIndex: -1,
        variant: "h4",
        onClick: function onClick() {
          return setOpenView('day');
        },
        selected: openView === 'day',
        value: dateText
      })]
    }), /*#__PURE__*/_jsxs(DateTimePickerToolbarTimeContainer, {
      className: classes.timeContainer,
      ownerState: ownerState,
      children: [views.includes('hours') && /*#__PURE__*/_jsx(PickersToolbarButton, {
        variant: "h3",
        onClick: function onClick() {
          return setOpenView('hours');
        },
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
          onClick: function onClick() {
            return setOpenView('minutes');
          },
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
          onClick: function onClick() {
            return setOpenView('seconds');
          },
          selected: openView === 'seconds',
          value: parsedValue ? utils.format(parsedValue, 'seconds') : '--'
        })]
      })]
    })]
  }));
}