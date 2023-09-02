import _extends from "@babel/runtime/helpers/esm/extends";
import * as React from 'react';
import Fade from '@mui/material/Fade';
import { styled, useThemeProps } from '@mui/material/styles';
import { unstable_composeClasses as composeClasses } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import { useLocaleText, useUtils } from '../internals/hooks/useUtils';
import { PickersFadeTransitionGroup } from './PickersFadeTransitionGroup';
import { ArrowDropDown } from '../internals/components/icons';
import { PickersArrowSwitcher } from '../internals/components/PickersArrowSwitcher';
import { usePreviousMonthDisabled, useNextMonthDisabled } from '../internals/hooks/date-helpers-hooks';
import { buildDeprecatedPropsWarning } from '../internals/utils/warning';
import { getPickersCalendarHeaderUtilityClass } from './pickersCalendarHeaderClasses';
import { jsx as _jsx } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";

var useUtilityClasses = function useUtilityClasses(ownerState) {
  var classes = ownerState.classes;
  var slots = {
    root: ['root'],
    labelContainer: ['labelContainer'],
    label: ['label'],
    switchViewButton: ['switchViewButton'],
    switchViewIcon: ['switchViewIcon']
  };
  return composeClasses(slots, getPickersCalendarHeaderUtilityClass, classes);
};

var PickersCalendarHeaderRoot = styled('div', {
  name: 'MuiPickersCalendarHeader',
  slot: 'Root',
  overridesResolver: function overridesResolver(_, styles) {
    return styles.root;
  }
})({
  display: 'flex',
  alignItems: 'center',
  marginTop: 16,
  marginBottom: 8,
  paddingLeft: 24,
  paddingRight: 12,
  // prevent jumping in safari
  maxHeight: 30,
  minHeight: 30
});
var PickersCalendarHeaderLabelContainer = styled('div', {
  name: 'MuiPickersCalendarHeader',
  slot: 'LabelContainer',
  overridesResolver: function overridesResolver(_, styles) {
    return styles.labelContainer;
  }
})(function (_ref) {
  var theme = _ref.theme;
  return _extends({
    display: 'flex',
    maxHeight: 30,
    overflow: 'hidden',
    alignItems: 'center',
    cursor: 'pointer',
    marginRight: 'auto'
  }, theme.typography.body1, {
    fontWeight: theme.typography.fontWeightMedium
  });
});
var PickersCalendarHeaderLabel = styled('div', {
  name: 'MuiPickersCalendarHeader',
  slot: 'Label',
  overridesResolver: function overridesResolver(_, styles) {
    return styles.label;
  }
})({
  marginRight: 6
});
var PickersCalendarHeaderSwitchViewButton = styled(IconButton, {
  name: 'MuiPickersCalendarHeader',
  slot: 'SwitchViewButton',
  overridesResolver: function overridesResolver(_, styles) {
    return styles.switchViewButton;
  }
})({
  marginRight: 'auto'
});
var PickersCalendarHeaderSwitchViewIcon = styled(ArrowDropDown, {
  name: 'MuiPickersCalendarHeader',
  slot: 'SwitchViewIcon',
  overridesResolver: function overridesResolver(_, styles) {
    return styles.switchViewIcon;
  }
})(function (_ref2) {
  var theme = _ref2.theme,
      ownerState = _ref2.ownerState;
  return _extends({
    willChange: 'transform',
    transition: theme.transitions.create('transform'),
    transform: 'rotate(0deg)'
  }, ownerState.openView === 'year' && {
    transform: 'rotate(180deg)'
  });
});
var deprecatedPropsWarning = buildDeprecatedPropsWarning('Props for translation are deprecated. See https://mui.com/x/react-date-pickers/localization for more information.');
/**
 * @ignore - do not document.
 */

export function PickersCalendarHeader(inProps) {
  var props = useThemeProps({
    props: inProps,
    name: 'MuiPickersCalendarHeader'
  });
  var _props$components = props.components,
      components = _props$components === void 0 ? {} : _props$components,
      _props$componentsProp = props.componentsProps,
      componentsProps = _props$componentsProp === void 0 ? {} : _props$componentsProp,
      month = props.currentMonth,
      disabled = props.disabled,
      disableFuture = props.disableFuture,
      disablePast = props.disablePast,
      getViewSwitchingButtonTextProp = props.getViewSwitchingButtonText,
      leftArrowButtonTextProp = props.leftArrowButtonText,
      maxDate = props.maxDate,
      minDate = props.minDate,
      onMonthChange = props.onMonthChange,
      onViewChange = props.onViewChange,
      currentView = props.openView,
      reduceAnimations = props.reduceAnimations,
      rightArrowButtonTextProp = props.rightArrowButtonText,
      views = props.views,
      labelId = props.labelId;
  deprecatedPropsWarning({
    leftArrowButtonText: leftArrowButtonTextProp,
    rightArrowButtonText: rightArrowButtonTextProp,
    getViewSwitchingButtonText: getViewSwitchingButtonTextProp
  });
  var localeText = useLocaleText();
  var leftArrowButtonText = leftArrowButtonTextProp != null ? leftArrowButtonTextProp : localeText.previousMonth;
  var rightArrowButtonText = rightArrowButtonTextProp != null ? rightArrowButtonTextProp : localeText.nextMonth;
  var getViewSwitchingButtonText = getViewSwitchingButtonTextProp != null ? getViewSwitchingButtonTextProp : localeText.calendarViewSwitchingButtonAriaLabel;
  var utils = useUtils();
  var classes = useUtilityClasses(props);
  var switchViewButtonProps = componentsProps.switchViewButton || {};

  var selectNextMonth = function selectNextMonth() {
    return onMonthChange(utils.getNextMonth(month), 'left');
  };

  var selectPreviousMonth = function selectPreviousMonth() {
    return onMonthChange(utils.getPreviousMonth(month), 'right');
  };

  var isNextMonthDisabled = useNextMonthDisabled(month, {
    disableFuture: disableFuture,
    maxDate: maxDate
  });
  var isPreviousMonthDisabled = usePreviousMonthDisabled(month, {
    disablePast: disablePast,
    minDate: minDate
  });

  var handleToggleView = function handleToggleView() {
    if (views.length === 1 || !onViewChange || disabled) {
      return;
    }

    if (views.length === 2) {
      onViewChange(views.find(function (view) {
        return view !== currentView;
      }) || views[0]);
    } else {
      // switching only between first 2
      var nextIndexToOpen = views.indexOf(currentView) !== 0 ? 0 : 1;
      onViewChange(views[nextIndexToOpen]);
    }
  }; // No need to display more information


  if (views.length === 1 && views[0] === 'year') {
    return null;
  }

  var ownerState = props;
  return /*#__PURE__*/_jsxs(PickersCalendarHeaderRoot, {
    ownerState: ownerState,
    className: classes.root,
    children: [/*#__PURE__*/_jsxs(PickersCalendarHeaderLabelContainer, {
      role: "presentation",
      onClick: handleToggleView,
      ownerState: ownerState // putting this on the label item element below breaks when using transition
      ,
      "aria-live": "polite",
      className: classes.labelContainer,
      children: [/*#__PURE__*/_jsx(PickersFadeTransitionGroup, {
        reduceAnimations: reduceAnimations,
        transKey: utils.format(month, 'monthAndYear'),
        children: /*#__PURE__*/_jsx(PickersCalendarHeaderLabel, {
          id: labelId,
          ownerState: ownerState,
          className: classes.label,
          children: utils.format(month, 'monthAndYear')
        })
      }), views.length > 1 && !disabled && /*#__PURE__*/_jsx(PickersCalendarHeaderSwitchViewButton, _extends({
        size: "small",
        as: components.SwitchViewButton,
        "aria-label": getViewSwitchingButtonText(currentView),
        className: classes.switchViewButton
      }, switchViewButtonProps, {
        children: /*#__PURE__*/_jsx(PickersCalendarHeaderSwitchViewIcon, {
          as: components.SwitchViewIcon,
          ownerState: ownerState,
          className: classes.switchViewIcon
        })
      }))]
    }), /*#__PURE__*/_jsx(Fade, {
      in: currentView === 'day',
      children: /*#__PURE__*/_jsx(PickersArrowSwitcher, {
        leftArrowButtonText: leftArrowButtonText,
        rightArrowButtonText: rightArrowButtonText,
        components: components,
        componentsProps: componentsProps,
        onLeftClick: selectPreviousMonth,
        onRightClick: selectNextMonth,
        isLeftDisabled: isPreviousMonthDisabled,
        isRightDisabled: isNextMonthDisabled
      })
    })]
  });
}