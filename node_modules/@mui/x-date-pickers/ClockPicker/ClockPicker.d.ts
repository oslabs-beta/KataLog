import * as React from 'react';
import { PickersArrowSwitcherSlotsComponent, PickersArrowSwitcherSlotsComponentsProps } from '../internals/components/PickersArrowSwitcher';
import { PickerOnChangeFn } from '../internals/hooks/useViews';
import { ExportedTimeValidationProps } from '../internals/hooks/validation/useTimeValidation';
import { ClockPickerView, MuiPickersAdapter } from '../internals/models';
import { ClockPickerClasses } from './clockPickerClasses';
export interface ExportedClockPickerProps<TDate> extends ExportedTimeValidationProps<TDate> {
    /**
     * 12h/24h view for hour selection clock.
     * @default false
     */
    ampm?: boolean;
    /**
     * Display ampm controls under the clock (instead of in the toolbar).
     * @default false
     */
    ampmInClock?: boolean;
    /**
     * Accessible text that helps user to understand which time and view is selected.
     * @template TDate
     * @param {ClockPickerView} view The current view rendered.
     * @param {TDate | null} time The current time.
     * @param {MuiPickersAdapter<TDate>} adapter The current date adapter.
     * @returns {string} The clock label.
     * @deprecated Use the `localeText` prop of `LocalizationProvider` instead, see https://mui.com/x/react-date-pickers/localization/.
     * @default <TDate extends any>(
     *   view: ClockView,
     *   time: TDate | null,
     *   adapter: MuiPickersAdapter<TDate>,
     * ) =>
     *   `Select ${view}. ${
     *     time === null ? 'No time selected' : `Selected time is ${adapter.format(time, 'fullTime')}`
     *   }`
     */
    getClockLabelText?: (view: ClockPickerView, time: TDate | null, adapter: MuiPickersAdapter<TDate>) => string;
}
export interface ClockPickerSlotsComponent extends PickersArrowSwitcherSlotsComponent {
}
export interface ClockPickerComponentsPropsOverrides {
}
export interface ClockPickerSlotsComponentsProps extends PickersArrowSwitcherSlotsComponentsProps {
}
export interface ClockPickerProps<TDate> extends ExportedClockPickerProps<TDate> {
    className?: string;
    /**
     * Set to `true` if focus should be moved to clock picker.
     */
    autoFocus?: boolean;
    /**
     * Override or extend the styles applied to the component.
     */
    classes?: Partial<ClockPickerClasses>;
    /**
     * Overrideable components.
     * @default {}
     */
    components?: Partial<ClockPickerSlotsComponent>;
    /**
     * The props used for each component slot.
     * @default {}
     */
    componentsProps?: Partial<ClockPickerSlotsComponentsProps>;
    /**
     * Selected date @DateIOType.
     */
    date: TDate | null;
    /**
     * Get clock number aria-text for hours.
     * @param {string} hours The hours to format.
     * @returns {string} the formatted hours text.
     * @default (hours: string) => `${hours} hours`
     * @deprecated Use the `localeText` prop of `LocalizationProvider` instead, see https://mui.com/x/react-date-pickers/localization/.
     */
    getHoursClockNumberText?: (hours: string) => string;
    /**
     * Get clock number aria-text for minutes.
     * @param {string} minutes The minutes to format.
     * @returns {string} the formatted minutes text.
     * @default (minutes: string) => `${minutes} minutes`
     * @deprecated Use the `localeText` prop of `LocalizationProvider` instead, see https://mui.com/x/react-date-pickers/localization/.
     */
    getMinutesClockNumberText?: (minutes: string) => string;
    /**
     * Get clock number aria-text for seconds.
     * @param {string} seconds The seconds to format.
     * @returns {string} the formatted seconds text.
     * @default (seconds: string) => `${seconds} seconds`
     * @deprecated Use the `localeText` prop of `LocalizationProvider` instead, see https://mui.com/x/react-date-pickers/localization/.
     */
    getSecondsClockNumberText?: (seconds: string) => string;
    /**
     * Left arrow icon aria-label text.
     * @default 'open previous view'
     * @deprecated Use the `localeText` prop of `LocalizationProvider` instead, see https://mui.com/x/react-date-pickers/localization/.
     */
    leftArrowButtonText?: string;
    /**
     * On change callback @DateIOType.
     */
    onChange: PickerOnChangeFn<TDate>;
    /**
     * Right arrow icon aria-label text.
     * @default 'open next view'
     * @deprecated Use the `localeText` prop of `LocalizationProvider` instead, see https://mui.com/x/react-date-pickers/localization/.
     */
    rightArrowButtonText?: string;
    showViewSwitcher?: boolean;
    /**
     * Controlled open view.
     */
    view?: ClockPickerView;
    /**
     * Views for calendar picker.
     * @default ['hours', 'minutes']
     */
    views?: readonly ClockPickerView[];
    /**
     * Callback fired on view change.
     * @param {ClockPickerView} view The new view.
     */
    onViewChange?: (view: ClockPickerView) => void;
    /**
     * Initially open view.
     * @default 'hours'
     */
    openTo?: ClockPickerView;
    /**
     * If `true`, the picker and text field are disabled.
     * @default false
     */
    disabled?: boolean;
    /**
     * Make picker read only.
     * @default false
     */
    readOnly?: boolean;
}
declare type ClockPickerComponent = (<TDate>(props: ClockPickerProps<TDate> & React.RefAttributes<HTMLDivElement>) => JSX.Element) & {
    propTypes?: any;
};
/**
 *
 * API:
 *
 * - [ClockPicker API](https://mui.com/x/api/date-pickers/clock-picker/)
 */
export declare const ClockPicker: ClockPickerComponent;
export {};
