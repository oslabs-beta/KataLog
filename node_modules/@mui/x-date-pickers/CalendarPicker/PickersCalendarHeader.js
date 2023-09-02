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

const useUtilityClasses = ownerState => {
  const {
    classes
  } = ownerState;
  const slots = {
    root: ['root'],
    labelContainer: ['labelContainer'],
    label: ['label'],
    switchViewButton: ['switchViewButton'],
    switchViewIcon: ['switchViewIcon']
  };
  return composeClasses(slots, getPickersCalendarHeaderUtilityClass, classes);
};

const PickersCalendarHeaderRoot = styled('div', {
  name: 'MuiPickersCalendarHeader',
  slot: 'Root',
  overridesResolver: (_, styles) => styles.root
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
const PickersCalendarHeaderLabelContainer = styled('div', {
  name: 'MuiPickersCalendarHeader',
  slot: 'LabelContainer',
  overridesResolver: (_, styles) => styles.labelContainer
})(({
  theme
}) => _extends({
  display: 'flex',
  maxHeight: 30,
  overflow: 'hidden',
  alignItems: 'center',
  cursor: 'pointer',
  marginRight: 'auto'
}, theme.typography.body1, {
  fontWeight: theme.typography.fontWeightMedium
}));
const PickersCalendarHeaderLabel = styled('div', {
  name: 'MuiPickersCalendarHeader',
  slot: 'Label',
  overridesResolver: (_, styles) => styles.label
})({
  marginRight: 6
});
const PickersCalendarHeaderSwitchViewButton = styled(IconButton, {
  name: 'MuiPickersCalendarHeader',
  slot: 'SwitchViewButton',
  overridesResolver: (_, styles) => styles.switchViewButton
})({
  marginRight: 'auto'
});
const PickersCalendarHeaderSwitchViewIcon = styled(ArrowDropDown, {
  name: 'MuiPickersCalendarHeader',
  slot: 'SwitchViewIcon',
  overridesResolver: (_, styles) => styles.switchViewIcon
})(({
  theme,
  ownerState
}) => _extends({
  willChange: 'transform',
  transition: theme.transitions.create('transform'),
  transform: 'rotate(0deg)'
}, ownerState.openView === 'year' && {
  transform: 'rotate(180deg)'
}));
const deprecatedPropsWarning = buildDeprecatedPropsWarning('Props for translation are deprecated. See https://mui.com/x/react-date-pickers/localization for more information.');
/**
 * @ignore - do not document.
 */

export function PickersCalendarHeader(inProps) {
  const props = useThemeProps({
    props: inProps,
    name: 'MuiPickersCalendarHeader'
  });
  const {
    components = {},
    componentsProps = {},
    currentMonth: month,
    disabled,
    disableFuture,
    disablePast,
    getViewSwitchingButtonText: getViewSwitchingButtonTextProp,
    leftArrowButtonText: leftArrowButtonTextProp,
    maxDate,
    minDate,
    onMonthChange,
    onViewChange,
    openView: currentView,
    reduceAnimations,
    rightArrowButtonText: rightArrowButtonTextProp,
    views,
    labelId
  } = props;
  deprecatedPropsWarning({
    leftArrowButtonText: leftArrowButtonTextProp,
    rightArrowButtonText: rightArrowButtonTextProp,
    getViewSwitchingButtonText: getViewSwitchingButtonTextProp
  });
  const localeText = useLocaleText();
  const leftArrowButtonText = leftArrowButtonTextProp != null ? leftArrowButtonTextProp : localeText.previousMonth;
  const rightArrowButtonText = rightArrowButtonTextProp != null ? rightArrowButtonTextProp : localeText.nextMonth;
  const getViewSwitchingButtonText = getViewSwitchingButtonTextProp != null ? getViewSwitchingButtonTextProp : localeText.calendarViewSwitchingButtonAriaLabel;
  const utils = useUtils();
  const classes = useUtilityClasses(props);
  const switchViewButtonProps = componentsProps.switchViewButton || {};

  const selectNextMonth = () => onMonthChange(utils.getNextMonth(month), 'left');

  const selectPreviousMonth = () => onMonthChange(utils.getPreviousMonth(month), 'right');

  const isNextMonthDisabled = useNextMonthDisabled(month, {
    disableFuture,
    maxDate
  });
  const isPreviousMonthDisabled = usePreviousMonthDisabled(month, {
    disablePast,
    minDate
  });

  const handleToggleView = () => {
    if (views.length === 1 || !onViewChange || disabled) {
      return;
    }

    if (views.length === 2) {
      onViewChange(views.find(view => view !== currentView) || views[0]);
    } else {
      // switching only between first 2
      const nextIndexToOpen = views.indexOf(currentView) !== 0 ? 0 : 1;
      onViewChange(views[nextIndexToOpen]);
    }
  }; // No need to display more information


  if (views.length === 1 && views[0] === 'year') {
    return null;
  }

  const ownerState = props;
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