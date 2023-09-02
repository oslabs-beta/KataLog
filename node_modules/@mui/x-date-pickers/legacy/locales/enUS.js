import { getPickersLocalization } from './utils/getPickersLocalization';
// This object is not Partial<PickersLocaleText> because it is the default values
var enUSPickers = {
  // Calendar navigation
  previousMonth: 'Previous month',
  nextMonth: 'Next month',
  // View navigation
  openPreviousView: 'open previous view',
  openNextView: 'open next view',
  calendarViewSwitchingButtonAriaLabel: function calendarViewSwitchingButtonAriaLabel(view) {
    return view === 'year' ? 'year view is open, switch to calendar view' : 'calendar view is open, switch to year view';
  },
  inputModeToggleButtonAriaLabel: function inputModeToggleButtonAriaLabel(isKeyboardInputOpen, viewType) {
    return isKeyboardInputOpen ? "text input view is open, go to ".concat(viewType, " view") : "".concat(viewType, " view is open, go to text input view");
  },
  // DateRange placeholders
  start: 'Start',
  end: 'End',
  // Action bar
  cancelButtonLabel: 'Cancel',
  clearButtonLabel: 'Clear',
  okButtonLabel: 'OK',
  todayButtonLabel: 'Today',
  // Toolbar titles
  datePickerDefaultToolbarTitle: 'Select date',
  dateTimePickerDefaultToolbarTitle: 'Select date & time',
  timePickerDefaultToolbarTitle: 'Select time',
  dateRangePickerDefaultToolbarTitle: 'Select date range',
  // Clock labels
  clockLabelText: function clockLabelText(view, time, adapter) {
    return "Select ".concat(view, ". ").concat(time === null ? 'No time selected' : "Selected time is ".concat(adapter.format(time, 'fullTime')));
  },
  hoursClockNumberText: function hoursClockNumberText(hours) {
    return "".concat(hours, " hours");
  },
  minutesClockNumberText: function minutesClockNumberText(minutes) {
    return "".concat(minutes, " minutes");
  },
  secondsClockNumberText: function secondsClockNumberText(seconds) {
    return "".concat(seconds, " seconds");
  },
  // Open picker labels
  openDatePickerDialogue: function openDatePickerDialogue(rawValue, utils) {
    return rawValue && utils.isValid(utils.date(rawValue)) ? "Choose date, selected date is ".concat(utils.format(utils.date(rawValue), 'fullDate')) : 'Choose date';
  },
  openTimePickerDialogue: function openTimePickerDialogue(rawValue, utils) {
    return rawValue && utils.isValid(utils.date(rawValue)) ? "Choose time, selected time is ".concat(utils.format(utils.date(rawValue), 'fullTime')) : 'Choose time';
  },
  // Table labels
  timeTableLabel: 'pick time',
  dateTableLabel: 'pick date'
};
export var DEFAULT_LOCALE = enUSPickers;
export var enUS = getPickersLocalization(enUSPickers);